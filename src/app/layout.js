// app/layout.js
import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata = {
  title: "SFU CourseConnect | Your Future Starts Here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="dark:bg-background-dark">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
