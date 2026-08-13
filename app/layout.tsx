import type { Metadata } from "next";
import { Vazirmatn, Lalezar } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";

const vazir = Vazirmatn({ subsets: ["arabic"], variable: "--font-vazir" });
const lalezar = Lalezar({
  subsets: ["arabic"],
  weight: "400",
  variable: "--font-lalezar",
});

const siteUrl = "https://redwebs.ir";
const title = "ردوبز | طراحی سایت‌هایی که مشتری می‌آورن";
const description =
  "طراحی و توسعه سایت‌های حرفه‌ای برای کسب‌وکارهای خدماتی و تخصصی — قیمت شفاف، زمان‌بندی واقع‌بینانه و تیمی که همیشه در دسترسه.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | ردوبز",
  },
  description,
  keywords: [
    "طراحی سایت",
    "طراحی وب‌سایت شرکتی",
    "توسعه وب",
    "وردپرس",
    "ووکامرس",
    "ردوبز",
  ],
  authors: [{ name: "ردوبز" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: siteUrl,
    siteName: "ردوبز",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ردوبز",
  url: siteUrl,
  email: "hello@redwebs.ir",
  description,
  areaServed: "IR",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={`${vazir.variable} ${lalezar.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
