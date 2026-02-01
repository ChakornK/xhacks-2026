"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { extractText, getDocumentProxy } from "unpdf";

export default function ResumePage() {
  const router = useRouter();
  const fileUploadRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [fileOver, setFileOver] = useState(false);

  const [status, setStatus] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Inside your ResumePage component...
  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");
    if (file.type !== "application/pdf") return alert("Not a PDF file!");
    setIsUploading(true);

    try {
      const pdf = await getDocumentProxy(new Uint8Array(await file.arrayBuffer()));
      const { text } = await extractText(pdf, { mergePages: true });

      const response = await fetch("/api/predict", {
        method: "POST",
        body: JSON.stringify({ resume: text }),
      });
      console.log(response);
      const reader = response.body.getReader();

      if (reader) {
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            alert("Analysis failed, please try again");
            break;
          }
          const decoded = decoder.decode(value).trim();
          console.log(decoded);
          if (decoded === "OK") {
            router.push("/match");
            break;
          }
          setStatus(decoded);
        }
        setStatus(null);
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
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:px-10">
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
            <div
              className={`flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed py-12 ${fileOver ? "bg-sfu-red/10 border-sfu-red" : "border-neutral-700"}`}
              onDragOver={(e) => {
                e.preventDefault();
                setFileOver(true);
              }}
              onDragLeave={() => {
                setFileOver(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.dataTransfer.files[0] && setFile(e.dataTransfer.files[0]);
              }}
            >
              <span className="material-symbols-outlined text-sfu-red text-5xl">cloud_upload</span>
              <input ref={fileUploadRef} type="file" onChange={handleFileChange} className="hidden" accept="application/pdf" />
              {!file && (
                <button className="btn max-w-fit" onClick={() => fileUploadRef.current.click()}>
                  Browse File
                </button>
              )}
              <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">{file ? `Selected: ${file.name}` : "PDF documents only"}</p>
            </div>

            <button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="bg-sfu-red flex h-12 w-full cursor-pointer items-center justify-center rounded px-6 text-sm font-bold uppercase tracking-widest text-white shadow-md transition-all hover:bg-[#8B1526] disabled:cursor-not-allowed disabled:bg-neutral-800"
            >
              {isUploading ?
                <>
                  {`${status || "Processing"}`}
                  <span className="anim-elip-1">.</span>
                  <span className="anim-elip-2">.</span>
                  <span className="anim-elip-3">.</span>
                </>
              : "Upload Resume"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
