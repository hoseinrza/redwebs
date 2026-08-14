import { ApiResponse, ContactFormData, FormErrors, OrderErrors, OrderFormData } from "@/lib/types";

const VALID_SERVICE_INTERESTS = [
  "وردپرس",
  "کدنویسی اختصاصی",
  "مشاوره و بررسی هر دو",
  "استاندارد",
  "اختصاصی",
  "سفارش پروژه خاص و وب‌اپلیکیشن",
  "طراحی پلتفرم / پرتال سازمانی",
  "بازطراحی و ارتقای سرعت",
  "ایده استارتاپی و SaaS",
];

function validateContact(data: Partial<ContactFormData>): FormErrors {
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

  if (!data.serviceInterest || !VALID_SERVICE_INTERESTS.includes(data.serviceInterest)) {
    errors.serviceInterest = "نوع خدمات رو انتخاب کنید.";
  }

  return errors;
}

export function submitContactForm(data: Partial<ContactFormData>): ApiResponse {
  const errors = validateContact(data);
  if (Object.keys(errors).length > 0) {
    const firstError = Object.values(errors)[0];
    return { success: false, error: firstError ?? "اطلاعات ارسالی نامعتبره." };
  }

  return {
    success: true,
    message: "پیام شما ارسال شد. تیم ما تا ۲۴ ساعت آینده باهاتون تماس می‌گیره.",
  };
}

function validateOrder(data: Partial<OrderFormData>): OrderErrors {
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

export function submitOrderForm(data: Partial<OrderFormData>): ApiResponse {
  const errors = validateOrder(data);
  if (Object.keys(errors).length > 0) {
    const firstError = Object.values(errors)[0];
    return { success: false, error: firstError ?? "اطلاعات ارسالی نامعتبره." };
  }

  return {
    success: true,
    message: "سفارش شما ثبت شد. تیم ما تا ۲۴ ساعت آینده باهاتون تماس می‌گیره.",
  };
}
