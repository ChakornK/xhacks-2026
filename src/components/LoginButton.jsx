"use client";

import { signIn } from "@/lib/auth-client";

export default function SignInButton() {
  return (
    <button
      onClick={async () => {
        await signIn.social({
          provider: "google",
          callbackURL: "/dashboard",
        });
      }}
      className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
    >
      Sign in with Google
    </button>
  );
}
