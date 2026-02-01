"use client";

import JobMatchCard from "@/components/JobMatchCard";

const JOB_MATCHES = [
  {
    title: "Software Developer",
    link: "https://linkedin.com",
    company: "Google",
    location: "San Francisco, CA",
    missingCourses: ["CMPT 120", "CMPT 225"],
    missingSkills: ["Kotlin"],
    compatibility: 0.67,
  },
  {
    title: "AI Engineer",
    link: "https://linkedin.com",
    company: "Apple",
    location: "San Francisco, CA",
    missingCourses: ["MACM 201"],
    missingSkills: ["R"],
    compatibility: 0.41,
  },
];

export default function MatchPage() {
  return (
    <main className="bg-background-dark min-h-screen text-neutral-100">
      <section className="border-b border-neutral-100 bg-white/80 py-14 backdrop-blur dark:border-neutral-800 dark:bg-[#171717]/80">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 lg:px-10">
          <div className="flex flex-col gap-4">
            <p className="text-sfu-red text-xs font-bold uppercase tracking-[0.2em]">Find a job</p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">{JOB_MATCHES.length} job matches found</h1>
          </div>
        </div>
      </section>

      <section className="bg-background-alt py-14 dark:bg-[#181818]">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-6 lg:grid-cols-[0.6fr_1.4fr] lg:px-10">
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-neutral-100 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-[#111111]">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sfu-red text-xs font-bold uppercase tracking-[0.2em]">Filters</p>
                  <h2 className="text-2xl font-extrabold tracking-tight">Refine your search</h2>
                </div>
              </div>
              {/*  */}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 rounded-xl sm:grid-cols-2">
            {JOB_MATCHES.map((job) => {
              return <JobMatchCard key={`${title}-${link}-${company}`} {...job} compatibility={job.compatibility * 100} />;
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
