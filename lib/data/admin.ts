export interface DevTeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatar: string;
  avatarBg: string;
  status: "online" | "busy" | "offline";
  currentTask: string;
  activePRs: number;
  email: string;
  github: string;
  accessLevel: "Super Admin (CTO)" | "Tech Lead" | "Senior Engineer" | "UI/UX Lead" | "DevOps & SRE";
}

export interface DevTask {
  id: string;
  title: string;
  projectId: string;
  projectName: string;
  status: "backlog" | "in_progress" | "code_review" | "qa_testing" | "deployed";
  priority: "critical" | "high" | "medium" | "low";
  assigneeId: string;
  assigneeName: string;
  storyPoints: number;
  tags: string[];
  branch: string;
  prNumber?: string;
  dueDate: string;
  description: string;
}

export interface CloudServerNode {
  id: string;
  name: string;
  role: string;
  environment: "production" | "staging" | "edge";
  ip: string;
  region: string;
  cpuUsage: number; // percentage
  memoryUsage: number; // percentage
  diskUsage: number; // percentage
  uptime: string;
  latencyMs: number;
  status: "healthy" | "warning" | "deploying";
  activeContainers: number;
  url?: string;
}

export interface ClientAccount {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  tier: "VIP Enterprise" | "Standard Pro" | "Startup Tier";
  activeProjects: number;
  totalPaidToman: number;
  balanceDueToman: number;
  contractStatus: "فعال و معتبر" | "در انتظار تمدید" | "تکمیل‌شده";
  joinedDate: string;
  healthScore: number; // percentage (e.g. 98)
  avatarBg: string;
}

export interface AdminInvoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  projectTitle: string;
  amountToman: number;
  status: "paid" | "pending_approval" | "overdue";
  issuedDate: string;
  dueDate: string;
  paidDate?: string;
  gateway?: "زرین‌پال اختصاصی" | "شبا / پایا شرکتی" | "ارزی / تتر";
  items: { title: string; qty: number; unitPriceToman: number }[];
}

export interface SystemLogEntry {
  id: string;
  timestamp: string;
  level: "info" | "success" | "warn" | "error";
  service: "auth-engine" | "k8s-cluster" | "billing-api" | "deploy-bot" | "db-pg" | "redis-cache";
  message: string;
  ip?: string;
  statusCode?: number;
}

export interface IncidentTicket {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  service: string;
  status: "open" | "investigating" | "resolved";
  reportedAt: string;
  assignee: string;
  slaMinutes: number;
}

// ---------------------- MOCK DATA SETS ---------------------- //

export const adminOverviewStats = {
  totalRevenueMonthlyToman: 485000000,
  growthPercentage: 28.4,
  activeProjectsCount: 8,
  activeSprintsCount: 4,
  openPullRequests: 7,
  completedTasksThisWeek: 42,
  serverUptime: 99.98,
  averageResponseTimeMs: 38,
  activeDevsOnline: 6,
  totalClientsCount: 19,
};

