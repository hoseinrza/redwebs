"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Clock,
  Calendar,
  User,
  ArrowLeft,
  Sparkles,
  Tag,
  BookOpen,
  Filter,
  CheckCircle2,
  Send,
} from "lucide-react";
import { BlogPost } from "@/lib/types";

interface BlogListingClientProps {
  posts: BlogPost[];
}

export default function BlogListingClient({ posts }: BlogListingClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("همه");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map((p) => p.category)));
    return ["همه", ...cats];
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "همه" || post.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query)) ||
        post.author.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  // Featured post
  const featuredPost = useMemo(() => {
    if (searchQuery || activeCategory !== "همه") {
      return null;
    }
    return posts.find((p) => p.featured) || posts[0];
  }, [posts, activeCategory, searchQuery]);

  // Grid posts (excluding featured if displayed above)
  const gridPosts = useMemo(() => {
    if (featuredPost) {
      return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes("@")) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="space-y-12">
      {/* Search & Category Filter Controls */}
      <div className="rounded-2xl border border-ink-150 bg-white p-4 sm:p-6 shadow-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در مقالات، کلمات کلیدی، نویسنده..."
              className="w-full rounded-xl border border-ink-200 bg-ink-50/60 py-2.5 pr-10 pl-4 text-xs sm:text-sm text-ink-950 placeholder:text-ink-400 focus:border-accent-500 focus:bg-white focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-ink-400 hover:text-ink-700"
              >
                پاک کردن
              </button>
            )}
          </div>

          {/* Categories Pill Navigation */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const count =
                cat === "همه"
                  ? posts.length
                  : posts.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-accent-600 text-white shadow-xs"
                      : "bg-ink-50 text-ink-700 hover:bg-ink-100 hover:text-ink-950"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-ink-200/70 text-ink-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Editorial Post (Visible on default view) */}
      {featuredPost && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group relative grid gap-6 overflow-hidden rounded-3xl border border-ink-150 bg-white p-6 sm:p-8 shadow-card transition-all duration-300 hover:border-accent-400/50 hover:shadow-card-hover lg:grid-cols-[1.2fr_1fr] items-center"
          >
            {/* Visual Cover */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-ink-950">
              <div
                className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ background: featuredPost.gradient }}
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(255 255 255 / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.08) 1px, transparent 1px)",
                  backgroundSize: "36px 36px",
                }}
              />
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="rounded-full bg-ink-950/70 px-3 py-1 text-xs font-bold text-white backdrop-blur-md border border-white/10">
                  {featuredPost.category}
                </span>
              </div>
              <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between text-xs text-white/90">
                <span className="inline-flex items-center gap-1 rounded-full bg-accent-500 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-xs">
                  <Sparkles className="h-3 w-3" />
                  <span>مقاله ویژه و منتخب</span>
                </span>
                <span className="rounded-full bg-black/40 px-2.5 py-0.5 text-[11px] backdrop-blur-sm">
                  {featuredPost.readingTime}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="flex flex-col justify-between h-full py-1">
              <div>
                <div className="flex items-center gap-3 text-xs text-ink-500 font-medium mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-accent-500" />
                    <span>{featuredPost.date}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-accent-500" />
                    <span>{featuredPost.author}</span>
                  </span>
                </div>

                <h2 className="font-display text-xl sm:text-2xl font-black text-ink-950 group-hover:text-accent-600 transition-colors leading-snug">
                  {featuredPost.title}
                </h2>

                <p className="mt-3 text-xs sm:text-sm text-ink-600 leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                {/* Takeaways snippet */}
                {featuredPost.takeaways && featuredPost.takeaways.length > 0 && (
                  <div className="mt-4 rounded-xl bg-ink-50/70 p-3.5 border border-ink-100 hidden sm:block">
                    <span className="text-[11px] font-bold text-ink-700 block mb-1.5">
                      نکات کلیدی این مقاله:
                    </span>
                    <ul className="space-y-1 text-xs text-ink-600">
                      {featuredPost.takeaways.slice(0, 2).map((t, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent-500 mt-1.5 shrink-0" />
                          <span className="line-clamp-1">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-ink-100">
                <div className="flex flex-wrap gap-1.5">
                  {featuredPost.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-ink-100/70 px-2 py-0.5 text-[11px] text-ink-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-600 group-hover:text-accent-700">
                  <span>مطالعه کامل مقاله</span>
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Grid of Articles */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base sm:text-lg font-bold text-ink-950 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-accent-600" />
            <span>
              {searchQuery
                ? `نتایج جستجو برای «${searchQuery}» (${filteredPosts.length} مقاله)`
                : activeCategory === "همه"
                ? "جدیدترین یادداشت‌ها و مقالات تخصصی"
                : `مقالات دسته‌بندی ${activeCategory} (${filteredPosts.length})`}
            </span>
          </h3>

          {(searchQuery || activeCategory !== "همه") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("همه");
              }}
              className="text-xs font-bold text-accent-600 hover:text-accent-700 underline"
            >
              نمایش همه مقالات
            </button>
          )}
        </div>

        {gridPosts.length === 0 ? (
          <div className="rounded-2xl border border-ink-200 bg-white p-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink-100 text-ink-400 mb-3">
              <Search className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-ink-900">مقاله‌ای با این مشخصات یافت نشد</h4>
            <p className="mt-1 text-xs text-ink-500">
              لطفاً کلمات کلیدی دیگری را جستجو کنید یا فیلتر دسته‌بندی را تغییر دهید.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("همه");
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-accent-600 px-4 py-2 text-xs font-bold text-white hover:bg-accent-700 transition-colors"
            >
              پاک کردن فیلترها
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {gridPosts.map((post, i) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.35, delay: i * 0.05 },
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-ink-150 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent-300 hover:shadow-card-hover"
                  >
                    <div>
                      {/* Top Visual Graphic */}
                      <div className="relative h-40 w-full overflow-hidden bg-ink-950">
                        <div
                          className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
                          style={{ background: post.gradient }}
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage:
                              "linear-gradient(rgb(255 255 255 / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.06) 1px, transparent 1px)",
                            backgroundSize: "32px 32px",
                          }}
                        />
                        <span className="absolute top-3.5 right-3.5 rounded-full bg-ink-950/60 px-3 py-0.5 text-[11px] font-bold text-white backdrop-blur-md border border-white/10">
                          {post.category}
                        </span>
                        <span className="absolute bottom-3 left-3 rounded-full bg-black/40 px-2 py-0.5 text-[10px] text-white/90 backdrop-blur-sm">
                          {post.readingTime}
                        </span>
                      </div>

                      {/* Content Body */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-[11px] text-ink-400 mb-2.5">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{post.date}</span>
                          </span>
                          <span>·</span>
                          <span>{post.author}</span>
                        </div>

                        <h3 className="font-display text-base font-bold leading-snug text-ink-950 group-hover:text-accent-600 transition-colors">
                          {post.title}
                        </h3>

                        <p className="mt-2 text-xs text-ink-600 leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-5 pb-5 pt-3 border-t border-ink-100 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[11px] text-ink-500">
                        <Tag className="h-3 w-3 text-ink-400" />
                        <span>{post.tags[0]}</span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-bold text-accent-600 group-hover:text-accent-700">
                        <span>مطالعه</span>
                        <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Newsletter & Free Tech Advisory Block */}
      <div className="rounded-3xl border border-ink-200/70 bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950 p-6 sm:p-10 text-white shadow-card">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500/20 px-3 py-1 text-xs font-bold text-accent-400 border border-accent-500/30 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>خبرنامه تخصصی تکنولوژی و استراتژی وب</span>
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-black">
              جدیدترین یادداشت‌ها و استانداردهای طراحی را در ایمیلتان بخوانید
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-ink-300 leading-relaxed">
              هر دو هفته یک‌بار، خلاصه کاربردی‌ترین تجربیات ما در توسعه اختصاصی، افزایش فروش سایت و سئو بدون اسپم ارسال می‌شود.
            </p>
          </div>

          <div>
            {newsletterSubscribed ? (
              <div className="rounded-2xl bg-emerald-500/20 border border-emerald-500/30 p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>ایمیل شما با موفقیت ثبت شد!</span>
                </div>
                <p className="mt-1 text-xs text-emerald-200">
                  اولین نسخه از بولتن تخصصی به زودی برای شما ارسال خواهد شد.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="ایمیل کاری یا شخصی خود را وارد کنید..."
                  className="flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-xs sm:text-sm text-white placeholder:text-ink-400 focus:border-accent-400 focus:bg-white/15 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-accent-600 transition-colors shadow-glow"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>عضویت در خبرنامه</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
