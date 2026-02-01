"use client";
import { useSession, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogOut() {
    const {data: session } = useSession();
    const router = useRouter();

    if (session) {
        return (
            <button onClick={() => signOut() } className="bg-sfu-red min-w-20 flex h-8 cursor-pointer items-center justify-center rounded px-8 text-md font-bold text-white shadow-lg transition-all hover:bg-[#8B1526]">Log Out</button>
        );
    }
    return null;
}