export const devTeamMembers: DevTeamMember[] = [
  {
    id: "dev-1",
    name: "نگار رستمی",
    role: "مدیر ارشد مهندسی و اسکرام‌مستر",
    specialty: "معماری سیستم، مدیریت اسپرینت‌ها و SLA",
    avatar: "ن.ر",
    avatarBg: "#18181b",
    status: "online",
    currentTask: "بررسی نهایی بازطراحی معماری میکروسرویس پیام‌رسان",
    activePRs: 2,
    email: "negar.r@redwebs.ir",
    github: "@negar-rostami",
    accessLevel: "Super Admin (CTO)",
  },
  {
    id: "dev-2",
    name: "سینا احمدی",
    role: "مهندس ارشد فول‌استک و DevOps",
    specialty: "Next.js 14, Node.js, Docker, Kubernetes, CI/CD",
    avatar: "س.ا",
    avatarBg: "#c41f36",
    status: "online",
    currentTask: "بهینه‌سازی پایپ‌لاین بیلد و کش سرورهای Edge",
    activePRs: 3,
    email: "sina.a@redwebs.ir",
    github: "@sina-dev-red",
    accessLevel: "Tech Lead",
  },
  {
    id: "dev-3",
    name: "مهدی کاظمی",
    role: "لید طراح رابط کاربری و دیزاین‌سیستم",
    specialty: "Figma Tokens, Tailwind CSS, Motion Animations",
    avatar: "م.ک",
    avatarBg: "#4f46e5",
    status: "busy",
    currentTask: "تکمیل کامپوننت‌های پنل بیمار و نوبت‌دهی کلینیک آرامش",
    activePRs: 1,
    email: "mehdi.k@redwebs.ir",
    github: "@kazemi-ux",
    accessLevel: "UI/UX Lead",
  },
  {
    id: "dev-4",
    name: "پویا سهرابی",
    role: "مهندس بک‌اند و پایگاه‌داده",
    specialty: "PostgreSQL High-Availability, Redis, NestJS, gRPC",
    avatar: "پ.س",
    avatarBg: "#059669",
    status: "online",
    currentTask: "پیاده‌سازی ایندکس‌های B-Tree برای کوئری‌های فاکتورها",
    activePRs: 1,
    email: "pouya.s@redwebs.ir",
    github: "@pouya-sohrabi",
    accessLevel: "Senior Engineer",
  },
  {
    id: "dev-5",
    name: "سارا طاهری",
    role: "سرپرست تضمین کیفیت و تست امنیت (QA)",
    specialty: "E2E Testing (Playwright), Penetration Testing, Jest",
    avatar: "س.ط",
    avatarBg: "#d97706",
    status: "online",
    currentTask: "اجرای تست‌های نفوذ OWASP روی گیت‌وی پرداخت",
    activePRs: 0,
    email: "sara.t@redwebs.ir",
    github: "@sara-qa-red",
    accessLevel: "Senior Engineer",
  },
  {
    id: "dev-6",
    name: "علی رضایی",
    role: "توسعه‌دهنده فرانت‌اند",
    specialty: "React, Next.js App Router, TypeScript, Redux Toolkit",
    avatar: "ع.ر",
    avatarBg: "#0284c7",
    status: "offline",
    currentTask: "پیاده‌سازی سبد خرید ریسپانسیو استودیو رخ",
    activePRs: 1,
    email: "ali.r@redwebs.ir",
    github: "@ali-rezaei-dev",
    accessLevel: "Senior Engineer",
  },
];

