"use client";

import { useEffect, useState } from "react";
import JobMatchCard from "@/components/JobMatchCard";

export default function MatchPage() {
  const [loading, setLoading] = useState(true);
  const [jobsData, setJobsData] = useState({
    jobs: [],
    profileSummary: "",
    interviewPrep: [],
  });

  useEffect(() => {
    fetch("/api/job-matches")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.jobs);
        setJobsData(data);
        setLoading(false);
      });
  }, []);

  return (
    <main className="bg-background-dark min-h-screen text-neutral-100">
      <section className="border-b border-neutral-800 bg-[#171717]/80 py-14 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:px-10">
          <div className="flex flex-col gap-4">
            <p className="text-sfu-red text-xs font-bold uppercase tracking-[0.2em]">AI Analysis</p>
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {jobsData.jobs.length > 0 ? `${jobsData.jobs.length} Job Matches Found` : "Looking for matches..."}
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-background-alt py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.6fr_1.4fr] lg:px-10">
          {/* SIDEBAR - PROFILE STRENGTH */}
          <div className="flex flex-col gap-6">
            <div className="sticky top-8 rounded-xl border border-neutral-800 bg-[#111111] p-6 shadow-sm">
              <div className="mb-4">
                <p className="text-sfu-red mb-1 text-[10px] font-bold uppercase tracking-[0.2em]">Analysis</p>
                <h2 className="text-2xl font-extrabold tracking-tight text-white">Profile Strength</h2>
              </div>

              <p className="mb-6 text-sm italic leading-relaxed text-neutral-400">
                "{jobsData?.profileSummary || "Gemini is analyzing your SFU courses and resume to find your competitive edge..."}"
              </p>

              <hr className="mb-6 border-neutral-800" />

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Interview Strategy</h3>
                <ul className="space-y-3">
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
            </div>
          </div>

          {/* JOB LIST */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {jobsData.jobs.length > 0 ?
              jobsData.jobs.map((job, index) => (
                <JobMatchCard
                  key={index}
                  title={job.position}
                  company={job.company}
                  location={job.location || "Canada"}
                  compatibility={job.matchScore}
                  link={job.url}
                  missingCourses={job.missingCourses || []}
                  missingSkills={job.missingSkills || []}
                  additionalInfo={job.matchReason}
                />
              ))
            : <div className="col-span-2 py-20 text-center text-neutral-400">No matches found. Try uploading your resume again.</div>}
          </div>
        </div>
      </section>
    </main>
  );
}
