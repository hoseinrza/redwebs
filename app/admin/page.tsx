import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "پنل تیم فنی و ادمین ارشد",
  description: "میز عملیات مهندسی، مدیریت اسپرینت‌ها، سرورهای ابری، کلاسترها و امور مالی ردوبز",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminShell />;
}