export const devTasks: DevTask[] = [
  {
    id: "TASK-101",
    title: "اتصال وب‌هوک وضعیت پرداخت زرین‌پال به سیستم صدور خودکار فاکتور",
    projectId: "aramesh",
    projectName: "کلینیک آرامش",
    status: "in_progress",
    priority: "critical",
    assigneeId: "dev-2",
    assigneeName: "سینا احمدی",
    storyPoints: 5,
    tags: ["Backend", "Payments", "NestJS", "ZarinPal"],
    branch: "feat/billing-webhook-zarinpal",
    prNumber: "#142",
    dueDate: "امروز",
    description: "پیاده‌سازی امضای امن HMAC و هندل کردن خطاهای شبکه هنگام برگشت تراکنش بانکی.",
  },
  {
    id: "TASK-102",
    title: "بهینه‌سازی تصاویر WebP و کش CDN در سرورهای ابری استودیو رخ",
    projectId: "rokh",
    projectName: "استودیو رخ",
    status: "code_review",
    priority: "high",
    assigneeId: "dev-6",
    assigneeName: "علی رضایی",
    storyPoints: 3,
    tags: ["Frontend", "Performance", "Cloudflare"],
    branch: "perf/image-optimization-v2",
    prNumber: "#144",
    dueDate: "فردا",
    description: "تبدیل تمام assetهای کاتالوگ محصولات به قالب بهینه و تنظیم هدرهای Cache-Control.",
  },
  {
    id: "TASK-103",
    title: "طراحی کامپوننت تقویم فارسی و رزرو وقت دکتر در استیجینگ",
    projectId: "aramesh",
    projectName: "کلینیک آرامش",
    status: "in_progress",
    priority: "high",
    assigneeId: "dev-3",
    assigneeName: "مهدی کاظمی",
    storyPoints: 8,
    tags: ["UI/UX", "Tailwind", "Motion", "Jalali"],
    branch: "feat/jalali-doctor-calendar",
    prNumber: "#145",
    dueDate: "۲ روز آینده",
    description: "پشتیبانی از تعطیلات رسمی، انتخاب شیفت صبح/عصر و هماهنگی با API رزرو.",
  },
  {
    id: "TASK-104",
    title: "پیکربندی مایگریشن‌های PostgreSQL 16 و ریداندنسی Replica",
    projectId: "infra",
    projectName: "زیرساخت کلاد ردوبز",
    status: "qa_testing",
    priority: "critical",
    assigneeId: "dev-4",
    assigneeName: "پویا سهرابی",
    storyPoints: 5,
    tags: ["DevOps", "Database", "PostgreSQL", "Replica"],
    branch: "infra/pg16-replica-migration",
    prNumber: "#139",
    dueDate: "امروز",
    description: "انتقال بدون دان‌تایم به سرورهای جدید با فعال‌سازی لاگ‌های Write-Ahead.",
  },
  {
    id: "TASK-105",
    title: "تست امنیتی احراز هویت پیامکی و ضد اسپم (Rate Limiting)",
    projectId: "infra",
    projectName: "سیستم مرکزی ردوبز",
    status: "deployed",
    priority: "critical",
    assigneeId: "dev-5",
    assigneeName: "سارا طاهری",
    storyPoints: 3,
    tags: ["Security", "Redis", "RateLimit"],
    branch: "sec/otp-rate-limiting-guard",
    prNumber: "#138",
    dueDate: "تکمیل شد",
    description: "محدودسازی درخواست‌های OTP بر مبنای IP و شماره تماس با استفاده از الگوریتم Token Bucket در ردیس.",
  },
  {
    id: "TASK-106",
    title: "پیاده‌سازی پنل لایو ویدیو چت و اسکای‌روم برای مشاوره آنلاین",
    projectId: "aramesh",
    projectName: "کلینیک آرامش",
    status: "deployed",
    priority: "high",
    assigneeId: "dev-2",
    assigneeName: "سینا احمدی",
    storyPoints: 8,
    tags: ["WebRTC", "VoIP", "Next.js"],
    branch: "feat/webrtc-call-modal",
    prNumber: "#136",
    dueDate: "تکمیل شد",
    description: "ایجاد مدال تماس صوتی، تصویری و تنظیم جلسه آنلاین همراه با قابلیت ضبط و اشتراک تصویر.",
  },
  {
    id: "TASK-107",
    title: "پیاده‌سازی موتور پیشنهاد محصولات مشابه با هوش مصنوعی",
    projectId: "rokh",
    projectName: "استودیو رخ",
    status: "backlog",
    priority: "medium",
    assigneeId: "dev-4",
    assigneeName: "پویا سهرابی",
    storyPoints: 13,
    tags: ["AI/ML", "Vector Search", "Embeddings"],
    branch: "feat/ai-recommendation-engine",
    dueDate: "اسپرینت بعدی",
    description: "ذخیره بردار ویژگی‌های محصولات در pgvector و پیشنهاد هوشمند بر اساس رفتار خرید.",
  },
  {
    id: "TASK-108",
    title: "اتوماسیون خروجی گزارش مالی ماهانه به فرمت اکسل و PDF",
    projectId: "infra",
    projectName: "امور مالی ردوبز",
    status: "backlog",
    priority: "low",
    assigneeId: "dev-6",
    assigneeName: "علی رضایی",
    storyPoints: 2,
    tags: ["Finance", "PDF Export", "Automation"],
    branch: "feat/finance-reporting-cron",
    dueDate: "هفته آینده",
    description: "اجرای کران‌جاب اول هر ماه شمسی برای تولید صورت‌های مالی و ارسال به ایمیل مدیران.",
  },
];

