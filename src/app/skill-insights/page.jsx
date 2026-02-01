"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SkillInsights() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("jobMatches");
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing data", e);
      }
    }
  }, []);

  // 1. LOADING STATE: Biar nggak blank pas nunggu data
  if (!data)
    return (
      <div className="flex min-h-screen items-center justify-center bg-black font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-500">
        Synthesizing Profile...
      </div>
    );

  // 2. SAFETY CHECK: Ambil array competencies
  const skills = data.competencies || [];

  return (
    <main className="min-h-screen bg-[#0a0a0a] p-8 text-white lg:p-20">
      <div className="mx-auto max-w-6xl">
        <header className="mb-24 flex items-end justify-between border-b border-neutral-900 pb-12">
          <h1 className="text-7xl font-black uppercase italic tracking-tighter">
            Skill <span className="font-light text-neutral-600">INSIGHTS</span>
          </h1>
          <Link
            href="/match"
            className="rounded-full border border-neutral-800 px-8 py-4 text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-white hover:text-black"
          >
            ← DASHBOARD
          </Link>
        </header>

        <div className="grid gap-20 text-white lg:grid-cols-2">
          <div className="rounded-[3rem] border border-neutral-800 bg-[#111111] p-12 shadow-2xl">
            <h2 className="mb-16 text-[10px] font-bold uppercase italic tracking-[0.3em] text-neutral-500">Verified Evidence</h2>

            {/* 3. CONDITIONAL RENDERING: Kalau masih kosong, kasih tau alasannya */}
            {skills.length > 0 ?
              <div className="space-y-12">
                {skills.map((item, i) => (
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
            : <div className="rounded-2xl border border-dashed border-neutral-800 py-20 text-center">
                <p className="text-xs uppercase italic tracking-widest text-neutral-600">
                  No explicit competencies detected in current analysis. <br />
                  Please re-upload your resume for a deeper audit.
                </p>
              </div>
            }
          </div>

          {/* SUMMARY BOX */}
          <div className="border-sfu-red/20 bg-linear-to-br h-fit rounded-[3rem] border from-[#111111] to-black p-12 shadow-2xl">
            <h3 className="text-sfu-red mb-10 text-[10px] font-bold uppercase italic tracking-[0.4em]">Intelligence Summary</h3>
            <p className="border-sfu-red border-l-2 pl-8 text-2xl font-medium italic leading-[1.6] text-neutral-200">"{data.profileSummary}"</p>
          </div>
        </div>
      </div>
    </main>
  );
}
