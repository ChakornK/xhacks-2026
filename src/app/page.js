// app/page.js

export default function HomePage() {
  const heroBgStyle = {
    backgroundImage:
      'linear-gradient(to bottom, rgba(35, 31, 32, 0.85) 0%, rgba(35, 31, 32, 0.95) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCnZ7YqifeHcb0VSzaeWVsqoexw6CwakZ4cvR-KXDuoD2rzpAhHw3T5yQ9XPxVBuZ0hJLD4mYopcr8O2wP-olkAqczEPNfNvjaWrM7va0t7Zoqqdl_HBybVr12-r-cfGv_LZzd-9p_GADFk3Sd84gNQM50cOrb-8QVZ0Gdy4sJO2FxNwkyK6IzkU0yODM0xOOFUTfJpO-lKHBuStDUXzXdey3wZAZIAk3gm_OvCxewdLGOJInfXURnlI2LKxYc1-rG1XZ2gfbN69xx2")',
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-sfu-dark relative flex w-full flex-col overflow-x-hidden transition-colors duration-300 dark:text-gray-100">
      <header className="dark:bg-background-dark/95 sticky top-0 z-50 w-full border-b border-solid border-gray-200 bg-white/95 backdrop-blur-md dark:border-gray-800">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between whitespace-nowrap px-6 py-4 lg:px-10">
          <div className="text-sfu-dark group flex cursor-pointer items-center gap-3 dark:text-white">
            <div className="size-9 bg-sfu-red flex items-center justify-center rounded">
              <span className="material-symbols-outlined text-xl text-white">school</span>
            </div>
            <h2 className="text-xl font-extrabold uppercase leading-tight tracking-tight">
              SFU <span className="text-sfu-red">CareerConnect</span>
            </h2>
          </div>

          <nav className="hidden flex-1 justify-center gap-10 md:flex">
            <a
              className="hover:text-sfu-red text-sm font-semibold text-gray-600 transition-colors dark:text-gray-300"
              href="#"
            >
              Home
            </a>
          
            <a
              className="hover:text-sfu-red text-sm font-semibold text-gray-600 transition-colors dark:text-gray-300"
              href="#"
            >
              Courses
            </a>
            <a
              className="hover:text-sfu-red text-sm font-semibold text-gray-600 transition-colors dark:text-gray-300"
              href="#"
            >
              Connect
            </a>
          </nav>

          <div className="flex gap-4">
            <button className="text-sfu-dark flex h-10 min-w-[90px] cursor-pointer items-center justify-center rounded border border-gray-300 bg-transparent px-4 text-sm font-bold transition-all hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-white/5">
              Login
            </button>
            <button className="bg-sfu-red flex h-10 min-w-[90px] cursor-pointer items-center justify-center rounded px-4 text-sm font-bold text-white shadow-md transition-all hover:bg-[#8B1526]">
              Sign-up
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <div className="@container mx-auto max-w-[1440px]">
          <div className="@[480px]:p-10 p-6">
            <div
              className="@[480px]:gap-8 relative flex min-h-[600px] flex-col items-center justify-center gap-6 overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat p-8 text-center"
              style={heroBgStyle}
            >
              <div className="bg-sfu-red absolute left-0 top-0 h-1 w-full" />
              <div className="bg-sfu-red/10 absolute -right-24 -top-24 h-96 w-96 rounded-full blur-[120px]" />

              <div className="relative z-10 flex max-w-[900px] flex-col gap-6">


                <h1 className="@[480px]:text-7xl text-5xl font-extrabold leading-tight tracking-tight text-white">
                  Your Degree, <span className="text-sfu-red">Connected.</span>
                </h1>

                <h2 className="@[480px]:text-2xl mx-auto max-w-3xl text-lg font-light leading-relaxed text-gray-300">
                  Bridge the gap between Simon Fraser University academics and global careers. We map your specific
                  course history to live career opportunities.
                </h2>
              </div>

              <div className="relative z-10 mt-4 flex flex-col gap-5 sm:flex-row">
                <button className="bg-sfu-red flex h-14 min-w-[200px] cursor-pointer items-center justify-center rounded px-8 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#8B1526]">
                  <span className="truncate uppercase tracking-wide">Find Your Match</span>
                </button>
                <button className="flex h-14 min-w-[200px] cursor-pointer items-center justify-center rounded border border-white/20 bg-white/10 px-8 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white/20">
                  <span className="truncate font-medium uppercase tracking-wide">Learn More</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Matching Process */}
        <div className="bg-background-alt py-24 dark:bg-[#181818]">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <div className="mb-16 flex flex-col items-center gap-4 text-center">
              <h2 className="text-sfu-dark text-4xl font-extrabold tracking-tight dark:text-white">
                The Matching Process
              </h2>
              <div className="bg-sfu-red h-1.5 w-24" />
              <p className="mt-2 max-w-xl text-gray-500 dark:text-gray-400">
                A data-driven approach to professional development tailored specifically for the SFU curriculum.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Card 1 */}
              <div className="dark:bg-background-dark hover:border-sfu-red/30 group flex flex-col gap-8 rounded border border-gray-100 bg-white p-10 shadow-sm transition-all hover:shadow-xl dark:border-gray-800">
                <div className="size-16 text-sfu-red group-hover:bg-sfu-red flex items-center justify-center rounded bg-gray-50 transition-all duration-300 group-hover:text-white dark:bg-gray-800">
                  <span className="material-symbols-outlined text-4xl">sync_saved_locally</span>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-sfu-dark text-xl font-bold uppercase tracking-tight dark:text-white">
                    1. Sync SFU Courses
                  </h3>
                  <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                    Import your academic transcript directly. Our matching engine decodes SFU course codes into
                    industry-standard competencies.
                  </p>
                </div>

                <div className="mt-auto border-t border-gray-50 pt-6 dark:border-gray-800">
                  <a
                    className="text-sfu-red inline-flex items-center text-sm font-bold uppercase tracking-wider transition-all hover:gap-2"
                    href="#"
                  >
                    Security Details <span className="material-symbols-outlined ml-1 text-sm">chevron_right</span>
                  </a>
                </div>
              </div>

              {/* Card 2 */}
              <div className="dark:bg-background-dark hover:border-sfu-red/30 group flex flex-col gap-8 rounded border border-gray-100 bg-white p-10 shadow-sm transition-all hover:shadow-xl dark:border-gray-800">
                <div className="size-16 text-sfu-red group-hover:bg-sfu-red flex items-center justify-center rounded bg-gray-50 transition-all duration-300 group-hover:text-white dark:bg-gray-800">
                  <span className="material-symbols-outlined text-4xl">upload_file</span>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-sfu-dark text-xl font-bold uppercase tracking-tight dark:text-white">
                    2. Upload Resume
                  </h3>
                  <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                    Provide your latest professional profile. We analyze your project work and extracurriculars to
                    supplement your academic strengths.
                  </p>
                </div>

                <div className="mt-auto border-t border-gray-50 pt-6 dark:border-gray-800">
                  <a
                    className="text-sfu-red inline-flex items-center text-sm font-bold uppercase tracking-wider transition-all hover:gap-2"
                    href="#"
                  >
                    Resume Tips <span className="material-symbols-outlined ml-1 text-sm">chevron_right</span>
                  </a>
                </div>
              </div>

              {/* Card 3 */}
              <div className="dark:bg-background-dark hover:border-sfu-red/30 group flex flex-col gap-8 rounded border border-gray-100 bg-white p-10 shadow-sm transition-all hover:shadow-xl dark:border-gray-800">
                <div className="size-16 text-sfu-red group-hover:bg-sfu-red flex items-center justify-center rounded bg-gray-50 transition-all duration-300 group-hover:text-white dark:bg-gray-800">
                  <span className="material-symbols-outlined text-4xl">travel_explore</span>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-sfu-dark text-xl font-bold uppercase tracking-tight dark:text-white">
                    3. Live Career Match
                  </h3>
                  <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                    Instantly see LinkedIn job postings where you hold a competitive advantage based on your SFU
                    education.
                  </p>
                </div>

                <div className="mt-auto border-t border-gray-50 pt-6 dark:border-gray-800">
                  <a
                    className="text-sfu-red inline-flex items-center text-sm font-bold uppercase tracking-wider transition-all hover:gap-2"
                    href="#"
                  >
                    View Matches <span className="material-symbols-outlined ml-1 text-sm">chevron_right</span>
                  </a>
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
                <h3 className="text-sfu-red mb-4 text-sm font-bold uppercase tracking-widest">The SFU Edge</h3>
                <h2 className="text-sfu-dark mb-8 text-4xl font-extrabold leading-tight dark:text-white lg:text-5xl">
                  Technology that speaks <span className="text-sfu-red">SFU.</span>
                </h2>
                <p className="mb-10 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  Standard job boards treat every degree the same. We understand that an SFU degree carries specific
                  rigor. Our AI knows exactly how your coursework prepares you for industry leaders.
                </p>

                <div className="mx-auto max-w-md space-y-6 lg:mx-0">
                  <div className="flex items-start gap-4 text-left text-gray-700 dark:text-gray-300">
                    <span className="material-symbols-outlined text-sfu-red mt-1">verified</span>
                    <div>
                      <p className="font-bold">Course-to-Competency Mapping</p>
                      <p className="text-sm text-gray-500">Translating course credits into professional skillsets.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-left text-gray-700 dark:text-gray-300">
                    <span className="material-symbols-outlined text-sfu-red mt-1">verified</span>
                    <div>
                      <p className="font-bold">Real-time LinkedIn Integration</p>
                      <p className="text-sm text-gray-500">Daily sync with the latest professional opportunities.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-left text-gray-700 dark:text-gray-300">
                    <span className="material-symbols-outlined text-sfu-red mt-1">verified</span>
                    <div>
                      <p className="font-bold">Alumni Success Benchmarking</p>
                      <p className="text-sm text-gray-500">See what paths successful SFU alumni took from your program.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative w-full flex-1">
                <div className="mx-auto max-w-md rounded border border-gray-200 bg-gray-50 p-3 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
                  <div className="dark:bg-background-dark flex flex-col gap-5 rounded border border-gray-100 bg-white p-6 dark:border-gray-800">
                    <div className="flex items-center gap-4 border-b border-gray-100 pb-4 dark:border-gray-800">
                      <div className="size-14 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-800">
                        <span className="material-symbols-outlined text-gray-400">corporate_fare</span>
                      </div>

                      <div>
                        <p className="text-sfu-dark text-lg font-bold tracking-tight dark:text-white">
                          Systems Architect
                        </p>
                        <p className="text-sm text-gray-500">Tech Corp • Burnaby, BC</p>
                      </div>

                      <div className="bg-sfu-red ml-auto rounded px-2.5 py-1 text-[11px] font-bold uppercase text-white">
                        High Match
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">SFU Program Fit</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-sfu-dark rounded border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-semibold dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                          CMPT 300: Operating Systems
                        </span>
                        <span className="text-sfu-dark rounded border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-semibold dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                          CMPT 295: Arch
                        </span>
                        <span className="bg-sfu-red/10 text-sfu-red border-sfu-red/20 rounded border px-2.5 py-1 text-[11px] font-bold">
                          Co-op Experience
                        </span>
                      </div>
                    </div>

                    <button className="bg-sfu-dark dark:bg-sfu-red w-full rounded py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:brightness-110">
                      View on LinkedIn
                    </button>
                  </div>
                </div>

                <div className="size-40 bg-sfu-red/5 absolute -right-10 -top-10 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        
      </main>

      <footer className="dark:bg-background-dark border-t border-gray-200 bg-white py-16 dark:border-gray-800">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            <div className="col-span-1 md:col-span-1">
              <div className="text-sfu-dark mb-8 flex items-center gap-3 dark:text-white">
                <div className="size-8 bg-sfu-red flex items-center justify-center rounded-sm">
                  <span className="material-symbols-outlined text-sm text-white">school</span>
                </div>
                <h2 className="text-lg font-extrabold uppercase tracking-tight">SFU CareerConnect</h2>
              </div>

              

              <div className="flex gap-5">
                <a className="hover:text-sfu-red text-gray-400 transition-colors" href="#">
                  <span className="material-symbols-outlined">alternate_email</span>
                </a>
                <a className="hover:text-sfu-red text-gray-400 transition-colors" href="#">
                  <span className="material-symbols-outlined">share</span>
                </a>
                <a className="hover:text-sfu-red text-gray-400 transition-colors" href="#">
                  <span className="material-symbols-outlined">campaign</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sfu-dark mb-8 text-xs font-bold uppercase tracking-[0.2em] dark:text-white">
                Platform
              </h4>
              <ul className="space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                <li>
                  <a className="hover:text-sfu-red" href="#">
                    Matching Algorithm
                  </a>
                </li>
                <li>
                  <a className="hover:text-sfu-red" href="#">
                    Resume Builder
                  </a>
                </li>
                <li>
                  <a className="hover:text-sfu-red" href="#">
                    LinkedIn Integration
                  </a>
                </li>
                <li>
                  <a className="hover:text-sfu-red" href="#">
                    Co-op Tracking
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sfu-dark mb-8 text-xs font-bold uppercase tracking-[0.2em] dark:text-white">
                Resources
              </h4>
              <ul className="space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                <li>
                  <a className="hover:text-sfu-red" href="#">
                    Career Blog
                  </a>
                </li>
                <li>
                  <a className="hover:text-sfu-red" href="#">
                    Student Success
                  </a>
                </li>
                <li>
                  <a className="hover:text-sfu-red" href="#">
                    Interview Prep
                  </a>
                </li>
                <li>
                  <a className="hover:text-sfu-red" href="#">
                    Campus Events
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sfu-dark mb-8 text-xs font-bold uppercase tracking-[0.2em] dark:text-white">
                Institutional
              </h4>
              <ul className="space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                <li>
                  <a className="hover:text-sfu-red" href="#">
                    SFU Privacy
                  </a>
                </li>
                <li>
                  <a className="hover:text-sfu-red" href="#">
                    Student Services
                  </a>
                </li>
                <li>
                  <a className="hover:text-sfu-red" href="#">
                    Security Protocols
                  </a>
                </li>
                <li>
                  <a className="hover:text-sfu-red" href="#">
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-gray-100 pt-8 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:border-gray-800 md:flex-row">
            <p>© 2024 Simon Fraser University • CareerConnect</p>
            <div className="flex gap-8">
              <a className="hover:text-sfu-red" href="#">
                Sitemap
              </a>
              <a className="hover:text-sfu-red" href="#">
                Status
              </a>
              
              <a className="hover:text-sfu-red" href="#">
                Feedback
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
