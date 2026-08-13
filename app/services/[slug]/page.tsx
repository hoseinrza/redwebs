import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Button from "@/components/Button";
import PackageCard from "@/components/PackageCard";
import AddToCartPanel from "@/components/AddToCartPanel";
import { packages, getPackageBySlug } from "@/lib/data/packages";

export function generateStaticParams() {
  return packages.map((pkg) => ({ slug: pkg.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const pkg = getPackageBySlug(params.slug);
  if (!pkg) return {};
  return {
    title: pkg.name,
    description: pkg.tagline,
  };
}

export default function PackageDetailPage({ params }: { params: { slug: string } }) {
  const pkg = getPackageBySlug(params.slug);
  if (!pkg) notFound();

  const related = packages.filter((p) => p.track === pkg.track && p.slug !== pkg.slug);

  return (
    <>
      <Section className="pb-0 pt-16 md:pt-20">
        <div className="mx-auto max-w-5xl">
          <Link href="/services" className="text-sm font-medium text-accent-600 hover:underline">
            ← بازگشت به خدمات
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              {pkg.popular && (
                <span className="mb-4 inline-flex w-fit items-center rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-white">
                  محبوب‌ترین
                </span>
              )}
              <Eyebrow>مسیر {pkg.track}</Eyebrow>
              <h1 className="mt-4 font-display text-3xl text-ink-950 md:text-4xl">{pkg.name}</h1>
              <p className="mt-3 text-lg leading-relaxed text-ink-600">{pkg.tagline}</p>
              <p className="mt-6 leading-loose text-ink-600">{pkg.description}</p>

              <div className="mt-8 rounded-2xl border border-ink-150 bg-white p-6">
                <p className="text-sm font-bold text-ink-900">این پکیج شامل چیه</p>
                <ul className="mt-4 space-y-3 text-sm">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-ink-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <AddToCartPanel pkg={pkg} />
            </div>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section>
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xl font-bold text-ink-900">پکیج‌های مرتبط در مسیر {pkg.track}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PackageCard key={p.slug} pkg={p} />
              ))}
            </div>
          </div>
        </Section>
      )}

      <Section className="bg-ink-950 text-center">
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          مطمئن نیستید کدوم پکیج مناسبتونه؟
        </h2>
        <p className="mx-auto mt-3 max-w-md text-ink-300">
          بدون فشار براتون توضیح می‌دیم کدوم گزینه با کسب‌وکارتون بیشتر جور درمیاد.
        </p>
        <div className="mt-8">
          <Button href="/services">مشاهده‌ی همه‌ی پکیج‌ها</Button>
        </div>
      </Section>
    </>
  );
}
