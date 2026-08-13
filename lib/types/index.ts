export type ServiceInterest =
  | "وردپرس"
  | "کدنویسی اختصاصی"
  | "مشاوره و بررسی هر دو"
  | "استاندارد"
  | "اختصاصی"
  | "سفارش پروژه خاص و وب‌اپلیکیشن"
  | "طراحی پلتفرم / پرتال سازمانی"
  | "بازطراحی و ارتقای سرعت"
  | "ایده استارتاپی و SaaS";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  serviceInterest: ServiceInterest;
  projectType?: string;
  budgetRange?: string;
  timeline?: string;
  referenceUrl?: string;
  customFeatures?: string[];
  message: string;
  isCustomOrder?: boolean;
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
export type TechType = "wordpress" | "custom_code";

export interface Package {
  slug: string;
  track: PackageTrack;
  techType: TechType;
  techLabel: string;
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

export interface MetricComparison {
  label: string;
  before: string;
  after: string;
  diff: string;
  isGood?: boolean;
}

export interface CaseStudy {
  slug: string;
  industry: string;
  category?: string;
  name: string;
  tagline?: string;
  result: string;
  metricValue: string;
  metricLabel: string;
  quote: string;
  author: string;
  authorRole?: string;
  problem: string;
  solution: string;
  timeline: string;
  year?: string;
  gradient?: string;
  featured?: boolean;
  techStack?: string[];
  servicesProvided?: string[];
  deliverables?: string[];
  beforeAfterMetrics?: MetricComparison[];
  keyFeatures?: string[];
  architectureHighlights?: string[];
}

// --- Blog ---

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  callout?: string;
  checklist?: string[];
}

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  author: string;
  authorRole?: string;
  tags: string[];
  content: string[];
  sections?: BlogSection[];
  takeaways?: string[];
  gradient: string;
  featured?: boolean;
}
