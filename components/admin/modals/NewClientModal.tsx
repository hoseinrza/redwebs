"use client";

import { useState } from "react";
import { X, UserPlus, Building, Mail, Phone, ShieldCheck, AlertCircle } from "lucide-react";
import { ClientAccount } from "@/lib/data/admin";

interface NewClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClient: (client: ClientAccount) => void;
}

export default function NewClientModal({ isOpen, onClose, onAddClient }: NewClientModalProps) {
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [tier, setTier] = useState<ClientAccount["tier"]>("VIP Enterprise");
  const [initialProject, setInitialProject] = useState("طراحی و توسعه وب‌سایت اختصاصی");
  const [contractValue, setContractValue] = useState("45000000");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!companyName.trim() || !contactPerson.trim() || !phone.trim()) {
      setError("نام شرکت، نام نماینده و شماره تماس الزامی است.");
      return;
    }

    const newClient: ClientAccount = {
      id: `cli-${Date.now().toString().slice(-4)}`,
      companyName: companyName.trim(),
      contactPerson: contactPerson.trim(),
      phone: phone.trim(),
      email: email.trim() || `${contactPerson.trim().toLowerCase().replace(/\s+/g, ".")}@client.ir`,
      tier,
      activeProjects: 1,
      totalPaidToman: Number(contractValue) || 0,
      balanceDueToman: 0,
      contractStatus: "فعال و معتبر",
      joinedDate: "امروز (۱۴۰۴)",
      healthScore: 100,
      avatarBg: "#c41f36",
    };

    onAddClient(newClient);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/70 backdrop-blur-xs font-sans animate-fade-in" dir="rtl">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-ink-200 shadow-2xl overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-150 px-6 py-4 bg-ink-50/70">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-600 text-white shadow-xs">
              <UserPlus className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-ink-950 text-sm sm:text-base">ثبت کارفرما و مشتری جدید</h3>
              <p className="text-[11px] text-ink-500">ایجاد حساب کاربری و فعال‌سازی دسترسی پنل</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-ink-500 hover:bg-ink-200/70 hover:text-ink-900 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-ink-800 mb-1.5">نام شرکت / برند تجاری *</label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                setError("");
              }}
              placeholder="مثال: شرکت بازرگانی نوین توسعه"
              className="w-full h-11 px-3.5 rounded-xl border border-ink-200 text-xs sm:text-sm focus:border-accent-600 focus:ring-2 focus:ring-accent-100 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-ink-800 mb-1.5">نام نماینده / مدیر پروژه *</label>
              <input
                type="text"
                required
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="مثال: دکتر مهرداد کیانی"
                className="w-full h-11 px-3.5 rounded-xl border border-ink-200 text-xs sm:text-sm focus:border-accent-600 focus:ring-2 focus:ring-accent-100 outline-none"
              >
              </input>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-800 mb-1.5">سطح دسترسی (Tier)</label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value as ClientAccount["tier"])}
                className="w-full h-11 px-3 rounded-xl border border-ink-200 text-xs sm:text-sm bg-white focus:border-accent-600 focus:ring-2 focus:ring-accent-100 outline-none"
              >
                <option value="VIP Enterprise">مشتری سازمانی VIP</option>
                <option value="Standard Pro">حساب حرفه‌ای Standard Pro</option>
                <option value="Startup Tier">حساب استارتاپی Startup</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-ink-800 mb-1.5">شماره تماس مستقیم *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹"
                className="w-full h-11 px-3.5 rounded-xl border border-ink-200 text-xs sm:text-sm font-mono dir-ltr text-left focus:border-accent-600 focus:ring-2 focus:ring-accent-100 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-800 mb-1.5">ایمیل رسمی</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@company.com"
                className="w-full h-11 px-3.5 rounded-xl border border-ink-200 text-xs sm:text-sm font-mono dir-ltr text-left focus:border-accent-600 focus:ring-2 focus:ring-accent-100 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-800 mb-1.5">عنوان اولین پروژه سفارش داده‌شده</label>
            <input
              type="text"
              value={initialProject}
              onChange={(e) => setInitialProject(e.target.value)}
              placeholder="مثال: طراحی وب‌سایت سازمانی و سامانه اتوماسیون"
              className="w-full h-11 px-3.5 rounded-xl border border-ink-200 text-xs sm:text-sm focus:border-accent-600 focus:ring-2 focus:ring-accent-100 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-800 mb-1.5">مبلغ کل قرارداد اولیه (تومان)</label>
            <input
              type="text"
              value={contractValue}
              onChange={(e) => setContractValue(e.target.value)}
              placeholder="۴۵۰۰۰۰۰۰"
              className="w-full h-11 px-3.5 rounded-xl border border-ink-200 text-xs sm:text-sm font-mono focus:border-accent-600 focus:ring-2 focus:ring-accent-100 outline-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-ink-150">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-ink-200 text-ink-700 text-xs font-bold hover:bg-ink-100 transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-accent-600 text-white text-xs font-bold hover:bg-accent-700 shadow-glow transition-all active:scale-95"
            >
              <UserPlus className="h-4 w-4" />
              <span>ایجاد حساب و فعال‌سازی پنل</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
