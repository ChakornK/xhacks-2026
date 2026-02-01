import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dept = searchParams.get("dept")?.toLowerCase() || "cmpt";

  try {
    const listRes = await fetch(`https://www.sfu.ca/bin/wcm/course-outlines?current/current/${dept}`);
    const courseList = await listRes.json();

    const hydrated = await Promise.all(
      courseList.slice(0, 30).map(async (item) => {
        try {
          // Try D100 first, then C100 as a backup
          let detailRes = await fetch(`https://www.sfu.ca/bin/wcm/course-outlines?current/current/${dept}/${item.value}/d100`);
          let details = await detailRes.json();

          if (!details.info?.description) {
            detailRes = await fetch(`https://www.sfu.ca/bin/wcm/course-outlines?current/current/${dept}/${item.value}/c100`);
            details = await detailRes.json();
          }

          return {
            _id: `${dept}-${item.value}`,
            dept: dept.toUpperCase(),
            number: item.value,
            title: item.title,
            description: details.info?.description || "Technical course focusing on " + item.title
          };
        } catch (e) {
          return {
            _id: `${dept}-${item.value}`,
            dept: dept.toUpperCase(),
            number: item.value,
            title: item.title,
            description: "Detailed study of " + item.title
          };
        }
      })
    );

    return NextResponse.json(hydrated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}