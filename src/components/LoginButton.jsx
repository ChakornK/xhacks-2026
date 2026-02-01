"use client";
import { useSession, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignInButton() {
  // Check if the user is logged in
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <button className="bg-sfu-red flex h-14 min-w-[200px] cursor-pointer items-center justify-center rounded px-8 text-2xl font-bold text-white shadow-lg transition-all hover:bg-[#8B1526]">
        Loading...
      </button>
    );
  }

  if (session) {
    return (
      <button
        className="bg-sfu-red flex h-14 min-w-[200px] items-center justify-center rounded px-8 text-lg font-bold text-white shadow-lg transition-all hover:scale-110 hover:bg-[#8B1526] active:scale-105"
        onClick={() => router.push("/courses")}
      >
        Go to Courses
      </button>
    );
  }
  return (
    <button
      onClick={async () => {
        await signIn.social({
          provider: "google",
          callbackURL: "/courses",
        });
      }}
      className="bg-sfu-red flex h-14 min-w-[200px] cursor-pointer items-center justify-center rounded px-8 text-2xl font-bold text-white shadow-lg transition-all hover:bg-[#8B1526]"
    >
      Get Started
    </button>
  );
}
