"use client";
import { useSession, signIn } from "@/lib/auth-client";
import { ChevronRightRounded } from "@mui/icons-material";
import { Icon } from "@mui/material";
import { useRouter } from "next/navigation";

export default function SignInButton() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        if (sessionData?.session) {
          router.push("/courses");
        } else {
          await signIn.social({
            provider: "google",
            callbackURL: "/courses",
          });
        }
      }}
      className="btn btn-lg"
    >
      {sessionData?.session ? "Go to Courses" : "Get Started"} <Icon component={ChevronRightRounded} />
    </button>
  );
}
