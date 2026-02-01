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
  if (!data) return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono text-[10px] text-neutral-500 uppercase tracking-[0.5em]">
      Synthesizing Profile...
    </div>
  );

  // 2. SAFETY CHECK: Ambil array competencies
  const skills = data.competencies || [];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 lg:p-20">
      <div className="max-w-6xl mx-auto">
        <header className="mb-24 flex justify-between items-end border-b border-neutral-900 pb-12">
          <h1 className="text-7xl font-black tracking-tighter uppercase italic italic">
            Skill <span className="text-neutral-600 font-light">INSIGHTS</span>
          </h1>
          <Link href="/match" className="text-[10px] font-bold uppercase tracking-widest border border-neutral-800 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all">
            ← DASHBOARD
          </Link>
        </header>

        <div className="grid lg:grid-cols-2 gap-20 text-white">
          <div className="bg-[#111111] p-12 rounded-[3rem] border border-neutral-800 shadow-2xl">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 mb-16 italic">Verified Evidence</h2>
            
            {/* 3. CONDITIONAL RENDERING: Kalau masih kosong, kasih tau alasannya */}
            {skills.length > 0 ? (
              <div className="space-y-12">
                {skills.map((item, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between mb-4 items-end">
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold tracking-tight uppercase">{item.skill}</span>
                        <span className="text-[9px] text-neutral-500 mt-2 font-mono uppercase tracking-widest leading-relaxed">
                          Source: {item.source}
                        </span>
                      </div>
                      <span className="text-sfu-red font-black text-xl italic">{item.level}%</span>
                    </div>
                    <div className="h-[2px] w-full bg-neutral-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white transition-all duration-[2500ms] ease-out" 
                        style={{ width: `${item.level}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-dashed border-neutral-800 rounded-2xl">
                <p className="text-neutral-600 text-xs uppercase tracking-widest italic">
                  No explicit competencies detected in current analysis. <br/>
                  Please re-upload your resume for a deeper audit.
                </p>
              </div>
            )}
          </div>

          {/* SUMMARY BOX */}
          <div className="bg-gradient-to-br from-[#111111] to-black p-12 rounded-[3rem] border border-sfu-red/20 shadow-2xl h-fit">
            <h3 className="text-sfu-red font-bold text-[10px] uppercase tracking-[0.4em] mb-10 italic">Intelligence Summary</h3>
            <p className="text-2xl font-medium text-neutral-200 leading-[1.6] italic border-l-2 border-sfu-red pl-8 italic">
              "{data.profileSummary}"
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}