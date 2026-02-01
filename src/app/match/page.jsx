"use client";

import { useEffect, useState } from "react";
import JobMatchCard from "@/components/JobMatchCard";

export default function MatchPage() {
  // 1. Define jobsData state here
  const [jobsData, setJobsData] = useState({
    jobs: [],
    profileSummary: "",
    interviewPrep: [],
  });

  useEffect(() => {
    const saved = localStorage.getItem("jobMatches");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        // 2. Map the saved data to our state
        if (Array.isArray(parsed)) {
          // Fallback if the data is just an array
          setJobsData({ jobs: parsed, profileSummary: "", interviewPrep: [] });
        } else {
          // Use the new object format from Gemma 3
          setJobsData(parsed);
        }
      } catch (e) {
        console.error("Error parsing job matches:", e);
      }
    }
  }, []);

  // 3. Keep your existing jobs constant for the main list
  const jobs = jobsData.jobs || [];

  return (
    <main className="bg-background-dark min-h-screen text-neutral-100">
      <section className="border-b border-neutral-800 bg-[#171717]/80 py-14 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 lg:px-10">
          <div className="flex flex-col gap-4">
            <p className="text-sfu-red text-xs font-bold uppercase tracking-[0.2em]">AI Analysis</p>
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {jobs.length > 0 ? `${jobs.length} Job Matches Found` : "Looking for matches..."}
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-background-alt py-14">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-6 lg:grid-cols-[0.6fr_1.4fr] lg:px-10">
          {/* SIDEBAR - PROFILE STRENGTH */}
          <div className="flex flex-col gap-6">
            <div className="sticky top-8 rounded-xl border border-neutral-800 bg-[#111111] p-6 shadow-sm">
              <div className="mb-4">
                <p className="text-sfu-red mb-1 text-[10px] font-bold uppercase tracking-[0.2em]">Analysis</p>
                <h2 className="text-2xl font-extrabold tracking-tight text-white">Profile Strength</h2>
              </div>

              {/* Dynamic Summary: Shows Gemma's insight or a default loading message */}
              <p className="mb-6 text-sm italic leading-relaxed text-neutral-400">
                "{jobsData?.profileSummary || "Gemini is analyzing your SFU courses and resume to find your competitive edge..."}"
              </p>

              <hr className="mb-6 border-neutral-800" />

              {/* Interview Prep Section */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Interview Strategy</h3>
                <ul className="space-y-3">
                  {/* If interviewPrep exists, map it; otherwise show default helpful tips */}
                  {(jobsData?.interviewPrep && jobsData.interviewPrep.length > 0 ?
                    jobsData.interviewPrep
                  : [
                      "Highlight specific technical projects from your SFU coursework.",
                      "Prepare to discuss your problem-solving process in depth.",
                      "Be ready to map your academic skills to the job's daily tasks.",
                    ]
                  ).map((tip, i) => (
                    <li key={i} className="flex gap-3 text-sm text-neutral-300">
                      <span className="text-sfu-red font-bold">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="border-sfu-red text-sfu-red hover:bg-sfu-red mt-8 w-full rounded-lg border py-3 text-xs font-bold uppercase tracking-widest transition-all hover:text-white">
                Download Career Roadmap
              </button>
            </div>
          </div>

          {/* JOB LIST */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {jobs.length > 0 ?
              jobs.map((job, index) => (
                <JobMatchCard
                  key={index}
                  title={job.position}
                  company={job.company}
                  location={job.location || "Canada"}
                  compatibility={job.matchScore}
                  link={job.url}
                  // SAFETY FALLBACKS: These prevent the ".map() of undefined" error
                  missingCourses={job.missingCourses || []}
                  missingSkills={job.missingSkills || []}
                />
              ))
            : <div className="col-span-2 py-20 text-center text-neutral-400">No matches found. Try uploading your resume again.</div>}
          </div>
        </div>
      </section>
    </main>
  );
}
