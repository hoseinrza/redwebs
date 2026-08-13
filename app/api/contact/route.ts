import { NextResponse } from "next/server";
import { ApiResponse, ContactFormData, FormErrors } from "@/lib/types";

function validate(data: Partial<ContactFormData>): FormErrors {
  const errors: FormErrors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "نام باید حداقل ۲ کاراکتر باشه.";
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "ایمیل معتبر وارد کنید.";
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = "پیام باید حداقل ۱۰ کاراکتر باشه.";
  }

  if (data.serviceInterest !== "استاندارد" && data.serviceInterest !== "اختصاصی") {
    errors.serviceInterest = "نوع خدمات رو انتخاب کنید.";
  }

  return errors;
}

export async function POST(request: Request) {
  let body: Partial<ContactFormData>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "درخواست نامعتبر است." },
      { status: 400 }
    );
  }

  const errors = validate(body);
  if (Object.keys(errors).length > 0) {
    const firstError = Object.values(errors)[0];
    return NextResponse.json<ApiResponse>(
      { success: false, error: firstError ?? "اطلاعات ارسالی نامعتبره." },
      { status: 400 }
    );
  }

  return NextResponse.json<ApiResponse>({
    success: true,
    message: "پیام شما ارسال شد. تیم ما تا ۲۴ ساعت آینده باهاتون تماس می‌گیره.",
  });
}
