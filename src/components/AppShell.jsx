"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NAV_ITEMS = [
  {
    icon: "dashboard",
    label: "Home",
    href: "/",
  },
  {
    icon: "person",
    label: "Courses",
    href: "/courses",
  },
  {
    icon: "work",
    label: "Job Matches",
    href: "/match",
  },
  {
    icon: "insights",
    label: "Skill Insights",
    href: "/",
  },
  {
    icon: "settings",
    label: "Settings",
    href: "/",
  },
];

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);

  if (isLanding) {
    return <main className="h-dvh flex-1 overflow-y-auto overflow-x-clip">{children}</main>;
  }

  return (
    <div className="bg-background-dark flex min-h-screen w-full overflow-x-hidden text-neutral-100 transition-colors duration-300">
      <button
        className="bg-sfu-red size-11 fixed left-4 top-4 z-50 flex items-center justify-center rounded-lg text-white shadow-lg lg:hidden"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation"
        aria-controls="mobile-side-header"
        aria-expanded={isOpen}
      >
        <span className="material-symbols-outlined text-2xl">menu</span>
      </button>

      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-neutral-800 bg-neutral-950 px-5 py-6 text-neutral-200 lg:flex">
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-sfu-red size-9 flex items-center justify-center rounded">
            <span className="material-symbols-outlined text-xl text-white">school</span>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wide">SFU</p>
            <p className="text-sfu-red text-sm font-bold uppercase tracking-wide">CareerConnect</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2 text-sm font-semibold">
          {NAV_ITEMS.map(({ icon, label, href }) => (
            <Link
              key={label}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-300 hover:bg-white/5 hover:text-white ${pathname === href ? "bg-white/10" : ""}`}
              href={href}
            >
              <span className="material-symbols-outlined text-base">{icon}</span>
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <div
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity lg:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
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
          <button className="text-neutral-300 hover:text-white" onClick={() => setIsOpen(false)} aria-label="Close navigation">
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <nav className="flex flex-col gap-2 text-sm font-semibold">
          {NAV_ITEMS.map(({ icon, label, href }) => (
            <Link
              key={label}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-300 hover:bg-white/5 hover:text-white ${pathname === href ? "bg-white/10" : ""}`}
              href={href}
            >
              <span className="material-symbols-outlined text-base">{icon}</span>
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="h-dvh flex-1 overflow-y-auto overflow-x-clip">{children}</main>
    </div>
  );
}
