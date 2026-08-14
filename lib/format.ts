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
 * Formats a number with thousands separators and Persian digits (e.g. 8500000 -> "۸٬۵۰۰٬۰۰۰ تومان")
 */
export function formatPrice(
  amount: number | string | null | undefined,
  currency: string = "تومان"
): string {
  if (amount === null || amount === undefined) return "";
  const numericAmount = typeof amount === "string" ? parseFloat(amount.replace(/[^0-9.-]+/g, "")) : amount;
  if (isNaN(numericAmount)) return toPersianDigits(amount);
  
  // Format with standard commas then convert to Persian separators and digits
  const parts = Math.round(numericAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "٬");
  const persianFormatted = toPersianDigits(parts);
  return currency ? `${persianFormatted} ${currency}` : persianFormatted;
}

/**
 * Formats percentage numbers with Persian glyphs (e.g. 98 -> "۹۸٪")
 */
export function formatPercent(value: number | string | null | undefined): string {
  if (value === null || value === undefined) return "";
  return `${toPersianDigits(value)}٪`;
}

/**
 * Alias for toPersianDigits
 */
export const toFa = toPersianDigits;

