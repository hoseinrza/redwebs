import { NextResponse } from "next/server";
import { ApiResponse, OrderFormData, OrderErrors } from "@/lib/types";

function validate(data: Partial<OrderFormData>): OrderErrors {
  const errors: OrderErrors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "نام باید حداقل ۲ کاراکتر باشه.";
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "ایمیل معتبر وارد کنید.";
  }

  if (!data.phone || data.phone.trim().length < 8) {
    errors.phone = "شماره تماس معتبر وارد کنید.";
  }

  if (!data.items || data.items.length === 0) {
    errors.items = "سبد سفارش شما خالیه.";
  }

  return errors;
}

export async function POST(request: Request) {
  let body: Partial<OrderFormData>;

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
    message: "سفارش شما ثبت شد. تیم ما تا ۲۴ ساعت آینده باهاتون تماس می‌گیره.",
  });
}
