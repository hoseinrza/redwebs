import DashEyebrow from "@/components/DashEyebrow";
import Reveal from "@/components/Reveal";

const items = [
  {
    n: "01",
    title: "طراحی رابط کاربری",
    description: "هویت بصری و تجربه‌ای که برند شما رو متمایز می‌کنه",
  },
  {
    n: "02",
    title: "توسعه وب",
    description: "پیاده‌سازی سریع، تمیز و قابل نگهداری",
  },
  {
    n: "03",
    title: "فروشگاه اینترنتی",
    description: "از درگاه پرداخت تا مدیریت موجودی",
  },
  {
    n: "04",
    title: "سیستم اختصاصی",
    description: "پنل، اتوماسیون و یکپارچه‌سازی با API",
  },
];

export default function ServicesGrid() {
  return (
    <section className="pb-20 md:pb-28">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-14">
        <DashEyebrow>خدمات</DashEyebrow>
        <h2 className="mt-4 max-w-lg font-display text-2xl text-ink-900 md:text-4xl">
          هر چی برای حضور دیجیتالت لازم داری
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border border-ink-150 bg-ink-150 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.n} delay={i * 80} className="bg-white p-7">
              <p className="text-[11px] font-bold text-ink-400">{item.n}</p>
              <p className="mt-3.5 text-[15px] font-bold text-ink-900">{item.title}</p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink-500">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
