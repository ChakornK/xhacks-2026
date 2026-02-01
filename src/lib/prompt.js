export function jobTitlesPrompt(courseContext, resume) {
  return `Analyze these SFU courses:${courseContext}
  
Task:
Generate 3 high-demand job titles for someone targeting employment in **British Columbia**.

Hard constraints:
- Prioritize roles that are commonly hired in BC (Vancouver, Burnaby, Richmond, Surrey, Victoria).
- Avoid roles that are primarily concentrated in Eastern Canada / GTA-only.
- Titles must be real, commonly used job titles in Canada (not made-up).
- Keep titles general enough to appear on job boards (not company-specific).

Output rules:
- Return ONLY a JSON array of strings (example: ["Title 1","Title 2"]).
- No markdown, no explanation, no extra keys, no trailing commas.
- If you are unsure, still return your best guess but obey the JSON-only rule.

Resume: ${resume}`;
}
export function jobRankingPrompt(courseContext, jobs) {
  return `Student experience:${courseContext}
Jobs: ${jobs.map((j, i) => `ID ${i}: ${j.position} at ${j.company}`).join("\n")}

Rate each job (0-100) and provide a "reason" mentioning specific course codes (e.g., CMPT 225).
Return JSON array of objects: [{"id": 0, "score": 85, "reason": "..."}]

In addition to the jobs, provide a general "profileSummary" and "interviewPrep".
Return the final JSON in this format:
{
  "jobs": [{"id": 0, "score": 85, "reason": "..."}, ...],
  "profileSummary": "A 2-sentence summary of their current competitiveness.",
  "interviewPrep": ["Tip 1: Brush up on Python", "Tip 2: Mention your CMPT 225 project"]
}

Output rules:
- Return ONLY a JSON array of strings (example: ["Title 1","Title 2"]).
- No markdown, no explanation, no extra keys, no trailing commas.
- If you are unsure, still return your best guess but obey the JSON-only rule.`;
}
