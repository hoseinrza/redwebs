import type { Metadata } from "next";
import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "تماس با ما",
  description:
    "درباره‌ی پروژه‌ت بهمون بگو. صادقانه می‌گیم که آیا گزینه‌ی مناسبی براتون هستیم یا نه.",
};

const contactPoints = [
  {
    title: "ایمیل",
    value: "hello@redwebs.ir",
    href: "mailto:hello@redwebs.ir",
  },
  {
    title: "زمان پاسخ‌گویی",
    value: "معمولاً تا ۲۴ ساعت آینده",
  },
  {
    title: "محل کار تیم",
    value: "تهران، ایران — با کسب‌وکارهای سراسر کشور کار می‌کنیم",
  },
];

export default function ContactPage() {
  return (
    <Section className="pt-16 md:pt-20">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>تماس با ما</Eyebrow>
        <h1 className="mt-4 text-3xl font-bold text-ink-900 md:text-4xl">
          به فکر سایتی هستید که واقعاً جواب بده؟
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-loose text-ink-600">
          درباره‌ی کسب‌وکارتون بهمون بگید. صادقانه می‌گیم که آیا گزینه‌ی
          مناسبی براتون هستیم یا نه — بدون فشار، بدون حرف فنی پیچیده.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-8 lg:grid-cols-[1.3fr_1fr]">
        <ContactForm />

        <div className="flex flex-col gap-4">
          {contactPoints.map((point) => (
            <div key={point.title} className="rounded-2xl border border-ink-150 bg-white p-6 shadow-card">
              <p className="text-xs font-semibold tracking-wide text-accent-600">{point.title}</p>
              {point.href ? (
                <a
                  href={point.href}
                  dir="ltr"
                  className="mt-2 block text-end text-sm font-medium text-ink-900 hover:text-accent-600"
                >
                  {point.value}
                </a>
              ) : (
                <p className="mt-2 text-sm font-medium text-ink-900">{point.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
