import {
  portalProjects,
  recentActivity,
  upcomingMilestones,
} from "@/lib/data/portal";

export default function DashboardScreen({
  onOpenProject,
  onGoProjects,
  onGoInvoices,
}: {
  onOpenProject: (id: string) => void;
  onGoProjects: () => void;
  onGoInvoices: () => void;
}) {
  const active = portalProjects.filter((p) => p.group === "در حال اجرا");

  return (
    <div className="flex flex-col gap-5 px-5 pb-10 pt-6 sm:px-7">
      <div className="relative overflow-hidden rounded-[18px] bg-ink-950 p-7 text-white">
        <div className="pointer-events-none absolute -left-12 -top-24 h-64 w-64 rounded-full bg-accent-600/[0.22] blur-[70px]" />
        <p className="relative text-[11px] font-bold tracking-wide text-accent-400">خلاصه هفته</p>
        <p className="relative mt-3 text-2xl font-extrabold">
          سه پروژه در جریانه و یک فاکتور منتظر پرداخت
        </p>
        <p className="relative mt-2.5 max-w-lg text-[13.5px] leading-loose text-ink-400">
          آخرین بروزرسانی: نسخه جدید صفحه اصلی کلینیک آرامش برای بازبینی آماده شده.
        </p>
        <div className="relative mt-5 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={onGoProjects}
            className="rounded-[10px] bg-accent-600 px-5 py-2.5 text-[12.5px] font-bold text-white transition-colors hover:bg-accent-700"
          >
            بازبینی طرح
          </button>
          <button
            type="button"
            onClick={onGoInvoices}
            className="rounded-[10px] border border-white/[0.18] px-5 py-2.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            پرداخت فاکتور
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="پروژه‌های فعال" value="۳" note="همه در زمان‌بندی" noteColor="text-emerald-600" />
        <StatCard label="فاکتور معوق" value="۱" valueColor="text-accent-600" note="۸٬۵۰۰٬۰۰۰ تومان" />
        <StatCard label="پیام خوانده‌نشده" value="۵" note="آخرین: ۲ ساعت پیش" />
        <StatCard label="فایل تحویل‌شده" value="۲۴" note="۳ مورد این هفته" />
      </div>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-ink-150 bg-white">
          <div className="flex items-center justify-between border-b border-ink-150 px-5 py-[18px]">
            <p className="text-sm font-bold text-ink-900">پروژه‌های در جریان</p>
            <button type="button" onClick={onGoProjects} className="text-xs font-semibold text-accent-600 hover:underline">
              مشاهده همه
            </button>
          </div>
          {active.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onOpenProject(p.id)}
              className="flex w-full items-center gap-4 border-b border-ink-100 px-5 py-4 text-right transition-colors last:border-b-0 hover:bg-ink-50"
            >
              <span className="h-[42px] w-[42px] flex-none rounded-[11px]" style={{ background: p.swatch }} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13.5px] font-semibold text-ink-900">{p.title}</span>
                <span className="mt-1 block text-[11.5px] text-ink-400">مرحله: {p.stage}</span>
              </span>
              <span className="hidden w-[130px] flex-none sm:block">
                <span className="block h-1.5 rounded-full bg-ink-100">
                  <span className="block h-full rounded-full bg-accent-500" style={{ width: `${p.pct}%` }} />
                </span>
              </span>
              <span className="w-9 flex-none text-left text-xs text-ink-400">{toFa(p.pct)}٪</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-ink-150 bg-white p-5">
            <p className="text-sm font-bold text-ink-900">مایل‌استون بعدی</p>
            <div className="mt-4 flex flex-col gap-3.5">
              {upcomingMilestones.map((m) => (
                <div key={m.title} className="flex gap-2.5">
                  <span
                    className={`mt-1 h-2 w-2 flex-none rounded-full ${m.active ? "bg-accent-600" : "bg-ink-200"}`}
                  />
                  <div>
                    <p className="text-[12.5px] font-semibold text-ink-900">{m.title}</p>
                    <p className="mt-1 text-[11px] text-ink-400">{m.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-ink-150 bg-white p-5">
            <p className="text-sm font-bold text-ink-900">فعالیت‌های اخیر</p>
            <div className="mt-3.5 flex flex-col gap-3">
              {recentActivity.map((a) => (
                <p key={a.text} className="text-xs leading-relaxed text-ink-600">
                  {a.text} <span className="text-ink-400">· {a.time}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function toFa(n: number) {
  return String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

function StatCard({
  label,
  value,
  note,
  valueColor = "text-ink-900",
  noteColor = "text-ink-400",
}: {
  label: string;
  value: string;
  note: string;
  valueColor?: string;
  noteColor?: string;
}) {
  return (
    <div className="rounded-[14px] border border-ink-150 bg-white p-5">
      <p className="text-xs text-ink-500">{label}</p>
      <p className={`mt-2.5 text-[26px] font-extrabold ${valueColor}`}>{value}</p>
      <p className={`mt-2 text-[11px] font-semibold ${noteColor}`}>{note}</p>
    </div>
  );
}
