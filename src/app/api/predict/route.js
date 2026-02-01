import { cacheData } from "@/lib/redis";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
const linkedIn = require("linkedin-jobs-api");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const formData = await request.formData();
    const coursesJson = formData.get("courses");
    const resumeFile = formData.get("resume");

    if (!coursesJson) return NextResponse.json({ error: "No courses" }, { status: 400 });

    const courses = JSON.parse(coursesJson);

    // 1. Process Resume
    let resumeData = null;
    if (resumeFile && resumeFile.size > 0) {
      const bytes = await resumeFile.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");
      resumeData = {
        inlineData: { data: base64, mimeType: "application/pdf" },
      };
    }

    // FIXED MODEL NAME HERE
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    // 2. Build Context
    const courseContext = courses.map((c) => `[${c.dept} ${c.number}] ${c.title}${c.description ? `: ${c.description}` : ""}`).join("\n");

    // 3. Phase 1: Strategic Job Title Prediction
    const jobTitlePrompt = [
      {
        text: `Analyze these SFU courses: \n${courseContext}\n
      Generate 3-5 high-demand Canadian job titles matching this background. 
      Return ONLY a JSON array of strings.`,
      },
    ];
    if (resumeData) jobTitlePrompt.push(resumeData);

    const titleResult = await model.generateContent(jobTitlePrompt);
    const rawTitleText = titleResult.response.text().replace(/```json|```/g, "");
    const predictedTitles = JSON.parse(rawTitleText);

    // 4. Phase 2: Live LinkedIn Job Search
    const jobSearches = await Promise.allSettled(
      predictedTitles.map((title) =>
        cacheData(
          `linkedin-${title.toLowerCase().replace(/[^a-zA-Z0-9]/g, "")}`,
          () =>
            linkedIn.query({
              keyword: title,
              location: "Canada",
              limit: "10",
              dateSincePosted: "past Month",
            }),
          60 * 60 * 24,
        ),
      ),
    );

    const allJobs = jobSearches
      .filter((r) => r.status === "fulfilled")
      .flatMap((r) => r.value || [])
      .filter((v, i, a) => a.findIndex((t) => t.jobUrl === v.jobUrl) === i)
      .slice(0, 15);

    if (allJobs.length === 0) return NextResponse.json({ jobs: [], message: "No live listings found." });

    // 5. Phase 3: AI Match Ranking
    const rankingPrompt = [
      {
        text: `
        Student Background: ${courseContext}
        Jobs: ${allJobs.map((j, i) => `ID ${i}: ${j.position} at ${j.company}`).join("\n")}
        
        Rate each job (0-100) and provide a "reason" mentioning specific course codes (e.g., ${courses[0]?.dept} ${courses[0]?.number}).
        Return JSON array of objects: [{"id": 0, "score": 85, "reason": "..."}]`,
      },
    ];
    if (resumeData) rankingPrompt.push(resumeData);

    const rankingResult = await model.generateContent(rankingPrompt);
    const rawRankingText = rankingResult.response.text().replace(/```json|```/g, "");
    const rankedScores = JSON.parse(rawRankingText);

    // 6. Final Merge with Safety Check
    const finalJobs = rankedScores
      .map((score) => {
        const originalJob = allJobs[score.id];
        if (!originalJob) return null;
        return {
          ...originalJob,
          matchScore: score.score,
          matchReason: score.reason,
          url: originalJob.jobUrl,
        };
      })
      .filter((job) => job !== null) // Remove any failed matches
      .sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({ jobs: finalJobs });
  } catch (error) {
    console.error("Predict Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
