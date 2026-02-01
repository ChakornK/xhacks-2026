"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useOnInView } from "react-intersection-observer";

export default function CoursePage() {
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);

  const [listLength, setListLength] = useState(20);
  const endOfListRef = useOnInView(
    (inView, entry) => {
      if (inView) {
        setListLength((prev) => Math.max(20, Math.min(prev + 20, apiData.length)));
      }
    },
    {
      rootMargin: "0px 0px 500px 0px",
      root: typeof document !== "undefined" && document.querySelector("main"),
    },
  );

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return apiData;
    const normalized = query.toLowerCase();
    return apiData.filter((course) => course.code.toLowerCase().includes(normalized) || course.title.toLowerCase().includes(normalized));
  }, [query, apiData, listLength]);
  const truncatedResults = useMemo(() => results.slice(0, listLength), [results, listLength]);

  const addCourse = (course) => {
    if (selected.some((item) => item.code === course.code)) return;
    setSelected((prev) => [...prev, { code: course.code, title: course.title }]);
  };

  const removeCourse = (code) => {
    setSelected((prev) => prev.filter((item) => item.code !== code));
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-sfu-dark min-h-screen transition-colors duration-300 dark:text-neutral-100">
      <section className="border-b border-neutral-100 bg-white/80 py-14 backdrop-blur dark:border-neutral-800 dark:bg-[#171717]/80">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 lg:px-10">
          <div className="flex flex-col gap-4">
            <p className="text-sfu-red text-xs font-bold uppercase tracking-[0.4em]">Course Builder</p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Add Your <span className="text-sfu-red">SFU</span> Courses
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
              Search the SFU catalog, add the courses you&apos;ve completed, and build a timeline that powers your job matches.
            </p>
          </div>

          <hr className="border-t border-neutral-800" />

          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">Look up a class</label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <span className="material-symbols-outlined text-sfu-red absolute left-4 top-1/2 -translate-y-1/2 text-xl">search</span>
                <input
                  className="text-sfu-dark focus:border-sfu-red/60 focus:ring-sfu-red/20 w-full rounded border border-neutral-200 bg-neutral-50 px-12 py-3 text-sm font-medium shadow-inner outline-none transition-all placeholder:text-neutral-400 focus:ring-2 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                  placeholder="Try CMPT 125, data structures, or systems..."
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setListLength(20);
                  }}
                />
              </div>
            </div>
            <p className="text-xs text-neutral-400 dark:text-neutral-500">Tip: Use course code, title, or topic keywords.</p>
          </div>
        </div>
      </section>

      <section className="bg-background-alt py-14 dark:bg-[#181818]">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-6 lg:grid-cols-[1.3fr_0.7fr] lg:px-10">
          <div className="rounded-xl border border-neutral-100 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-[#111111]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sfu-red text-xs font-bold uppercase tracking-[0.3em]">Results</p>
                <h2 className="text-2xl font-extrabold tracking-tight">Matching Courses</h2>
              </div>
              <p className="font-semibold text-neutral-300">
                {results.length} result{results.length === 1 ? "" : "s"}
              </p>
            </div>

            <div className="space-y-3">
              {truncatedResults.length > 0 ?
                truncatedResults.map((course) => {
                  const isAdded = selected.some((item) => item.code === course.code);
                  return (
                    <div
                      key={course.code}
                      className="hover:border-sfu-red/30 flex flex-col gap-3 rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-4 transition-all hover:bg-white dark:border-neutral-800 dark:bg-[#141414] dark:hover:bg-[#1a1a1a]"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sfu-dark text-lg font-bold dark:text-white">{course.code}</p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">{course.title}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            className={`rounded px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                              isAdded ?
                                "cursor-not-allowed bg-neutral-200 text-neutral-500 dark:bg-neutral-800"
                              : "bg-sfu-red cursor-pointer text-white hover:bg-[#8B1526]"
                            }`}
                            onClick={() => addCourse(course)}
                            disabled={isAdded}
                            type="button"
                          >
                            {isAdded ? "Added" : "Add"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              : <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">No results found.</p>}
              <div ref={endOfListRef}></div>
            </div>
          </div>

          <div>
            <div className="h-dvh sticky top-8">
              <div className="flex max-h-[calc(100%-4rem)] flex-col gap-4 overflow-clip rounded-xl border border-neutral-100 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-[#111111]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sfu-red text-xs font-bold uppercase tracking-[0.3em]">Added</p>
                    <h2 className="text-2xl font-extrabold tracking-tight">Your Course Plan</h2>
                  </div>
                  <div className="bg-sfu-red/10 text-sfu-red rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest">{selected.length} total</div>
                </div>
                {selected.length > 0 ?
                  <div>
                    <button
                      type="button"
                      onClick={() => setSelected([])}
                      className="text-sfu-red border-sfu-red/20 hover:bg-sfu-red/10 w-full cursor-pointer rounded border px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all"
                    >
                      Remove All
                    </button>
                  </div>
                : <p className="text-center text-neutral-400">No courses added</p>}
                <div className="space-y-3 overflow-y-auto">
                  {selected.map((course) => (
                    <div
                      key={course.code}
                      className="flex items-center justify-between gap-4 rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-[#141414]"
                    >
                      <div>
                        <p className="text-sfu-dark text-sm font-bold dark:text-white">{course.code}</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">{course.title}</p>
                      </div>
                      <button
                        className="text-sfu-red border-sfu-red/20 hover:bg-sfu-red/10 cursor-pointer rounded border px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all"
                        onClick={() => removeCourse(course.code)}
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => {}} className="btn">
                  <p className="w-full">Save</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
