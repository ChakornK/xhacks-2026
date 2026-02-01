"use client";

import { CircularIndicator } from "@/components/CircularIndicator";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Icon } from "@mui/material";

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

          <div className="rounded-xl border border-neutral-100 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-[#111111]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sfu-red text-xs font-bold uppercase tracking-[0.2em]">Results</p>
                <h2 className="text-2xl font-extrabold tracking-tight">Job Matches</h2>
              </div>
            </div>

            <div className="space-y-3">
              {JOB_MATCHES.map((job) => {
                return (
                  <div key={`${job.link}-${job.title}`} className="flex gap-3 rounded-lg border border-neutral-800 bg-[#141414] px-4 py-4 transition-all">
                    <div className="flex grow flex-col items-start justify-between">
                      <p className="text-sfu-red text-xs font-bold uppercase tracking-[0.2em]">{job.company}</p>
                      <p className="text-xl font-extrabold text-white">{job.title}</p>
                      <p className="text-sm font-semibold text-neutral-400">{job.location}</p>
                      <div className="mt-2 grid w-full grid-cols-2">
                        <div>
                          <p className="mb-2 font-semibold">Missing Courses</p>
                          <div className="flex flex-wrap gap-2">
                            {job.missingCourses.length > 0 &&
                              job.missingCourses.map((j) => <div className="rounded-lg bg-neutral-800 px-2 py-1 text-sm font-semibold">{j}</div>)}
                          </div>
                        </div>
                        <div>
                          <p className="mb-2 font-semibold">Missing Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {job.missingSkills.length > 0 &&
                              job.missingSkills.map((s) => <div className="rounded-lg bg-neutral-800 px-2 py-1 text-sm font-semibold">{s}</div>)}
                          </div>
                        </div>
                      </div>
                      <a
                        href={job.link}
                        target="_blank"
                        className="bg-sfu-red mt-4 flex cursor-pointer items-center gap-1 rounded px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#8B1526]"
                      >
                        Apply
                        <Icon
                          component={OpenInNewRoundedIcon}
                          sx={{
                            width: "1rem",
                            height: "1rem",
                          }}
                        />
                      </a>
                    </div>
                    <div className="text-sfu-red w-12 text-center text-xl font-bold">
                      <CircularIndicator colour={"#A6192E"} percentage={job.compatibility * 100} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
