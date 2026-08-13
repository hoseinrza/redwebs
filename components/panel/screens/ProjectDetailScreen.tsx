import { Check } from "lucide-react";
import { portalProjects, projectMilestones, projectRecentFiles, projectTeam } from "@/lib/data/portal";

function toFa(n: number) {
  return String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

export default function ProjectDetailScreen({
  projectId,
  onBack,
}: {
  projectId: string;
  onBack: () => void;
}) {
  const project = portalProjects.find((p) => p.id === projectId) ?? portalProjects[0];

  return (
    <div className="flex flex-col gap-5 px-5 pb-10 pt-6 sm:px-7">
      <button type="button" onClick={onBack} className="w-fit text-xs font-semibold text-ink-400 hover:text-ink-700">
        → بازگشت به پروژه‌ها
      </button>

      <div className="flex flex-col gap-5 rounded-[18px] border border-ink-150 bg-white p-6">
        <div className="flex flex-wrap items-start gap-4">
          <span className="h-16 w-16 flex-none rounded-2xl" style={{ background: project.swatch }} />
          <div className="min-w-[200px] flex-1">
            <p className="text-xl font-extrabold text-ink-900">{project.title}</p>
            <p className="mt-1.5 text-xs text-ink-400">{project.dates}</p>
          </div>
          <div className="text-left">
            <p className="text-2xl font-extrabold text-accent-600">{toFa(project.pct)}٪</p>
            <p className="mt-1 text-[11px] text-ink-400">پیشرفت پروژه</p>
          </div>
        </div>
        <div className="h-2 rounded-full bg-ink-100">
          <div className="h-full rounded-full bg-accent-500" style={{ width: `${project.pct}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-ink-150 bg-white p-[22px]">
          <p className="text-sm font-bold text-ink-900">مراحل و مایل‌استون‌ها</p>
          <div className="mt-4 flex flex-col">
            {projectMilestones.map((m, i) => (
              <div key={m.title} className="flex gap-3.5">
                <div className="flex flex-none flex-col items-center">
                  {m.status === "done" ? (
                    <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-accent-600 text-white">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                  ) : m.status === "active" ? (
                    <span className="h-[22px] w-[22px] rounded-full border-2 border-accent-600 bg-white" />
                  ) : (
                    <span className="h-[22px] w-[22px] rounded-full bg-ink-100" />
                  )}
                  {i < projectMilestones.length - 1 && (
                    <span className={`my-1.5 w-0.5 flex-1 ${m.status === "done" ? "bg-accent-100" : "bg-ink-150"}`} />
                  )}
                </div>
                <div className="pb-5">
                  <p className="text-[13px] font-bold text-ink-900">{m.title}</p>
                  <p
                    className={`mt-1 text-[11.5px] leading-relaxed ${
                      m.status === "active" ? "font-semibold text-accent-600" : "text-ink-400"
                    }`}
                  >
                    {m.meta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-ink-150 bg-white p-5">
            <p className="text-sm font-bold text-ink-900">تیم پروژه</p>
            <div className="mt-3.5 flex flex-col gap-3">
              {projectTeam.map((member) => (
                <div key={member.name} className="flex items-center gap-2.5">
                  <span
                    className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full text-[11px] font-bold text-white"
                    style={{ background: member.bg }}
                  >
                    {member.initials}
                  </span>
                  <div>
                    <p className="text-[12.5px] font-semibold text-ink-900">{member.name}</p>
                    <p className="mt-0.5 text-[10.5px] text-ink-400">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-ink-150 bg-white p-5">
            <p className="text-sm font-bold text-ink-900">آخرین فایل‌ها</p>
            <div className="mt-3.5 flex flex-col gap-2.5">
              {projectRecentFiles.map((file) => (
                <div key={file.name} className="flex items-center gap-2.5">
                  <span
                    className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-lg text-[9px] font-bold"
                    style={{ background: file.bg, color: file.fg }}
                  >
                    {file.kind}
                  </span>
                  <p className="flex-1 truncate text-xs text-ink-700">{file.name}</p>
                  <span className="flex-none text-[10.5px] text-ink-400">{file.meta}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
