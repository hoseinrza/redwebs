import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import DashEyebrow from "@/components/DashEyebrow";
import { blogPosts } from "@/lib/data/blog-posts";

export const metadata: Metadata = {
  title: "وبلاگ",
  description: "یادداشت‌های ردوبز درباره‌ی طراحی سایت، تکنولوژی و تصمیم‌گیری برای کسب‌وکارها.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="py-16 md:py-20">
      <Container>
        <div className="max-w-2xl">
          <DashEyebrow>بلاگ و دیدگاه‌ها</DashEyebrow>
          <h1 className="mt-4 font-display text-3xl text-ink-900 md:text-5xl">یادداشت‌های ردوبز</h1>
          <p className="mt-4 max-w-lg text-base leading-loose text-ink-600">
            از طراحی و تکنولوژی تا تجربه‌های واقعی ما در ساختن وب.
          </p>
        </div>

        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group mt-14 grid gap-7 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-ink-950">
              <div
                className="absolute inset-0 transition-transform duration-700 [transition-timing-function:cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.06]"
                style={{ background: featured.gradient }}
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(255 255 255 / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.06) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              />
              <span className="absolute right-5 top-5 rounded-full bg-ink-950/55 px-3.5 py-1.5 text-[11px] font-bold text-white backdrop-blur-sm">
                {featured.category}
              </span>
              <span className="absolute bottom-5 left-5 rounded-full bg-white px-3.5 py-1.5 text-[10.5px] font-bold text-ink-950">
                جدیدترین
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold leading-[1.4] text-ink-900 transition-colors duration-300 group-hover:text-accent-600 sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3.5 max-w-lg text-sm leading-loose text-ink-600">{featured.excerpt}</p>
              <div className="mt-5 text-xs text-ink-400">
                {featured.readingTime} · {featured.date}
              </div>
              <div className="mt-5 inline-flex w-fit items-center gap-2 text-[13.5px] font-bold text-accent-600">
                خواندن مقاله
                <span className="inline-block transition-transform duration-300 [transition-timing-function:cubic-bezier(.2,.8,.2,1)] group-hover:-translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </div>
            </div>
          </Link>
        )}

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-[20px] border border-ink-150 bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
            >
              <div className="relative h-36 w-full flex-none overflow-hidden sm:h-40">
                <div
                  className="absolute inset-0 transition-transform duration-700 [transition-timing-function:cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.06]"
                  style={{ background: post.gradient }}
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[11px] font-bold tracking-wide text-accent-600">{post.category}</p>
                <h3 className="mt-2.5 flex-1 text-base font-bold leading-snug text-ink-900 transition-colors duration-300 group-hover:text-accent-600">
                  {post.title}
                </h3>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-xs text-ink-400">
                    {post.readingTime} · {post.date}
                  </p>
                  <span className="text-accent-600 opacity-[0.35] transition-[transform,opacity] duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100">
                    ↗
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