export const cloudServerNodes: CloudServerNode[] = [
  {
    id: "srv-prod-1",
    name: "redwebs-prod-k8s-cluster-01",
    role: "Kubernetes Production Master & Worker Cluster",
    environment: "production",
    ip: "185.143.232.10",
    region: "تهران (آسیاتک برج میلاد)",
    cpuUsage: 26,
    memoryUsage: 48,
    diskUsage: 34,
    uptime: "۹۹.۹۹٪ (۱۴۲ روز بدون دان‌تایم)",
    latencyMs: 14,
    status: "healthy",
    activeContainers: 18,
    url: "https://redwebs.ir",
  },
  {
    id: "srv-stage-aramesh",
    name: "staging-aramesh-app-v3",
    role: "Staging Testing Environment (Clinic Aramesh)",
    environment: "staging",
    ip: "185.143.232.14",
    region: "تهران (ابر آروان)",
    cpuUsage: 14,
    memoryUsage: 32,
    diskUsage: 19,
    uptime: "۹۹.۹۵٪ (۲۸ روز)",
    latencyMs: 18,
    status: "healthy",
    activeContainers: 4,
    url: "https://staging.aramesh.redwebs.cloud",
  },
  {
    id: "srv-stage-rokh",
    name: "staging-rokh-shop-v2",
    role: "E-Commerce Preview & Staging Sandbox",
    environment: "staging",
    ip: "185.143.232.19",
    region: "تهران (ابر آروان)",
    cpuUsage: 38,
    memoryUsage: 62,
    diskUsage: 45,
    uptime: "۹۹.۹۰٪ (۱۵ روز)",
    latencyMs: 22,
    status: "healthy",
    activeContainers: 6,
    url: "https://preview.rokh.redwebs.dev",
  },
  {
    id: "srv-db-primary",
    name: "pg-cluster-master-db1",
    role: "PostgreSQL 16 High-Availability Engine + PgBouncer",
    environment: "production",
    ip: "10.0.4.12 (Internal VPC)",
    region: "تهران (شبکه داخلی اختصاصی)",
    cpuUsage: 32,
    memoryUsage: 54,
    diskUsage: 42,
    uptime: "۱۰۰٪ (۲۱۰ روز)",
    latencyMs: 3,
    status: "healthy",
    activeContainers: 2,
  },
  {
    id: "srv-redis-cache",
    name: "redis-cache-cluster-inmemory",
    role: "Redis 7 In-Memory Cache, Session & Rate-Limiter",
    environment: "production",
    ip: "10.0.4.15 (Internal VPC)",
    region: "تهران (شبکه داخلی)",
    cpuUsage: 9,
    memoryUsage: 22,
    diskUsage: 8,
    uptime: "۱۰۰٪ (۲۱۰ روز)",
    latencyMs: 1,
    status: "healthy",
    activeContainers: 2,
  },
  {
    id: "srv-edge-gateway",
    name: "redwebs-edge-waf-cdn",
    role: "Edge Reverse Proxy, DDoS Protection & SSL Terminator",
    environment: "edge",
    ip: "Anycast Global",
    region: "Anycast Edge Nodes (Global + IR)",
    cpuUsage: 18,
    memoryUsage: 29,
    diskUsage: 12,
    uptime: "۹۹.۹۹٪",
    latencyMs: 8,
    status: "healthy",
    activeContainers: 12,
  },
];

