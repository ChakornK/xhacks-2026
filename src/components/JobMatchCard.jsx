import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Icon } from "@mui/material";
import { CircularIndicator } from "./CircularIndicator";

export default function JobMatchCard({ title, company, location, compatibility, missingCourses, missingSkills, link, additionalInfo }) {
  return (
    <div className="bg-background-dark flex flex-col gap-5 rounded-lg border border-neutral-800 p-6">
      <div className="flex items-center gap-4 border-b border-neutral-800 pb-4">
        <div className="grow">
          <p className="text-lg font-bold tracking-tight text-white">{title}</p>
          <p className="text-sm text-neutral-400">
            {company} • {location}
          </p>
        </div>

        <div className="text-sfu-red w-12 text-center text-xl font-bold">
          <CircularIndicator colour={"#A6192E"} percentage={compatibility} />
        </div>
      </div>

      <div className="space-y-4">
        {missingCourses.length > 0 && (
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Recommended Courses</p>
            <div className="flex flex-wrap gap-2">
              {missingCourses.map((j) => (
                <span key={j} className="rounded border border-neutral-700 bg-neutral-800 px-2.5 py-1 text-[11px] font-semibold text-neutral-300">
                  {j}
                </span>
              ))}
            </div>
          </div>
        )}

        {missingSkills.length > 0 && (
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Missing Skills</p>
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((j) => (
                <span key={j} className="rounded border border-neutral-700 bg-neutral-800 px-2.5 py-1 text-[11px] font-semibold text-neutral-300">
                  {j}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {additionalInfo && (
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Additional Details</p>
          <p className="text-sm">{additionalInfo}</p>
        </div>
      )}

      <div className="grow"></div>
      <a href={link} target="_blank" className="btn">
        View on LinkedIn
        <Icon
          component={OpenInNewRoundedIcon}
          sx={{
            width: "1rem",
            height: "1rem",
          }}
        />
      </a>
    </div>
  );
}
