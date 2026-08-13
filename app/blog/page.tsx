import type { Metadata } from "next";
import Container from "@/components/Container";
import DashEyebrow from "@/components/DashEyebrow";
import BlogListingClient from "@/components/BlogListingClient";
import { blogPosts } from "@/lib/data/blog-posts";

export const metadata: Metadata = {
  title: "وبلاگ و یادداشت‌های تخصصی وب",
  description:
    "مجموعه مقالات تخصصی استودیو ردوبز پیرامون طراحی UI/UX، سئو، توسعه وب با وردپرس و Next.js و استراتژی‌های فروش آنلاین.",
};

export default function BlogPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl mb-10">
          <DashEyebrow>دانش‌نامه و دیدگاه‌ها</DashEyebrow>
          <h1 className="mt-3 font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-ink-950 leading-tight">
            یادداشت‌ها و راهنماهای تخصصی وب
          </h1>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink-600">
            تحلیل‌های عملی، تجربیات دست‌اول تیم فنی و راهنمای تصمیم‌گیری برای رشد کسب‌وکارهای مدرن در دنیای وب.
          </p>
        </div>

        {/* Client-side search, categories, and posts grid */}
        <BlogListingClient posts={blogPosts} />
      </Container>
    </div>
  );
}