export const clientAccounts: ClientAccount[] = [
  {
    id: "cli-1",
    companyName: "کلینیک تخصصی و جراحی آرامش",
    contactPerson: "دکتر آرمان محمدی",
    phone: "۰۹۱۲ ۳۴۵ ۶۷۸۹",
    email: "arman.mohammadi@aramesh.clinic",
    tier: "VIP Enterprise",
    activeProjects: 2,
    totalPaidToman: 94000000,
    balanceDueToman: 18000000,
    contractStatus: "فعال و معتبر",
    joinedDate: "۱۵ تیر ۱۴۰۴",
    healthScore: 98,
    avatarBg: "#c41f36",
  },
  {
    id: "cli-2",
    companyName: "استودیو مد و پوشاک رخ",
    contactPerson: "سارا ابراهیمی",
    phone: "۰۹۱۹ ۵۵۵ ۴۳۲۱",
    email: "sara@rokhstudio.com",
    tier: "Standard Pro",
    activeProjects: 1,
    totalPaidToman: 42000000,
    balanceDueToman: 0,
    contractStatus: "فعال و معتبر",
    joinedDate: "۲ خرداد ۱۴۰۴",
    healthScore: 94,
    avatarBg: "#7c3aed",
  },
  {
    id: "cli-3",
    companyName: "دفتر وکالت و مشاوره حقوقی پارسا",
    contactPerson: "مهندس کامران پارسا",
    phone: "۰۹۱۲ ۹۸۷ ۶۵۴۳",
    email: "k.parsa@law-parsa.ir",
    tier: "Standard Pro",
    activeProjects: 0,
    totalPaidToman: 35000000,
    balanceDueToman: 0,
    contractStatus: "تکمیل‌شده",
    joinedDate: "۱۰ فروردین ۱۴۰۴",
    healthScore: 100,
    avatarBg: "#059669",
  },
  {
    id: "cli-4",
    companyName: "مرکز تصویربرداری و تشخیص مهر",
    contactPerson: "دکتر فرزانه صمدی",
    phone: "۰۹۳۵ ۱۲۳ ۹۹۸۸",
    email: "samadi@mehr-center.med.ir",
    tier: "VIP Enterprise",
    activeProjects: 1,
    totalPaidToman: 55000000,
    balanceDueToman: 25000000,
    contractStatus: "در انتظار تمدید",
    joinedDate: "۲۰ اردیبهشت ۱۴۰۴",
    healthScore: 89,
    avatarBg: "#0284c7",
  },
  {
    id: "cli-5",
    companyName: "صنایع دارویی و زیست‌فناوری نوین سپهر",
    contactPerson: "مهندس رضا کریمی",
    phone: "۰۹۱۲ ۴۴۴ ۷۷۸۸",
    email: "r.karimi@sepehr-pharma.com",
    tier: "VIP Enterprise",
    activeProjects: 1,
    totalPaidToman: 120000000,
    balanceDueToman: 30000000,
    contractStatus: "فعال و معتبر",
    joinedDate: "۱ خرداد ۱۴۰۴",
    healthScore: 96,
    avatarBg: "#d97706",
  },
];

export const adminInvoices: AdminInvoice[] = [
  {
    id: "inv-2024-001",
    invoiceNumber: "INV-۱۴۰۴-۸۹۱",
    clientId: "cli-1",
    clientName: "کلینیک تخصصی آرامش",
    projectTitle: "قسط دوم توسعه فرانت‌اند و پنل رزرواسیون",
    amountToman: 18000000,
    status: "pending_approval",
    issuedDate: "۱۲ مرداد ۱۴۰۴",
    dueDate: "۲۰ مرداد ۱۴۰۴",
    gateway: "زرین‌پال اختصاصی",
    items: [
      { title: "پیاده‌سازی پنل بیمار و پرونده الکترونیک", qty: 1, unitPriceToman: 12000000 },
      { title: "اتصال به سامانه پیامک و نوتیفیکیشن", qty: 1, unitPriceToman: 6000000 },
    ],
  },
  {
    id: "inv-2024-002",
    invoiceNumber: "INV-۱۴۰۴-۸۸۵",
    clientId: "cli-2",
    clientName: "استودیو مد و پوشاک رخ",
    projectTitle: "تسویه نهایی فروشگاه آنلاین و درگاه سپهر",
    amountToman: 24000000,
    status: "paid",
    issuedDate: "۲۸ تیر ۱۴۰۴",
    dueDate: "۵ مرداد ۱۴۰۴",
    paidDate: "۱ مرداد ۱۴۰۴",
    gateway: "شبا / پایا شرکتی",
    items: [
      { title: "ماژول انبارداری و اتصال حسابداری سپیدار", qty: 1, unitPriceToman: 16000000 },
      { title: "تنظیم هاستینگ پرسرعت ابری و SSL سالانه", qty: 1, unitPriceToman: 8000000 },
    ],
  },
  {
    id: "inv-2024-003",
    invoiceNumber: "INV-۱۴۰۴-۸۷۰",
    clientId: "cli-4",
    clientName: "مرکز پزشکی مهر",
    projectTitle: "پیش‌پرداخت قرارداد طراحی سیستم نوبت‌دهی",
    amountToman: 30000000,
    status: "paid",
    issuedDate: "۱۵ تیر ۱۴۰۴",
    dueDate: "۲۲ تیر ۱۴۰۴",
    paidDate: "۱۸ تیر ۱۴۰۴",
    gateway: "زرین‌پال اختصاصی",
    items: [
      { title: "بریف معماری نرم‌افزار و طراحی Figma UI", qty: 1, unitPriceToman: 30000000 },
    ],
  },
];

