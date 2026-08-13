export type ServiceInterest = "استاندارد" | "اختصاصی";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  serviceInterest: ServiceInterest;
}

export interface ApiSuccessResponse {
  success: true;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

export type FormErrors = Partial<Record<keyof ContactFormData, string>>;

export interface ValidationResult {
  valid: boolean;
  errors: FormErrors;
}

// --- Packages / ordering ---

export type PackageTrack = "استاندارد" | "اختصاصی";

export interface Package {
  slug: string;
  track: PackageTrack;
  name: string;
  tagline: string;
  price: number; // تومان
  priceLabel: string;
  deliveryTime: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  priceLabel: string;
  quantity: number;
}

export interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
  items: CartItem[];
}

export type OrderErrors = Partial<Record<"name" | "email" | "phone" | "items", string>>;

export interface OrderValidationResult {
  valid: boolean;
  errors: OrderErrors;
}

// --- Case studies ---

export interface CaseStudy {
  slug: string;
  industry: string;
  name: string;
  result: string;
  metricValue: string;
  metricLabel: string;
  quote: string;
  author: string;
  problem: string;
  solution: string;
  timeline: string;
}

// --- Blog ---

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  author: string;
  tags: string[];
  content: string[];
  gradient: string;
  featured?: boolean;
}
