"server-only";

import { cacheData } from "./redis";

const allowedDepts = ["CMPT", "MATH", "MACM", "STAT", "ENSC"];

export const getCourses = async () => {
  return await cacheData(
    `courses`,
    async () => {
      const listRes = await fetch("https://api.sfucourses.com/v1/rest/outlines");
      const courseList = await listRes.json();
      return courseList.reduce((prev, { dept, number, title }) => {
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
};
