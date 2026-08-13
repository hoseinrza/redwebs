import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

const stats = [
  { value: "۱۲۰+", label: "پروژه موفق تحویل‌شده", desc: "از لندینگ تا سامانه‌های وب" },
  { value: "۹۸٪", label: "رضایت کارفرمایان", desc: "بر اساس نظرسنجی نهایی" },
  { value: "۷ سال", label: "تجربه تخصصی", desc: "در توسعه وب و طراحی UI" },
  { value: "۱۰۰٪", label: "تضمین سئو فنی و سرعت", desc: "پاس شدن Core Web Vitals" },
];

export default function StatsBar() {
  return (
    <div className="border-y border-white/10 bg-ink-950 py-16 text-white">
      <Container>
        <Reveal>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="relative flex flex-col items-center text-center sm:items-start sm:text-right"
              >
                <span className="font-display text-3xl font-black text-accent-400 sm:text-4xl">
                  {stat.value}
                </span>
                <p className="mt-2 text-sm font-bold text-white sm:text-base">{stat.label}</p>
                <p className="mt-1 text-xs text-ink-400">{stat.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </div>
  );
}

