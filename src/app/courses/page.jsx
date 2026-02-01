"use client";

import { useEffect, useMemo, useState } from "react";
import { useOnInView } from "react-intersection-observer";
import { useRouter } from "next/navigation"; // Added missing import
import { Icon } from "@mui/material";
import { ChevronRightRounded, DeleteOutlineRounded } from "@mui/icons-material";

export default function CoursePage() {
  const router = useRouter(); // Initialize router
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // UI feedback for judges
  const [listLength, setListLength] = useState(20);

  const { ref: endOfListRef } = useOnInView(
    (inView) => {
      if (inView) {
        setListLength((prev) => Math.min(prev + 20, results.length));
      }
    },
    {
      rootMargin: "0px 0px 500px 0px",
      root: typeof document !== "undefined" && document.querySelector("main"),
    },
  );

  useEffect(() => {
    (async () => {
      let d = [];
      setIsLoading(true);
      await fetch("/api/courses")
        .then((res) => res.json())
        .then((data) => {
          setApiData(data);
          d = data;
          fetch("/api/my-courses")
            .then((res) => res.json())
            .then((data) => setSelected((data || []).map((course) => d.find((item) => item.code === course))));
        })
        .finally(() => setIsLoading(false));
    })();
  }, []);

  const results = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return apiData;
    return apiData.filter((course) => course.code.toLowerCase().includes(normalized) || course.title.toLowerCase().includes(normalized));
  }, [query, apiData]);

  const truncatedResults = useMemo(() => results.slice(0, listLength), [results, listLength]);

  const addCourse = (course) => {
    if (selected.some((item) => item.code === course.code)) return;
    setSelected((prev) => [...prev, { code: course.code, title: course.title }]);
  };

  const removeCourse = (code) => {
    setSelected((prev) => prev.filter((item) => item.code !== code));
  };

  const handleProceedToResume = async () => {
    if (selected.length === 0) {
      alert("Please add at least one course before proceeding!");
      return;
    }
    await fetch("/api/my-courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selected.map((course) => course.code)),
    });
    router.push("/resume");
  };

  return (
    <div className="bg-background-dark min-h-screen text-neutral-100 transition-colors duration-300">
      <section className="border-b border-neutral-800 bg-[#171717]/80 py-14 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:px-10">
          <div className="flex flex-col gap-4">
            <p className="text-sfu-red text-xs font-bold uppercase tracking-[0.4em]">Course Builder</p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Add Your <span className="text-sfu-red">SFU</span> Courses
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-neutral-400">
              Search the SFU catalog, add the courses you&apos;ve completed, and build a timeline that powers your job matches.
            </p>
          </div>

          <hr className="border-t border-neutral-800" />

          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">Look up a class</label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <span className="material-symbols-outlined text-sfu-red absolute left-4 top-1/2 -translate-y-1/2 text-xl">search</span>
                <input
                  className="focus:border-sfu-red/60 focus:ring-sfu-red/20 w-full rounded border border-neutral-700 bg-neutral-900 px-12 py-3 text-sm font-medium text-white shadow-inner outline-none transition-all placeholder:text-neutral-400 focus:ring-2"
                  placeholder="Try CMPT 125, data structures, or systems..."
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setListLength(20);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background-alt py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.3fr_0.7fr] lg:px-10">
          <div className="rounded-xl border border-neutral-800 bg-[#111111] p-6 shadow-sm">
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
                      className="hover:border-sfu-red/30 flex flex-col gap-3 rounded-lg border border-neutral-800 bg-[#141414] px-4 py-4 transition-all hover:bg-[#1a1a1a]"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-lg font-bold text-white">{course.code}</p>
                          <p className="text-sm text-neutral-400">{course.title}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            className={`rounded px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                              isAdded ?
                                "cursor-not-allowed bg-neutral-800 text-neutral-400"
                              : "bg-sfu-red cursor-pointer text-white hover:scale-110 hover:bg-[#8B1526] active:scale-105"
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
              : <p className="text-center text-sm text-neutral-400">{isLoading ? "Loading..." : "No results found."}</p>}
              <div ref={endOfListRef}></div>
            </div>
          </div>

          <div>
            <div className="h-dvh sticky top-8">
              <div className="flex max-h-[calc(100%-4rem)] flex-col gap-4 overflow-clip rounded-xl border border-neutral-800 bg-[#111111] p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sfu-red text-xs font-bold uppercase tracking-[0.3em]">Added</p>
                    <h2 className="text-2xl font-extrabold tracking-tight">Your Course Plan</h2>
                  </div>
                  <div className="bg-sfu-red/10 text-sfu-red rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest">{selected.length} total</div>
                </div>
                {selected.length === 0 && <p className="text-center text-neutral-400">No courses added</p>}
                <div className="space-y-3 overflow-y-auto">
                  {selected.map((course) => (
                    <div key={course.code} className="flex items-center justify-between gap-4 rounded-lg border border-neutral-800 bg-[#141414] px-4 py-3">
                      <div>
                        <p className="text-sm font-bold text-white">{course.code}</p>
                        <p className="text-xs text-neutral-400">{course.title}</p>
                      </div>
                      <button
                        className="btn-secondary flex h-[2.5rem_!important] w-[2.5rem_!important] shrink-0 items-center justify-center p-[0_!important]"
                        onClick={() => removeCourse(course.code)}
                        type="button"
                      >
                        <Icon component={DeleteOutlineRounded} />
                      </button>
                    </div>
                  ))}
                </div>
                {selected.length > 0 && (
                  <>
                    <button type="button" onClick={() => setSelected([])} className="btn-secondary">
                      <p className="w-full text-center text-xs">Clear All Courses</p>
                    </button>
                    <button onClick={handleProceedToResume} className="btn">
                      <p className="flex w-full items-center justify-center gap-1">
                        Next: Upload Resume <Icon component={ChevronRightRounded} />
                      </p>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
