"use client";
import { useEffect, useState } from "react";

export default function SkillInsights() {
  const [loading, setLoading] = useState(true);
  const [skillsData, setSkillsData] = useState({
    competencies: [],
  });

  useEffect(() => {
    fetch("/api/skill-insights")
      .then((res) => res.json())
      .then((data) => {
        setSkillsData(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-background-dark flex min-h-screen flex-col text-neutral-100 transition-colors duration-300">
      <section className="border-b border-neutral-800 bg-[#171717]/80 py-14 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:px-10">
          <div className="flex flex-col gap-4">
            <p className="text-sfu-red text-xs font-bold uppercase tracking-[0.2em]">AI Analysis</p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">Skills Insights</h1>
            <p className="max-w-2xl text-base leading-relaxed text-neutral-400">Target weaker skills to improve your chances of landing a job.</p>
          </div>
        </div>
      </section>

      <section className="bg-background-alt grow px-8 py-14">
        {skillsData.competencies.length > 0 ?
          <>
            <p className="mb-6 text-sm italic leading-relaxed text-neutral-400">
              "{!loading ? skillsData.profileSummary : "Gemini is analyzing your SFU courses and resume to find your competitive edge..."}"
            </p>
            <div className="space-y-12">
              {skillsData.competencies.map((item, i) => (
                <div key={i} className="group">
                  <div className="mb-4 flex items-end justify-between">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold uppercase tracking-tight">{item.skill}</span>
                      <span className="mt-2 font-mono text-[9px] uppercase leading-relaxed tracking-widest text-neutral-500">Source: {item.source}</span>
                    </div>
                    <span className="text-sfu-red text-xl font-black italic">{item.level}%</span>
                  </div>
                  <div className="h-0.5 w-full overflow-hidden rounded-full bg-neutral-900">
                    <div className="duration-2500 h-full bg-white transition-all ease-out" style={{ width: `${item.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        : <p className="text-center text-neutral-400">
            No explicit competencies detected in current analysis. <br />
            Re-upload your resume to try again.
          </p>
        }
      </section>
    </div>
  );
}
