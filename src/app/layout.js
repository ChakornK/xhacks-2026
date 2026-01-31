// app/layout.js
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "SFU CourseConnect | Your Future Starts Here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="dark:bg-background-dark">
        <div className="dark:bg-background-dark/95 dark:bg-background-dark sticky top-0 z-50 w-full border-b border-solid border-gray-200 bg-white/95 backdrop-blur-md dark:border-gray-800">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between whitespace-nowrap px-6 py-4 lg:px-10">
          <div className="text-sfu-dark group flex cursor-pointer items-center gap-3 dark:text-white">
            <div className="size-9 bg-sfu-red flex items-center justify-center rounded">
              <span className="material-symbols-outlined text-xl text-white">school</span>
            </div>
            <h2 className="text-xl font-extrabold uppercase leading-tight tracking-tight">
              SFU <span className="text-sfu-red">CourseConnect</span>
            </h2>
          </div>

          <nav className="hidden flex-1 justify-center gap-10 md:flex">
            <Link
              className="hover:text-sfu-red text-sm font-semibold text-gray-600 transition-colors dark:text-gray-300"
              href="#"
            >
              Home
            </Link>
            
            <Link
              className="hover:text-sfu-red text-sm font-semibold text-gray-600 transition-colors dark:text-gray-300"
              href="#"
            >
              Courses
            </Link>
            <Link
              className="hover:text-sfu-red text-sm font-semibold text-gray-600 transition-colors dark:text-gray-300"
              href="#"
            >
              Match
            </Link>
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
      </div>
        {children}
        </body>
    </html>
  );
}
