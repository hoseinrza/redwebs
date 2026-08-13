import Container from "@/components/Container";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-semibold text-accent-600">۴۰۴</p>
      <h1 className="mt-3 text-3xl font-bold text-ink-900 md:text-4xl">
        این صفحه پیدا نشد
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-ink-600">
        صفحه‌ای که دنبالش بودید یا حذف شده یا هیچ‌وقت وجود نداشته. برگردید به
        صفحه‌ی اصلی و از اونجا ادامه بدید.
      </p>
      <Button href="/" className="mt-8">
        بازگشت به صفحه‌ی اصلی
      </Button>
    </Container>
  );
}
