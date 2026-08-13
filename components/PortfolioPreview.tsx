import Link from "next/link";
import DashEyebrow from "@/components/DashEyebrow";
import Reveal from "@/components/Reveal";

const projects = [
  {
    category: "وب‌سایت شرکتی",
    name: "کلینیک آرامش",
    gradient: "linear-gradient(135deg, #3d0b12, #c41f36)",
  },
  {
    category: "فروشگاه آنلاین",
    name: "استودیو رخ",
    gradient: "linear-gradient(135deg, #0a0a0b, #3f3f46)",
  },
  {
    category: "لندینگ‌پیج",
    name: "دفتر وکالت پارسا",
    gradient: "linear-gradient(135deg, #a01a2d, #e2374a)",
  },
];

export default function PortfolioPreview() {
  return (
    <section className="pb-20 md:pb-28">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-14">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <DashEyebrow>نمونه‌کارها</DashEyebrow>
            <h2 className="mt-4 font-display text-2xl text-ink-900 md:text-4xl">
              چیزهایی که ساختیم
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 border-b-2 border-ink-950 py-1 text-sm font-bold text-ink-950"
          >
            همه پروژه‌ها ↗
          </Link>
        </div>

        <div className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal
              key={project.name}
              delay={i * 100}
              className="overflow-hidden rounded-[20px] border border-ink-150"
            >
              <div className="h-[220px]" style={{ background: project.gradient }} />
              <div className="bg-white p-5">
                <p className="text-[11px] font-bold text-accent-600">{project.category}</p>
                <p className="mt-2 text-base font-bold text-ink-900">{project.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
