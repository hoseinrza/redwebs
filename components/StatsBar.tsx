import Reveal from "@/components/Reveal";
import Stat from "@/components/Stat";

const stats = [
  { value: "۱۲۰+", label: "پروژه تحویل‌شده" },
  { value: "۹۸٪", label: "رضایت مشتری" },
  { value: "۷ سال", label: "تجربه در بازار ایران" },
  { value: "۲۴/۷", label: "پشتیبانی فنی" },
];

export default function StatsBar() {
  return (
    <div className="bg-ink-950 py-20">
      <Reveal className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
          {stats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} center />
          ))}
        </div>
      </Reveal>
    </div>
  );
}
