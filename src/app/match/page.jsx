"use client";
import Link from "next/link";
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

  const scrollToInsights = () => {
    // Scroll to the sidebar on mobile or just trigger animation
    sidebarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Trigger a pulse animation
    setIsHighlighting(true);
    setTimeout(() => setIsHighlighting(false), 2000); 
  };
  

  return (
    <main className="bg-background-dark min-h-screen text-neutral-100">
      <section className="border-b border-neutral-800 bg-[#171717]/80 py-14 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:px-10">
          <div className="flex flex-col gap-4">
            <p className="text-sfu-red text-xs font-bold uppercase tracking-[0.2em]">AI Analysis</p>
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {jobs.length > 0 ? `${jobs.length} Job Matches Found` : "Looking for matches..."}
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-background-alt py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.6fr_1.4fr] lg:px-10">
          {/* SIDEBAR - CLEAN VERSION */}
          <div className="flex flex-col gap-6">
            <div className="sticky top-8 rounded-xl border border-neutral-800 bg-[#111111] p-8 shadow-2xl overflow-hidden relative">
              {/* Decorative Background Element */}
              <div className="absolute -top-10 -right-10 h-32 w-32 bg-sfu-red/10 blur-[50px] rounded-full"></div>
              
              <div className="relative z-10">
                <p className="text-sfu-red mb-2 text-[10px] font-bold uppercase tracking-[0.4em]">Deep Analysis</p>
                <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic mb-6">
                  Talent <span className="text-neutral-500">Audit</span>
                </h2>
                
                <p className="text-sm text-neutral-400 leading-relaxed mb-10">
                  AI has completed a cross-reference of your academic transcript and professional experience against these live listings.
                </p>

                <Link href="/skill-insights" className="block w-full">
                  <button className="group relative w-full overflow-hidden rounded-lg bg-sfu-red px-6 py-4 transition-all hover:bg-[#8B1526]">
                    <span className="relative z-10 text-xs font-bold uppercase tracking-[0.2em] text-white flex items-center justify-center gap-2">
                      View Skill Insights 
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </button>
                </Link>
                
                <p className="mt-6 text-[9px] text-neutral-600 uppercase tracking-widest text-center">
                  Verified by Gemini AI
                </p>
              </div>
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
