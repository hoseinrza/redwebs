import { portalFiles } from "@/lib/data/portal";

export default function FilesScreen() {
  return (
    <div className="flex flex-col gap-[18px] px-5 pb-10 pt-6 sm:px-7">
      <div className="rounded-2xl border-2 border-dashed border-ink-200 bg-white p-8 text-center">
        <p className="text-[13.5px] font-bold text-ink-900">فایل‌ها را اینجا رها کنید</p>
        <p className="mt-2 text-[11.5px] text-ink-400">حداکثر ۵۰ مگابایت · PDF، ZIP، تصویر</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {portalFiles.map((file) => (
          <div key={file.name + file.meta} className="rounded-2xl border border-ink-150 bg-white p-[18px]">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-[10px] text-[9.5px] font-bold"
              style={{ background: file.bg, color: file.fg }}
            >
              {file.kind}
            </span>
            <p className="mt-3.5 text-[13px] font-semibold text-ink-900">{file.name}</p>
            <p className="mt-1.5 text-[11px] text-ink-400">{file.meta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
