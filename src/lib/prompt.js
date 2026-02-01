export function jobTitlesPrompt(courseContext) {
  return [
    {
      text: `Analyze these SFU courses:${courseContext}
  
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
  `,
    },
  ];
}
