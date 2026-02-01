export function jobTitlesPrompt(courseContext, resume) {
  return `Analyze these SFU courses:${courseContext}
  
Task:
Generate 3 high-demand job titles for someone targeting employment in **British Columbia**.

Hard constraints:
- Titles must be real, commonly used job titles in Canada (not made-up).
- Keep titles general enough to appear on job boards (not company-specific).

Output rules:
- Return ONLY a JSON array of strings (example: ["Title 1","Title 2"]).
- No markdown, no explanation, no extra keys, no trailing commas.
- If you are unsure, still return your best guess but obey the JSON-only rule.

Resume: ${resume}`;
}
export function jobRankingPrompt(courseContext, allCourses, jobs) {
  return `Student experience:${courseContext}
All courses:${allCourses}
Jobs: ${jobs.map((j, i) => `ID ${i}: ${j.position} at ${j.company}`).join("\n")}

Rate each job (0-100) and provide a "reason" mentioning specific course codes (e.g., CMPT XXX).
Include missing courses that are recommended and missing skills required for the job.
Return JSON array of objects: [{"id": 0, "score": 85, "reason": "...", "missingCourses": ["CMPT XXX", "CMPT YYY", ...], "missingSkills": ["Skill 1", "Skill 2", ...]}, ...]

In addition to the jobs, provide a general "profileSummary", "interviewPrep", and "competencies".
Return the final JSON in this format:
{
  "jobs": [{"id": 0, "score": 85, "reason": "...", "missingCourses": ["CMPT XXX", "CMPT YYY", ...], "missingSkills": ["Skill 1", "Skill 2", ...]}, ...],
  "profileSummary": "A 2-sentence summary of their current competitiveness.",
  "interviewPrep": ["Brush up on Python", "Prepare to discuss your CMPT 225 project"],
  "competencies": [
    {"skill": "Python", "level": 90, "source": "Used in CMPT 120 and Research Project"},
    {"skill": "Data Analysis", "level": 85, "source": "Experience at Research Lab"}
  ]
}

Output rules:
- Return ONLY the specified JSON format.
- No markdown, no explanation, no extra keys, no trailing commas.
- If you are unsure, still return your best guess but obey the JSON-only rule.`;
}
