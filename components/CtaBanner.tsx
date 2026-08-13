import Reveal from "@/components/Reveal";
import Button from "@/components/Button";

export default function CtaBanner() {
  return (
    <section className="py-20 md:py-28 lg:py-[110px]">
      <Reveal className="mx-auto max-w-[1300px] px-5 text-center sm:px-8 lg:px-14">
        <h2 className="font-display text-3xl leading-tight text-ink-900 md:text-5xl">
          آماده‌ای پروژه‌ات رو شروع کنیم؟
        </h2>
        <p className="mt-4 text-base text-ink-600">
          همین حالا با تیم ردوبز صحبت کن، تا ۲۴ ساعت آینده جواب می‌گیری.
        </p>
        <Button href="/services" className="mt-8 !px-8 !py-4 text-base shadow-glow">
          پروژه‌ات رو شروع کن ↗
        </Button>
      </Reveal>
    </section>
  );
}
