"use client";

import { useState } from "react";
import {
  Users,
  UserPlus,
  Shield,
  Code2,
  GitPullRequest,
  GitBranch,
  Mail,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { devTeamMembers } from "@/lib/data/admin";
import { toFa } from "@/lib/format";

export default function AdminTeamScreen() {
  const [members, setMembers] = useState(devTeamMembers);
  const [inviteSuccess, setInviteSuccess] = useState("");

  function handleInviteMember() {
    const newDev = {
      id: `dev-${Date.now()}`,
      name: "امیرحسین رضایی",
      role: "توسعه‌دهنده فول‌استک و React Native",
      specialty: "Next.js, Tailwind, React Native, Mobile Apps",
      avatar: "ا.ر",
      avatarBg: "#059669",
      status: "online" as const,
      currentTask: "آنبوردینگ و ستاپ کانتینرهای محیط دولوپمنت",
      activePRs: 0,
      email: "amir.r@redwebs.ir",
      github: "@amir-rn-dev",
      accessLevel: "Senior Engineer" as const,
    };
    setMembers([...members, newDev]);
    setInviteSuccess("عضو جدید با سطح دسترسی Senior Engineer به تیم مهندسی اضافه گردید.");
    setTimeout(() => setInviteSuccess(""), 4000);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-fade-in font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink-200 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-accent-600" />
            <h1 className="text-xl sm:text-2xl font-black text-ink-950">تیم مهندسی، توسعه و سطوح دسترسی</h1>
          </div>
          <p className="text-xs sm:text-sm text-ink-500">
            مدیریت تخصص‌های توسعه‌دهندگان، تسک‌های جاری، درخواست‌های PR و سطوح دسترسی مخازن گیت
          </p>
        </div>

        <button
          type="button"
          onClick={handleInviteMember}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-accent-600 text-white text-xs sm:text-sm font-bold hover:bg-accent-700 shadow-glow transition-all active:scale-95 shrink-0"
        >
          <UserPlus className="h-4 w-4" />
          <span>افزودن همکار فنی جدید</span>
        </button>
      </div>

      {inviteSuccess && (
        <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-800 animate-fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{inviteSuccess}</span>
        </div>
      )}

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div
            key={member.id}
            className="rounded-3xl border border-ink-200 bg-white p-6 shadow-xs space-y-5 hover:border-ink-300 hover:shadow-card transition-all"
          >
            {/* Member Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-xs"
                    style={{ backgroundColor: member.avatarBg }}
                  >
                    {member.avatar}
                  </div>
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${
                      member.status === "online"
                        ? "bg-emerald-500"
                        : member.status === "busy"
                        ? "bg-amber-500"
                        : "bg-ink-400"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-ink-950 text-sm sm:text-base">{member.name}</h3>
                  <p className="text-xs text-accent-700 font-bold">{member.role}</p>
                </div>
              </div>

              <span className="rounded-md bg-ink-100 px-2 py-0.5 text-[10.5px] font-bold text-ink-700">
                {member.accessLevel.split("(")[0]}
              </span>
            </div>

            {/* Specialties & Tech Stack */}
            <div className="space-y-1 text-xs">
              <span className="text-ink-400 block text-[11px]">مهارت‌ها و فناوری‌ها:</span>
              <p className="text-ink-700 font-mono text-[11.5px] leading-relaxed bg-ink-50 p-2.5 rounded-xl border border-ink-100">
                {member.specialty}
              </p>
            </div>

            {/* Current Active Task */}
            <div className="space-y-1 text-xs">
              <span className="text-ink-400 block text-[11px]">وظیفه فعال در اسپرینت:</span>
              <p className="text-ink-900 font-bold text-[11.5px] leading-snug">
                {member.currentTask}
              </p>
            </div>

            {/* Bottom Meta & Contacts */}
            <div className="flex items-center justify-between pt-3 border-t border-ink-100 text-[11px] text-ink-500">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 font-mono">
                  <GitPullRequest className="h-3.5 w-3.5 text-accent-600" />
                  <span>{toFa(member.activePRs)} PR</span>
                </span>
                <span>·</span>
                <span className="font-mono text-ink-600">{member.github}</span>
              </div>

              <a
                href={`mailto:${member.email}`}
                className="text-accent-600 hover:underline font-mono text-[10.5px]"
              >
                ارسال پیام
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
