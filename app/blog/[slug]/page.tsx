import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container";
import { blogPosts, getBlogPostBySlug } from "@/lib/data/blog-posts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <Link href="/blog" className="text-sm font-medium text-accent-600 hover:underline">
            ← بازگشت به وبلاگ
          </Link>

          <p className="mt-6 text-xs font-semibold tracking-wide text-accent-600">{post.category}</p>
          <h1 className="mt-2 font-display text-3xl text-ink-900 md:text-4xl">{post.title}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-ink-500">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
            <span>·</span>
            <span>{post.author}</span>
          </div>

          <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-[22px]" style={{ background: post.gradient }}>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(255 255 255 / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.06) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
          </div>

          <div className="mt-10 space-y-5">
            {post.content.map((paragraph, i) => (
              <p key={i} className="leading-loose text-ink-700">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-ink-50 px-2.5 py-1 text-xs text-ink-600">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
