"use client";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogOut() {
  const { data: session } = useSession();
  const router = useRouter();

  /** Handles sign out and redirects to landing page */
  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (!session) return null;

  return (
    <button
      onClick={handleSignOut}
      className="group flex cursor-pointer items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
    >
      <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-0.5">logout</span>
      Sign Out
    </button>
  );
}