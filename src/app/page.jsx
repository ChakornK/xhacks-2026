"use client";

import JobMatchCard from "@/components/JobMatchCard";
import LoginButton from "@/components/LoginButton";
import LogOut from "@/components/LogOut";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const { data: sessionData } = useSession();

  return (
    <div className="bg-background-dark relative flex w-full flex-col overflow-x-hidden text-neutral-100 transition-colors duration-300">
      <main className="flex-1">
        <section className="h-dvh relative">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("https://www.sfu.ca/content/sfu/main/campuses/surrey/jcr:content/main_content/image_0.img.2000.low.jpg/1614225784102.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          />
          <div className="h-dvh absolute inset-0 bg-black/75" />
          <div className="relative z-10">
            <div className="sticky top-0 z-50 w-full">
              <div
                className={`mx-auto flex max-w-7xl items-center whitespace-nowrap px-6 py-4 lg:px-10 ${sessionData?.session ? "justify-between" : "justify-center"}`}
              >
                <div className="group flex cursor-pointer items-center gap-3 text-white">
                  <div className="size-9 bg-sfu-red flex items-center justify-center rounded">
                    <span className="material-symbols-outlined text-xl text-white">school</span>
                  </div>
                  <h2 className="text-xl font-extrabold uppercase leading-tight tracking-tight">
                    SFU <span className="text-sfu-red">CareerConnect</span>
                  </h2>
                </div>
                {sessionData?.session && <LogOut />}
              </div>
            </div>
            {/* Hero */}
            <div className="@container max-w-360 mx-auto">
              <div className="@[480px]:p-10 p-6">
                <div className="@[480px]:gap-8 min-h-150 relative flex flex-col items-center justify-center gap-6 p-8 text-center">
                  <div className="bg-sfu-red/10 absolute -right-24 -top-24 h-96 w-96 rounded-full blur-[120px]" />

                  <div className="max-w-225 relative z-10 flex flex-col gap-6">
                    <h1 className="@[480px]:text-7xl text-5xl font-extrabold leading-tight tracking-tight text-white">
                      Your Career, <span className="text-sfu-red">Connected</span>
                    </h1>

                    <h2 className="@[480px]:text-2xl mx-auto max-w-3xl text-lg font-light leading-relaxed text-neutral-300">
                      Connect the gap between Simon Fraser University academics and your future career. We match your course history to live internship
                      opportunities.
                    </h2>
                  </div>

                  <div className="relative z-10 mt-4 flex flex-col gap-5 sm:flex-row">
                    <LoginButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Matching Process */}
        <div className="bg-background-alt py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-16 flex flex-col items-center gap-4 text-center">
              <h2 className="text-4xl font-extrabold tracking-tight text-white">The Matching Process</h2>
              <div className="bg-sfu-red h-1.5 w-24" />
              <p className="mt-2 max-w-xl text-neutral-400">A data-driven approach to professional development tailored specifically for the SFU curriculum.</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Card 1 */}
              <div className="bg-background-dark group flex flex-col gap-8 rounded border border-neutral-800 p-10 shadow-sm transition-all">
                <div className="size-16 text-sfu-red flex items-center justify-center rounded bg-neutral-800 transition-all duration-300">
                  <span className="material-symbols-outlined text-4xl">sync_saved_locally</span>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white">1. Add SFU Courses</h3>
                  <p className="text-base leading-relaxed text-neutral-400">
                    Select your SFU courses. Our matching engine decodes SFU courses into industry-standard skills.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-background-dark group flex flex-col gap-8 rounded border border-neutral-800 p-10 shadow-sm transition-all">
                <div className="size-16 text-sfu-red flex items-center justify-center rounded bg-neutral-800 transition-all duration-300">
                  <span className="material-symbols-outlined text-4xl">upload_file</span>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white">2. Upload Resume</h3>
                  <p className="text-base leading-relaxed text-neutral-400">
                    Provide your latest professional profile. We will analyze your resume to learn more about your skills outside of your courses.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-background-dark group flex flex-col gap-8 rounded border border-neutral-800 p-10 shadow-sm transition-all">
                <div className="size-16 text-sfu-red flex items-center justify-center rounded bg-neutral-800 transition-all duration-300">
                  <span className="material-symbols-outlined text-4xl">travel_explore</span>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white">3. Discover Internships</h3>
                  <p className="text-base leading-relaxed text-neutral-400">
                    View internships from LinkedIn and see where you hold a competitive advantage based on your SFU education. Get a rating based on how well
                    your background matches with the internship.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SFU Edge */}

        <section className="bg-background-dark overflow-hidden py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col items-center gap-16 lg:flex-row">
              <div className="flex-1 text-center lg:text-left">
                <h2 className="mb-8 text-4xl font-extrabold leading-tight text-white lg:text-5xl">
                  Technology that speaks <span className="text-sfu-red">SFU</span>
                </h2>
                <p className="mb-10 text-lg leading-relaxed text-neutral-400">
                  We understand that an SFU degree carries specific precision based on personal projects. Our AI knows exactly how your coursework prepares you
                  for industries officials.
                </p>

                <div className="mx-auto max-w-md space-y-6 lg:mx-0">
                  <div className="flex items-start gap-4 text-left text-neutral-300">
                    <span className="material-symbols-outlined text-sfu-red mt-1">verified</span>
                    <div>
                      <p className="font-bold">Course-to-Skills Mapping</p>
                      <p className="text-sm text-neutral-400">Translating course credits into professional skillsets.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-left text-neutral-300">
                    <span className="material-symbols-outlined text-sfu-red mt-1">verified</span>
                    <div>
                      <p className="font-bold">Real-time Feedback</p>
                      <p className="text-sm text-neutral-400">Providing instant recommentations for improvement.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative w-full flex-1">
                <div className="mx-auto max-w-md rounded border border-neutral-800 bg-neutral-900 p-3 shadow-2xl">
                  <JobMatchCard
                    title={"Software Engineer"}
                    company={"Tech Corp"}
                    location={"Burnaby, BC"}
                    compatibility={67}
                    missingCourses={["CMPT 300", "CMPT 295"]}
                    missingSkills={["C++"]}
                    link={null}
                  />
                </div>

                <div className="size-40 bg-sfu-red/5 absolute -right-10 -top-10 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
      </main>
    </div>
  );
}
