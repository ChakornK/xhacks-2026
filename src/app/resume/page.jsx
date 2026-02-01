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

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    setIsUploading(true);
    
    // This is where your AI logic will eventually live
    // For now, we simulate the upload and save the "status" to localStorage
    try {
      // In a real hackathon, you'd extract text from the PDF here
      localStorage.setItem("resumeStatus", "uploaded");
      localStorage.setItem("resumeFileName", file.name);
      
      // Navigate to the next step (e.g., matching)
      router.push("/courses");
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-sfu-dark min-h-screen transition-colors duration-300 dark:text-neutral-100">
      {/* HEADER SECTION */}
      <section className="border-b border-neutral-100 bg-white/80 py-14 backdrop-blur dark:border-neutral-800 dark:bg-[#171717]/80">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 lg:px-10">
          <div className="flex flex-col gap-4">
            <p className="text-sfu-red text-xs font-bold uppercase tracking-[0.4em]">Profile Builder</p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Upload Your <span className="text-sfu-red">Resume</span>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
              Our AI analyzes your experience to better match you with SFU-friendly job opportunities.
            </p>
          </div>

          {/* UPLOAD BOX */}
          <div className="grid gap-4 rounded-xl border border-neutral-100 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-[#111111]">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 py-12 dark:border-neutral-700 rounded-lg">
              <span className="material-symbols-outlined text-sfu-red text-5xl mb-4">cloud_upload</span>
              <input 
                type="file" 
                onChange={handleFileChange}
                className="text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-sfu-red file:text-white hover:file:bg-[#8B1526] cursor-pointer"
                accept=".pdf,.doc,.docx"
              />
              <p className="mt-4 text-xs text-neutral-400 font-medium tracking-widest uppercase">
                {file ? `Selected: ${file.name}` : "PDF or Word documents only"}
              </p>
            </div>
            
            <button 
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="bg-sfu-red w-full flex h-12 cursor-pointer items-center justify-center rounded px-6 text-sm font-bold uppercase tracking-widest text-white shadow-md transition-all hover:bg-[#8B1526] disabled:bg-neutral-300 dark:disabled:bg-neutral-800"
            >
              {isUploading ? "Processing..." : "Upload Resume"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}