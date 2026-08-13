"use client";

import { useState } from "react";
import { getInitials } from "@/components/panel/initials";

const toggleDefs = [
  { key: "email", title: "اعلان ایمیلی", body: "بروزرسانی پروژه‌ها از طریق ایمیل" },
  { key: "sms", title: "اعلان پیامکی", body: "فقط برای رویدادهای مهم مثل صدور فاکتور" },
  { key: "weekly", title: "گزارش هفتگی", body: "خلاصه پیشرفت پروژه‌ها هر شنبه" },
] as const;

export default function SettingsScreen({
  client,
}: {
  client: { name: string; email: string; phone: string };
}) {
  const [toggles, setToggles] = useState({ email: true, sms: false, weekly: true });

  function toggle(key: keyof typeof toggles) {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="flex max-w-2xl flex-col gap-4 px-5 pb-10 pt-6 sm:px-7">
      <div className="flex flex-col gap-4 rounded-2xl border border-ink-150 bg-white p-6">
        <p className="text-sm font-bold text-ink-900">اطلاعات پروفایل</p>
        <div className="flex items-center gap-3.5">
          <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-accent-600 text-[15px] font-bold text-white">
            {getInitials(client.name)}
          </span>
          <button type="button" className="text-xs font-semibold text-accent-600 hover:underline">
            تغییر تصویر
          </button>
        </div>
        <Field label="نام و نام‌خانوادگی" value={client.name} />
        <Field label="ایمیل" value={client.email} muted />
        <Field label="شماره تماس" value={client.phone} muted />
        <button
          type="button"
          className="w-fit self-start rounded-[10px] bg-accent-600 px-5 py-2.5 text-[12.5px] font-bold text-white transition-colors hover:bg-accent-700"
        >
          ذخیره تغییرات
        </button>
      </div>

      <div className="rounded-2xl border border-ink-150 bg-white p-6">
        <p className="mb-2.5 text-sm font-bold text-ink-900">اعلان‌ها</p>
        {toggleDefs.map((t) => {
          const on = toggles[t.key];
          return (
            <div key={t.key} className="flex items-center justify-between gap-4 border-b border-ink-100 py-3.5 last:border-b-0">
              <div>
                <p className="text-[13px] font-semibold text-ink-900">{t.title}</p>
                <p className="mt-1 text-[11.5px] text-ink-400">{t.body}</p>
              </div>
              <button
                type="button"
                onClick={() => toggle(t.key)}
                aria-pressed={on}
                aria-label={t.title}
                className={`flex h-[25px] w-[42px] flex-none rounded-full p-[3px] transition-colors ${
                  on ? "justify-end bg-accent-600" : "justify-start bg-ink-200"
                }`}
              >
                <span className="h-[19px] w-[19px] rounded-full bg-white" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-4 rounded-2xl border border-accent-100 bg-accent-50 p-[22px]">
        <div>
          <p className="text-[13px] font-bold text-accent-800">بستن حساب کاربری</p>
          <p className="mt-1.5 text-[11.5px] text-ink-500">دسترسی به پروژه‌ها و فایل‌ها از بین می‌رود.</p>
        </div>
        <button
          type="button"
          className="flex-none rounded-[10px] border border-accent-600 px-[18px] py-2.5 text-xs font-bold text-accent-600 transition-colors hover:bg-accent-100"
        >
          بستن حساب
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) {
  return (
    <div>
      <p className="text-[11.5px] text-ink-500">{label}</p>
      <div
        className={`mt-1.5 flex h-[42px] items-center rounded-[10px] border border-ink-200 px-3.5 text-[13px] ${
          muted ? "text-ink-500" : "text-ink-900"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
