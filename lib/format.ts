/**
 * Utility functions for Persian number formatting and localization
 */

/**
 * Converts English/Latin digits (0-9) to Persian digits (۰-۹)
 */
export function toPersianDigits(input: string | number | null | undefined): string {
  if (input === null || input === undefined) return "";
  const str = String(input);
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[0-9]/g, (w) => persianDigits[+w]);
}

/**
 * Formats a number with thousands separators and Persian digits (e.g. 8500000 -> "۸٬۵۰۰٬۰۰۰")
 */
export function formatPrice(
  amount: number | string | null | undefined,
  currency: string = "تومان"
): string {
  if (amount === null || amount === undefined) return "";
  const numericAmount = typeof amount === "string" ? parseFloat(amount.replace(/[^0-9.-]+/g, "")) : amount;
  if (isNaN(numericAmount)) return String(amount);
  
  const formattedWithCommas = Math.round(numericAmount).toLocaleString("fa-IR");
  return currency ? `${formattedWithCommas} ${currency}` : formattedWithCommas;
}

/**
 * Alias for toPersianDigits
 */
export const toFa = toPersianDigits;
