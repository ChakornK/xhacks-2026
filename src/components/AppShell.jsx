"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);

  if (isLanding) {
    return children;
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-sfu-dark flex min-h-screen w-full overflow-x-hidden transition-colors duration-300 dark:text-neutral-100">
      <button
        className="bg-sfu-red size-11 fixed left-4 top-4 z-50 flex items-center justify-center rounded-lg text-white shadow-lg lg:hidden"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation"
        aria-controls="mobile-side-header"
        aria-expanded={isOpen}
      >
        <span className="material-symbols-outlined text-2xl">menu</span>
      </button>

      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-neutral-800 bg-gradient-to-b from-[#0E141B] to-[#0B0F14] px-5 py-6 text-neutral-200 lg:flex">
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-sfu-red size-9 flex items-center justify-center rounded">
            <span className="material-symbols-outlined text-xl text-white">school</span>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wide">SFU Career Net</p>
            <p className="text-xs text-neutral-400">Student Portal</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2 text-sm font-semibold">
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-300 hover:bg-white/5 hover:text-white"
            href="/"
          >
            <span className="material-symbols-outlined text-base">dashboard</span>
            Home
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg bg-white/10 px-3 py-2 text-white"
            href="/"
            aria-current="page"
          >
            <span className="material-symbols-outlined text-base">person</span>
            Courses
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-300 hover:bg-white/5 hover:text-white"
            href="/courses"
          >
            <span className="material-symbols-outlined text-base">work</span>
            Job Matches
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-300 hover:bg-white/5 hover:text-white"
            href="/courses"
          >
            <span className="material-symbols-outlined text-base">insights</span>
            Skill Insights
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-300 hover:bg-white/5 hover:text-white"
            href="/"
          >
            <span className="material-symbols-outlined text-base">settings</span>
            Settings
          </Link>
        </nav>
      </aside>

      <div
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        id="mobile-side-header"
        className={`fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-neutral-800 bg-gradient-to-b from-[#0E141B] to-[#0B0F14] px-5 py-6 text-neutral-200 shadow-2xl transition-transform lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-sfu-red size-9 flex items-center justify-center rounded">
              <span className="material-symbols-outlined text-xl text-white">school</span>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wide">SFU Career Net</p>
              <p className="text-xs text-neutral-400">Student Portal</p>
            </div>
          </div>
          <button
            className="text-neutral-300 hover:text-white"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <nav className="flex flex-col gap-2 text-sm font-semibold">
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-300 hover:bg-white/5 hover:text-white"
            href="/"
            onClick={() => setIsOpen(false)}
          >
            <span className="material-symbols-outlined text-base">dashboard</span>
            Dashboard
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg bg-white/10 px-3 py-2 text-white"
            href="/"
            aria-current="page"
            onClick={() => setIsOpen(false)}
          >
            <span className="material-symbols-outlined text-base">person</span>
            Profile
          </Link>
          
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-300 hover:bg-white/5 hover:text-white"
            href="/courses"
            onClick={() => setIsOpen(false)}
          >
            <span className="material-symbols-outlined text-base">insights</span>
            Skill Insights
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-300 hover:bg-white/5 hover:text-white"
            href="/courses"
            onClick={() => setIsOpen(false)}
          >
            <span className="material-symbols-outlined text-base">work</span>
            Job Matches
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-300 hover:bg-white/5 hover:text-white"
            href="/"
            onClick={() => setIsOpen(false)}
          >
            <span className="material-symbols-outlined text-base">settings</span>
            Settings
          </Link>
        </nav>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
