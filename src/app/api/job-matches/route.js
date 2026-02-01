import dbConnect from "@/lib/mongodb";
import { session } from "@/lib/session";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const s = await session();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const user = await User.findById(s.user.id);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const parsed = JSON.parse(user.jobMatches || "{}");
  return NextResponse.json(parsed.jobs.jobs ? parsed.jobs : parsed);
}
