import { cacheData } from "@/lib/redis";
import { NextResponse } from "next/server";

const allowedDepts = ["CMPT", "MATH", "MACM", "STAT", "ENSC"];

export async function GET(req, res) {
  try {
    const data = await cacheData(
      `courses`,
      async () => {
        const listRes = await fetch("https://api.sfucourses.com/v1/rest/outlines");
        const courseList = await listRes.json();
        return courseList.reduce((prev, { dept, number, title, description }) => {
          if (allowedDepts.includes(dept)) {
            prev.push({
              code: `${dept} ${number}`,
              title,
            });
          }
          return prev;
        }, []);
      },
      60 * 60 * 24 * 7,
    );
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
