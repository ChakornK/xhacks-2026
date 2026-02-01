import { cacheData } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dept = searchParams.get("dept")?.toLowerCase() || "cmpt";

  try {
    const data = await cacheData(
      `courses-${dept}`,
      async () => {
        const listRes = await fetch(`https://api.sfucourses.com/v1/rest/outlines?dept=${dept}`);
        const courseList = await listRes.json();
        return courseList.map(({ dept, number, title, description }) => ({
          code: `${dept} ${number}`,
          title,
          description,
        }));
      },
      60 * 60 * 24 * 7,
    );
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
