import Link from "next/link";
import DashEyebrow from "@/components/DashEyebrow";
import { getBlogPostBySlug } from "@/lib/data/blog-posts";

const featured = getBlogPostBySlug("chera-baze-saitha-bishtar-dide-mishavand")!;
const secondary = [
  getBlogPostBySlug("site-ziba-khoob-nist")!,
  getBlogPostBySlug("ssr-csr-ssg-kodam")!,
];
const editorial = getBlogPostBySlug("panj-chiz-ghabl-az-tarahi-sait")!;

export default function InsightsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-14">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-lg">
            <DashEyebrow>بلاگ و دیدگاه‌ها</DashEyebrow>
            <h2 className="mt-[18px] font-display text-3xl leading-snug text-ink-900 md:text-5xl">
              چیزهایی که ارزش خوندن دارن.
            </h2>
            <p className="mt-[18px] max-w-[430px] text-base leading-loose text-ink-600">
              از طراحی و تکنولوژی تا تجربه‌های واقعی ما در ساختن وب.
            </p>
          </div>
          <Link
            href="/blog"
            className="group inline-flex flex-none items-center gap-2 border-b-2 border-ink-950 py-3 text-sm font-bold text-ink-950"
          >
            مشاهده همه مطالب
            <span className="inline-block transition-transform duration-300 [transition-timing-function:cubic-bezier(.2,.8,.2,1)] group-hover:-translate-x-[3px] group-hover:-translate-y-[3px]">
              ↗
            </span>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 items-start gap-7 lg:grid-cols-2">
          {/* Featured article */}
          <Link href={`/blog/${featured.slug}`} className="group flex flex-col">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[22px] bg-ink-950">
              <div
                className="absolute inset-0 transition-transform duration-700 [transition-timing-function:cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.06]"
                style={{ background: featured.gradient }}
              />
              <div
                className="absolute inset-0 opacity-100"
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
                مقاله ویژه
              </span>
            </div>

            <h3 className="mt-[26px] text-[22px] font-extrabold leading-[1.4] text-ink-900 transition-colors duration-300 group-hover:text-accent-600 sm:text-[31px]">
              {featured.title}
            </h3>
            <p className="mt-3.5 max-w-[440px] text-sm leading-loose text-ink-600">{featured.excerpt}</p>

            <div className="mt-5 text-xs text-ink-400">
              {featured.readingTime} · {featured.date}
            </div>
            <div className="mt-5 inline-flex w-fit items-center gap-2 text-[13.5px] font-bold text-accent-600">
              خواندن مقاله
              <span className="inline-block transition-transform duration-300 [transition-timing-function:cubic-bezier(.2,.8,.2,1)] group-hover:-translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </div>
          </Link>

          {/* Secondary column */}
          <div className="flex flex-col gap-6">
            {secondary.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-start gap-[18px] rounded-[20px] border border-ink-150 bg-white p-5 shadow-[0_1px_2px_rgb(10_10_11_/_0.04)] transition-[transform,box-shadow] duration-300 [transition-timing-function:cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgb(10_10_11_/_0.22)]"
              >
                <div className="relative aspect-square w-28 flex-none overflow-hidden rounded-[14px]">
                  <div
                    className="absolute inset-0 transition-transform duration-500 [transition-timing-function:cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.09]"
                    style={{ background: post.gradient }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold text-accent-600">{post.category}</p>
                  <h4 className="mt-2.5 text-[17px] font-bold leading-[1.55] text-ink-900 transition-colors duration-300 group-hover:text-accent-600">
                    {post.title}
                  </h4>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-[11.5px] text-ink-400">
                      {post.readingTime} · {post.date}
                    </span>
                    <span className="text-[15px] text-accent-600 opacity-[0.35] transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(.2,.8,.2,1)] group-hover:-translate-x-[3px] group-hover:-translate-y-[3px] group-hover:opacity-100">
                      ↗
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            <Link
              href={`/blog/${editorial.slug}`}
              className="group relative overflow-hidden rounded-[20px] bg-ink-950 p-[26px] text-white transition-transform duration-300 [transition-timing-function:cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1"
            >
              <div className="pointer-events-none absolute -left-10 -top-[70px] h-[200px] w-[200px] rounded-full bg-accent-500/[0.16] blur-[60px] transition-colors duration-500 group-hover:bg-accent-500/[0.32]" />
              <span className="relative text-[11px] font-bold text-accent-400">یادداشت تیم</span>
              <h4 className="relative mt-3 text-[19px] font-bold leading-[1.6] text-white">{editorial.title}</h4>
              <p className="relative mt-3 text-[13px] leading-loose text-ink-400">{editorial.excerpt}</p>
              <div className="relative mt-[18px] flex items-center justify-between gap-3">
                <span className="text-[11.5px] text-ink-500">
                  {editorial.readingTime} · {editorial.date}
                </span>
                <span className="inline-block text-[15px] text-white transition-transform duration-300 [transition-timing-function:cubic-bezier(.2,.8,.2,1)] group-hover:-translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
