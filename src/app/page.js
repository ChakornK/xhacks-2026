"use client";

import JobMatchCard from "@/components/JobMatchCard";
import LoginButton from "@/components/LoginButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function HomePage() {
  const heroBgStyle = {
    backgroundImage:
      'linear-gradient(to bottom, rgba(35, 31, 32, 0.85) 0%, rgba(35, 31, 32, 0.95) 100%), url("https://www.sfu.ca/content/sfu/main/campuses/surrey/jcr:content/main_content/image_0.img.2000.low.jpg/1614225784102.jpg")',
  };

  const router = useRouter();

  function matchBtn() {
    router.push("/courses");
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-sfu-dark relative flex w-full flex-col overflow-x-hidden transition-colors duration-300 dark:text-neutral-100">
      <main className="flex-1">
        <div className="dark:bg-background-dark/95 dark:bg-background-dark sticky top-0 z-50 w-full border-b border-solid border-neutral-200 bg-white/95 backdrop-blur-md dark:border-neutral-800">
          <div className="mx-auto flex max-w-[1280px] items-center justify-between whitespace-nowrap px-6 py-4 lg:px-10">
            <div className="text-sfu-dark group flex cursor-pointer items-center gap-3 dark:text-white">
              <div className="size-9 bg-sfu-red flex items-center justify-center rounded">
                <span className="material-symbols-outlined text-xl text-white">school</span>
              </div>
              <h2 className="text-xl font-extrabold uppercase leading-tight tracking-tight">
                SFU <span className="text-sfu-red">CareerConnect</span>
              </h2>
            </div>
            <div>
            </div>

            {/* <nav className="hidden flex-1 justify-center gap-10 md:flex">
              <Link className="hover:text-sfu-red text-sm font-semibold text-neutral-600 transition-colors dark:text-neutral-300" href="/">
                Process
              </Link>

              <Link className="hover:text-sfu-red text-sm font-semibold text-neutral-600 transition-colors dark:text-neutral-300" href="/courses">
                Courses
              </Link>
              <Link className="hover:text-sfu-red text-sm font-semibold text-neutral-600 transition-colors dark:text-neutral-300" href="#">
                Match
              </Link>
            </nav> */}

            {/* <div className="flex gap-4">
              <button className="text-sfu-dark flex h-10 min-w-[90px] cursor-pointer items-center justify-center rounded border border-neutral-300 bg-transparent px-4 text-sm font-bold transition-all hover:bg-neutral-50 dark:border-neutral-700 dark:text-white dark:hover:bg-white/5">
                Login
              </button>
              <button className="bg-sfu-red flex h-10 min-w-[90px] cursor-pointer items-center justify-center rounded px-4 text-sm font-bold text-white shadow-md transition-all hover:bg-[#8B1526]">
                Sign-up
              </button>
            </div> */}
          </div>
        </div>
        {/* Hero */}
        <div className="@container mx-auto max-w-[1440px]">
          <div className="@[480px]:p-10 p-6">
            <div
              className="@[480px]:gap-8 relative flex min-h-[600px] flex-col items-center justify-center gap-6 overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat p-8 text-center"
              style={heroBgStyle}
            >
              <div className="bg-sfu-red/10 absolute -right-24 -top-24 h-96 w-96 rounded-full blur-[120px]" />

              <div className="relative z-10 flex max-w-[900px] flex-col gap-6">
                <h1 className="@[480px]:text-7xl text-5xl font-extrabold leading-tight tracking-tight text-white">
                  Your Career, <span className="text-sfu-red">Connected.</span>
                </h1>

                <h2 className="@[480px]:text-2xl mx-auto max-w-3xl text-lg font-light leading-relaxed text-neutral-300">
                  Connect the gap between Simon Fraser University academics and global careers. We match your course history to live career opportunities.
                </h2>
              </div>

              <div className="relative z-10 mt-4 flex flex-col gap-5 sm:flex-row">
                <LoginButton />
              </div>
            </div>
          </div>
        </div>

        {/* Matching Process */}
        <div className="bg-background-alt py-24 dark:bg-[#181818]">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <div className="mb-16 flex flex-col items-center gap-4 text-center">
              <h2 className="text-sfu-dark text-4xl font-extrabold tracking-tight dark:text-white">The Matching Process</h2>
              <div className="bg-sfu-red h-1.5 w-24" />
              <p className="mt-2 max-w-xl text-neutral-500 dark:text-neutral-400">
                A data-driven approach to professional development tailored specifically for the SFU curriculum.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Card 1 */}
              <div className="dark:bg-background-dark hover:border-sfu-red/30 group flex flex-col gap-8 rounded border border-neutral-100 bg-white p-10 shadow-sm transition-all hover:shadow-xl dark:border-neutral-800">
                <div className="size-16 text-sfu-red group-hover:bg-sfu-red flex items-center justify-center rounded bg-neutral-50 transition-all duration-300 group-hover:text-white dark:bg-neutral-800">
                  <span className="material-symbols-outlined text-4xl">sync_saved_locally</span>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-sfu-dark text-xl font-bold uppercase tracking-tight dark:text-white">1. Add SFU Courses</h3>
                  <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                    Select your SFU courses. Our matching engine decodes SFU courses into industry-standard skills.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="dark:bg-background-dark hover:border-sfu-red/30 group flex flex-col gap-8 rounded border border-neutral-100 bg-white p-10 shadow-sm transition-all hover:shadow-xl dark:border-neutral-800">
                <div className="size-16 text-sfu-red group-hover:bg-sfu-red flex items-center justify-center rounded bg-neutral-50 transition-all duration-300 group-hover:text-white dark:bg-neutral-800">
                  <span className="material-symbols-outlined text-4xl">upload_file</span>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-sfu-dark text-xl font-bold uppercase tracking-tight dark:text-white">2. Upload Resume</h3>
                  <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                    Provide your latest professional profile. We will analyze your coverletter and your SFU courses. Tips will be provided to help strengthen
                    your resume/coverletter.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="dark:bg-background-dark hover:border-sfu-red/30 group flex flex-col gap-8 rounded border border-neutral-100 bg-white p-10 shadow-sm transition-all hover:shadow-xl dark:border-neutral-800">
                <div className="size-16 text-sfu-red group-hover:bg-sfu-red flex items-center justify-center rounded bg-neutral-50 transition-all duration-300 group-hover:text-white dark:bg-neutral-800">
                  <span className="material-symbols-outlined text-4xl">travel_explore</span>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-sfu-dark text-xl font-bold uppercase tracking-tight dark:text-white">3. Connect to careers</h3>
                  <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                    View LinkedIn job postings and see where you hold a competitive advantage based on your SFU education. Get a rating based on how well your
                    background matches with the job.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SFU Edge */}

        <section className="dark:bg-background-dark overflow-hidden bg-white py-24">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <div className="flex flex-col items-center gap-16 lg:flex-row">
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-sfu-dark mb-8 text-4xl font-extrabold leading-tight dark:text-white lg:text-5xl">
                  Technology that speaks <span className="text-sfu-red">SFU.</span>
                </h2>
                <p className="mb-10 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
                  We understand that an SFU degree carries specific precision based on personal projects. Our AI knows exactly how your coursework prepares you
                  for industries officials.
                </p>

                <div className="mx-auto max-w-md space-y-6 lg:mx-0">
                  <div className="flex items-start gap-4 text-left text-neutral-700 dark:text-neutral-300">
                    <span className="material-symbols-outlined text-sfu-red mt-1">verified</span>
                    <div>
                      <p className="font-bold">Course-to-Skills Mapping</p>
                      <p className="text-sm text-neutral-500">Translating course credits into professional skillsets.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-left text-neutral-700 dark:text-neutral-300"></div>

                  <div className="flex items-start gap-4 text-left text-neutral-700 dark:text-neutral-300">
                    <span className="material-symbols-outlined text-sfu-red mt-1">verified</span>
                    <div>
                      <p className="font-bold">Student Real-time LinkedIn Connection</p>
                      <p className="text-sm text-neutral-500">Connections with the latest professional opportunities.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative w-full flex-1">
                <div className="mx-auto max-w-md rounded border border-neutral-200 bg-neutral-50 p-3 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900">
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
