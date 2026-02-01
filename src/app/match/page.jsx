"use client";

import { useEffect, useState } from "react";
import JobMatchCard from "@/components/JobMatchCard";

export default function MatchPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Pull the REAL data Gemini just saved to localStorage
    const savedJobs = localStorage.getItem("jobMatches");
    if (savedJobs) {
      try {
        setJobs(JSON.parse(savedJobs));
      } catch (e) {
        console.error("Error parsing job matches:", e);
      }
    }
  }, []);

  return (
    <main className="bg-background-dark min-h-screen text-neutral-100">
      <section className="border-b border-neutral-100 bg-white/80 py-14 backdrop-blur dark:border-neutral-800 dark:bg-[#171717]/80">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 lg:px-10">
          <div className="flex flex-col gap-4">
            <p className="text-sfu-red text-xs font-bold uppercase tracking-[0.2em]">AI Analysis</p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl text-sfu-dark dark:text-white">
              {jobs.length > 0 ? `${jobs.length} Job Matches Found` : "Looking for matches..."}
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-background-alt py-14 dark:bg-[#181818]">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-6 lg:grid-cols-[0.6fr_1.4fr] lg:px-10">
          {/* SIDEBAR */}
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-neutral-100 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-[#111111]">
              <h2 className="text-lg font-bold mb-2 text-sfu-dark dark:text-white">Profile Strength</h2>
              <p className="text-sm text-neutral-500">
                Gemini evaluated your SFU courses and resume to find these opportunities.
              </p>
            </div>
          </div>

          {/* JOB LIST */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {jobs.length > 0 ? (
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
            ) : (
              <div className="col-span-2 text-center py-20 text-neutral-500">
                No matches found. Try uploading your resume again.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}