export const systemLogEntries: SystemLogEntry[] = [
  {
    id: "log-1",
    timestamp: "۱۰:۴۲:۱۵",
    level: "success",
    service: "deploy-bot",
    message: "استقرار موفقیت‌آمیز کانتینر Staging v3.4 روی کلاستر تهران با شناسه commit #8fa23d",
    statusCode: 200,
  },
  {
    id: "log-2",
    timestamp: "۱۰:۳۹:۰۲",
    level: "info",
    service: "k8s-cluster",
    message: "ترافیک ورودی به پادها نرمال است — میانگین پاسخگویی ۳۲ میلی‌ثانیه",
    statusCode: 200,
  },
  {
    id: "log-3",
    timestamp: "۱۰:۳۵:۴۴",
    level: "success",
    service: "billing-api",
    message: "تایید وب‌هوک واریزی درگاه زرین‌پال برای فاکتور #۸۸۵ به مبلغ ۲۴,۰۰۰,۰۰۰ تومان",
    ip: "185.143.232.10",
    statusCode: 200,
  },
  {
    id: "log-4",
    timestamp: "۱۰:۲۱:۱۸",
    level: "warn",
    service: "auth-engine",
    message: "هشدار امنیتی: تعداد ۵ درخواست ناموفق ورود با رمز عبور اشتباه مسدود شد (Rate Limit Triggered)",
    ip: "5.160.18.24",
    statusCode: 429,
  },
  {
    id: "log-5",
    timestamp: "۱۰:۰۵:۰۰",
    level: "info",
    service: "db-pg",
    message: "پشتیبان‌گیری خودکار دیتابیس (Daily Automated Snapshot) با موفقیت در فضای ابری ذخیره شد (حجم: ۱.۴ گیگابایت)",
    statusCode: 200,
  },
  {
    id: "log-6",
    timestamp: "۰۹:۵۲:۱۱",
    level: "info",
    service: "redis-cache",
    message: "پاکسازی هوشمند کش صفحات نمونه‌کارها پس از آپدیت توسط ادمین (Key: cache:portfolio:*)",
    statusCode: 200,
  },
];

export const incidentTickets: IncidentTicket[] = [
  {
    id: "INC-89",
    title: "تاخیر موردی در تحویل پیامک‌های احراز هویت در اپراتور همراه اول",
    severity: "medium",
    service: "SMS Gateway Provider",
    status: "investigating",
    reportedAt: "۳۰ دقیقه پیش",
    assignee: "سینا احمدی",
    slaMinutes: 60,
  },
  {
    id: "INC-88",
    title: "بهینه‌سازی مصرف حافظه RAM در سرور تست فروشگاه رخ",
    severity: "low",
    service: "Docker Memory Limit",
    status: "resolved",
    reportedAt: "۲ ساعت پیش",
    assignee: "پویا سهرابی",
    slaMinutes: 120,
  },
];
