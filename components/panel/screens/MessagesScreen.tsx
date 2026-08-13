"use client";

import { KeyboardEvent, useState } from "react";
import { portalMessages, portalThreads } from "@/lib/data/portal";

export default function MessagesScreen() {
  const [threadId, setThreadId] = useState(portalThreads[0].id);
  const [draft, setDraft] = useState("");
  const [sentByThread, setSentByThread] = useState<Record<string, string[]>>({});
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  const thread = portalThreads.find((t) => t.id === threadId) ?? portalThreads[0];
  const messages = [
    ...(portalMessages[threadId] ?? []),
    ...(sentByThread[threadId] ?? []).map((text) => ({ text, me: true })),
  ];

  function selectThread(id: string) {
    setThreadId(id);
    setMobileView("chat");
  }

  function send() {
    const text = draft.trim();
    if (!text) return;
    setSentByThread((prev) => ({ ...prev, [threadId]: [...(prev[threadId] ?? []), text] }));
    setDraft("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") send();
  }

  return (
    <div className="flex min-h-0 flex-1 sm:flex-row">
      <div
        className={`flex-none flex-col overflow-y-auto border-l border-ink-150 bg-white sm:flex sm:w-[300px] ${
          mobileView === "chat" ? "hidden" : "flex w-full"
        }`}
      >
        {portalThreads.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => selectThread(t.id)}
            className={`flex items-start gap-3 border-b border-ink-100 px-[18px] py-4 text-right transition-colors last:border-b-0 ${
              t.id === threadId ? "bg-accent-50" : "bg-white hover:bg-ink-50"
            }`}
          >
            <span
              className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full text-[11px] font-bold text-white"
              style={{ background: t.avatarBg }}
            >
              {t.initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className={`block truncate text-[12.5px] ${t.unread ? "font-bold" : "font-semibold"} text-ink-900`}>
                {t.name}
              </span>
              <span className="mt-1 block truncate text-[11px] text-ink-400">{t.preview}</span>
            </span>
            <span className="flex-none text-[10px] text-ink-400">{t.time}</span>
          </button>
        ))}
      </div>

      <div
        className={`min-w-0 flex-1 flex-col bg-ink-50 sm:flex ${mobileView === "list" ? "hidden" : "flex"}`}
      >
        <div className="flex items-center gap-3 border-b border-ink-150 bg-white px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => setMobileView("list")}
            aria-label="بازگشت به لیست گفتگوها"
            className="-ml-1 flex h-8 w-8 flex-none items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100 sm:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <span className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full bg-accent-600 text-[11px] font-bold text-white">
            {thread.initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-bold text-ink-900">{thread.name}</p>
            <p className="mt-0.5 text-[10.5px] font-medium text-emerald-600">آنلاین</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3.5 overflow-auto p-4 sm:p-6">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-[13px] leading-loose sm:max-w-[62%] ${
                m.me ? "self-end bg-accent-600 text-white" : "self-start border border-ink-150 bg-white text-ink-900"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2.5 border-t border-ink-150 bg-white px-4 py-4 sm:px-6">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="پیام خود را بنویسید…"
            className="h-11 flex-1 rounded-[11px] border border-ink-200 bg-ink-50 px-3.5 text-[13px] text-ink-900 outline-none transition-colors focus:border-accent-500"
          />
          <button
            type="button"
            onClick={send}
            aria-label="ارسال پیام"
            className="flex h-11 w-11 flex-none items-center justify-center rounded-[11px] bg-accent-600 text-white transition-colors hover:bg-accent-700"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 4L3 11l6 2 2 6z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
