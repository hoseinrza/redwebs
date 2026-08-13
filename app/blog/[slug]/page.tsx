import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import BlogPostClient from "@/components/BlogPostClient";
import { blogPosts, getBlogPostBySlug } from "@/lib/data/blog-posts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | وبلاگ ردوبز`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug);

  return (
    <>
      {/* Breadcrumb Header Bar */}
      <div className="bg-ink-50/60 border-b border-ink-150/70 py-4">
        <Container>
          <nav className="flex items-center justify-between gap-2 text-xs font-medium text-ink-500">
            <div className="flex items-center gap-2 truncate">
              <Link href="/" className="hover:text-ink-950 transition-colors">
                صفحه اصلی
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-ink-950 transition-colors">
                وبلاگ
              </Link>
              <span>/</span>
              <span className="text-ink-950 font-bold truncate max-w-[200px] sm:max-w-md">
                {post.title}
              </span>
            </div>

            <Link
              href="/blog"
              className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-accent-600 hover:text-accent-700 underline underline-offset-4"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              <span>همه مقالات</span>
            </Link>
          </nav>
        </Container>
      </div>

      {/* Main Container */}
      <Container className="py-10 sm:py-14">
        <BlogPostClient post={post} relatedPosts={relatedPosts} />
      </Container>
    </>
  );
}
