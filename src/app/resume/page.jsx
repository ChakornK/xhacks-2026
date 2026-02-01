"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResumePage() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Inside your ResumePage component...
  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");
    setIsUploading(true);

    try {
      const savedCourses = localStorage.getItem("selectedCourses");
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("courses", savedCourses);

      const response = await fetch("/api/predict", {
        // Ensure this matches your route filename
        method: "POST",
        body: formData, // No headers needed for FormData
      });

      const data = await response.json();
      if (response.ok) {
        // Save Gemini's actual results to use on the next page
        localStorage.setItem("jobMatches", JSON.stringify(data.jobs));
        router.push("/match");
      } else {
        throw new Error(data.error || "Analysis failed");
      }
    } catch (error) {
      console.error("Analysis Error:", error);
      alert("Error: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-background-dark min-h-screen text-neutral-100 transition-colors duration-300">
      {/* HEADER SECTION */}
      <section className="border-b border-neutral-800 bg-[#171717]/80 py-14 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 lg:px-10">
          <div className="flex flex-col gap-4">
            <p className="text-sfu-red text-xs font-bold uppercase tracking-[0.4em]">Profile Builder</p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Upload Your <span className="text-sfu-red">Resume</span>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-neutral-400">
              Our AI analyzes your experience to better match you with SFU-friendly job opportunities.
            </p>
          </div>

          {/* UPLOAD BOX */}
          <div className="grid gap-4 rounded-xl border border-neutral-800 bg-[#111111] p-8 shadow-sm">
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-700 py-12">
              <span className="material-symbols-outlined text-sfu-red mb-4 text-5xl">cloud_upload</span>
              <input
                type="file"
                onChange={handleFileChange}
                className="file:bg-sfu-red cursor-pointer text-sm text-neutral-400 file:mr-4 file:rounded file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#8B1526]"
                accept=".pdf,.doc,.docx"
              />
              <p className="mt-4 text-xs font-medium uppercase tracking-widest text-neutral-400">
                {file ? `Selected: ${file.name}` : "PDF or Word documents only"}
              </p>
            </div>

            <button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="bg-sfu-red flex h-12 w-full cursor-pointer items-center justify-center rounded px-6 text-sm font-bold uppercase tracking-widest text-white shadow-md transition-all hover:bg-[#8B1526] disabled:bg-neutral-800"
            >
              {isUploading ? "Processing..." : "Upload Resume"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
