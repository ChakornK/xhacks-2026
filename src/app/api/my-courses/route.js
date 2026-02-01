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
  return NextResponse.json(user.savedCourses);
}

const courseRegex = /(cmpt|math|macm|stat|ensc) \d{3}/i;
export async function POST(req, res) {
  const s = await session();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const data = await req.json();
  if (!data.every((c) => typeof c === "string" && courseRegex.test(c))) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const user = await User.findById(s.user.id);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  user.savedCourses = data;
  await user.save();

  return NextResponse.json({ status: "success" });
}
