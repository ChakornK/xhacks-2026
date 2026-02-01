import { cacheData } from "@/lib/redis";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { jobRankingPrompt, jobTitlesPrompt } from "@/lib/prompt";
import { session } from "@/lib/session";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";
import { getCourses } from "@/lib/courses";
const linkedIn = require("linkedin-jobs-api");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function getLocationPriority(location) {
  if (!location) return 4;
  const loc = location.toLowerCase();
  if (loc.includes("vancouver") || loc.includes("burnaby") || loc.includes("richmond") || loc.includes("surrey")) return 0;
  if (loc.includes("british columbia") || loc.includes("bc")) return 1;
  if (loc.includes("toronto") || loc.includes("ontario")) return Infinity;
  if (loc.includes("canada")) return Infinity;
  return Infinity;
}

function getLocationBoost(priority) {
  switch (priority) {
    case 0:
      return 10; // Vancouver/Burnaby/Richmond/Surrey: +10 points
    case 1:
      return 5; // Rest of BC: +5 points
    default:
      return 0; // Ontario/Other: no boost
  }
}

export async function POST(req, res) {
  try {
    const s = await session();
    if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const user = await User.findById(s.user.id);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    const { savedCourses } = user;
    if (!savedCourses || savedCourses.length === 0) return NextResponse.json({ error: "No saved courses" }, { status: 400 });

    const { resume } = await req.json();
    if (!resume) return NextResponse.json({ error: "No resume" }, { status: 400 });

    const streamEncoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const updateStatus = (status) => {
          controller.enqueue(streamEncoder.encode(`${status}\n`));
        };
        const endStream = () => controller.close();

        const model = genAI.getGenerativeModel({
          model: "gemma-3-27b-it",
          // generationConfig: { responseMimeType: "application/json" },
        });

        const allCourses = await getCourses();
        const courseContext = savedCourses
          .map((courseCode) => {
            const c = allCourses.find((course) => course.code === courseCode);
            return `[${c.code}] ${c.title}${c.description ? `: ${c.description}` : ""}`;
          })
          .join("\n");

        // Phase 1: Strategic Job Title Prediction
        updateStatus("Matching your profile to job titles");
        const filledJobTitlePrompt = jobTitlesPrompt(courseContext, resume);

        let titleResult;
        let titleResultRetries = 3;
        while (titleResultRetries > 0) {
          try {
            titleResult = await model.generateContent(filledJobTitlePrompt);
            break;
          } catch (e) {
            console.error(e);
            titleResultRetries--;
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
        const rawTitleText = titleResult.response.text().match(/\[[^`]*\]/);
        const predictedTitles = JSON.parse(rawTitleText);

        // Phase 2: Live LinkedIn Job Search
        updateStatus("Searching for job postings");
        const jobSearches = await Promise.allSettled(
          predictedTitles.map((title) =>
            cacheData(
              `linkedin-${title.toLowerCase().replace(/[^a-zA-Z0-9]/g, "")}`,
              () =>
                linkedIn.query({
                  keyword: title,
                  location: "Vancouver, BC",
                  limit: "15",
                  dateSincePosted: "past Month",
                }),
              60 * 60 * 24, // 24 hour cache
            ),
          ),
        );

        const allJobs = jobSearches
          .filter((r) => r.status === "fulfilled")
          .flatMap((r) => r.value || [])
          .filter((v, i, a) => a.findIndex((t) => t.jobUrl === v.jobUrl) === i)
          .slice(0, 15);

        if (allJobs.length === 0) return NextResponse.json({ jobs: [], message: "No live listings found." });

        const uniqueJobs = Array.from(new Set(allJobs.map((j) => j.jobUrl))).map((jobUrl) => allJobs.find((j) => j.jobUrl === jobUrl));
        const priorityJobs = uniqueJobs
          .map((job, originalIndex) => ({
            ...job,
            _priority: getLocationPriority(job.location),
            _originalIndex: originalIndex,
          }))
          .sort((a, b) => {
            // Sort Location by priority
            if (a._priority !== b._priority) return a._priority - b._priority;
            // If same priority, sort by original index
            return a._originalIndex - b._originalIndex;
          })
          .slice(0, 15); // Limit to 15 jobs

        // Phase 3: AI Match Ranking
        updateStatus("Computing job match scores");
        const filledJobRankingPrompt = jobRankingPrompt(courseContext, uniqueJobs);

        let rankingResult;
        let rankingResultRetries = 3;
        while (rankingResultRetries > 0) {
          try {
            rankingResult = await model.generateContent(filledJobRankingPrompt);
            break;
          } catch (e) {
            console.error(e);
            rankingResultRetries--;
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
        const rawRankingText = rankingResult.response.text().match(/{[^`]*}/);
        const rankedScores = JSON.parse(rawRankingText);

        // 6. Final Merge with Safety Check
        // Check if rankedScores is the new object format or the old array format
        const jobsToMap = Array.isArray(rankedScores) ? rankedScores : rankedScores.jobs || [];

        const finalJobs = jobsToMap
          .map((score) => {
            const originalJob = priorityJobs[score.id];
            if (!originalJob) return null;

            // Calculte match score based on BC priority
            const locationBoost = getLocationBoost(originalJob._priority);

            return {
              ...originalJob,
              matchScore: score.score,
              adjustedScore: Math.min(score.score + locationBoost, 100),
              matchReason: score.reason,
              missingCourses: score.missingCourses || [], // Ensure these exist for your card
              missingSkills: score.missingSkills || [],
              url: originalJob.jobUrl,
            };
          })
          .filter((job) => job !== null) // Remove any failed matches
          .sort((a, b) => b.adjustedScore - a.adjustedScore);

        const finalJobMatches = {
          jobs: finalJobs,
          profileSummary: rankedScores.profileSummary || "Your profile shows strong technical foundations.",
          interviewPrep: rankedScores.interviewPrep || ["Highlight your course projects", "Review core fundamentals"],
        };

        user.jobMatches = JSON.stringify(finalJobMatches);
        await user.save();

        updateStatus("OK");
        endStream();
      },
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Predict Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
