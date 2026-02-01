import { getCourses } from "@/lib/courses";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const data = await getCourses();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
