# Frontend — Next.js App

**Tech Stack:**
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- MDX (for content)

---

## Folder Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout (header, footer)
│   ├── page.tsx           # Home page /
│   ├── services/
│   │   └── page.tsx       # /services
│   ├── portfolio/
│   │   ├── page.tsx       # /portfolio (list)
│   │   └── [slug]/
│   │       └── page.tsx   # /portfolio/[case-study]
│   ├── about/
│   │   └── page.tsx       # /about
│   ├── contact/
│   │   └── page.tsx       # /contact (with form)
│   ├── blog/
│   │   ├── page.tsx       # /blog (archive)
│   │   └── [slug]/
│   │       └── page.tsx   # /blog/[post-slug]
│   └── api/
│       └── contact/
│           └── route.ts   # POST /api/contact (form handler)
│
├── components/             # Reusable React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ContactForm.tsx
│   ├── CaseStudyCard.tsx
│   ├── ServiceCard.tsx
│   ├── Button.tsx
│   ├── Container.tsx
│   └── ...
│
├── content/                # Markdown/MDX content
│   ├── case-studies/
│   │   ├── [company-1].mdx
│   │   ├── [company-2].mdx
│   │   └── [company-3].mdx
│   ├── blog/
│   │   ├── [post-1].md
│   │   └── [post-2].md
│   └── settings.json       # Site-wide config
│
├── lib/                    # Utility functions
│   ├── contentLoader.ts   # Parse markdown files
│   ├── formatDate.ts
│   ├── api.ts             # API client
│   └── types.ts           # TypeScript types
│
├── styles/                 # CSS & Tailwind config
│   ├── globals.css
│   └── tailwind.config.ts
│
├── public/                 # Static assets
│   ├── images/
│   │   ├── hero.jpg
│   │   ├── case-studies/
│   │   └── team/
│   └── logo.svg
│
├── .env.example            # Environment variables template
├── package.json            # Dependencies
├── next.config.ts          # Next.js config
├── tsconfig.json           # TypeScript config
└── README.md              # This file
```

---

## Key Pages Outline

### Home Page (`app/page.tsx`)

Sections:
- Hero banner (tagline, CTA)
- Service overview (Standard + Custom)
- Featured case studies (3–5)
- Testimonials
- Call to action (Contact CTA)

### Services Page (`app/services/page.tsx`)

- Standard Track description + pricing
- Custom Track description + pricing
- FAQ section
- "Get a quote" CTA

### Portfolio Page (`app/portfolio/page.tsx`)

- Grid of case studies (5 cards)
- Filter by industry
- Click → case study detail page

### Case Study Detail (`app/portfolio/[slug]/page.tsx`)

- Hero image
- Problem statement
- Solution overview
- Results/metrics
- Timeline + budget
- Client testimonial
- "Start a project" CTA

### About Page (`app/about/page.tsx`)

- Company story
- Founder bio + photo
- Team members + roles
- Company values/philosophy

### Contact Page (`app/contact/page.tsx`)

- Contact form (name, email, phone, message, service interest)
- Form submission → API → email + Slack
- Embedded calendar (Calendly for discovery calls)

### Blog Archive (`app/blog/page.tsx`)

- List of articles (newest first)
- Filter by tag
- Search box

### Blog Post Detail (`app/blog/[slug]/page.tsx`)

- Article title + date + author
- Article body (rendered from markdown)
- Related posts
- "Subscribe" or "Contact" CTA

---

## Components Checklist

**Layout Components:**
- [ ] Header (logo, nav menu)
- [ ] Footer (links, social, copyright)
- [ ] Container (max-width wrapper)

**Feature Components:**
- [ ] Hero (headline, subheader, CTA button)
- [ ] Button (primary, secondary, outline variants)
- [ ] Card (case study, service, testimonial)
- [ ] Grid (responsive grid for portfolio)
- [ ] Section (spacing + styling container)

**Form Components:**
- [ ] ContactForm (name, email, phone, message, submit)
- [ ] Input (text input with label)
- [ ] Textarea (multi-line input)
- [ ] Select (dropdown for service selection)

**Content Components:**
- [ ] Testimonial (quote + author + photo)
- [ ] Stat (number + label for results)
- [ ] Timeline (project phases: design → dev → launch)
- [ ] ServiceCard (icon + title + description)

---

## Styling System

**Tailwind Config (`styles/tailwind.config.ts`):**

```
- Colors: Primary (brand), secondary, neutral, success, warning, error
- Typography: Font stack (system fonts or Google Fonts)
- Spacing: 4px scale (px-4, py-8, mb-16, etc.)
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
```

**Global CSS (`styles/globals.css`):**
- Reset styles
- Font declarations
- Custom utility classes (if needed)

---

## Content Pipeline

### Case Study

**File:** `content/case-studies/[company].mdx`

```mdx
---
title: "Company Name: How We Got X% More Leads"
industry: "Local Services"
date: "2026-08-10"
image: "/images/case-studies/company-hero.jpg"
---

# Problem
[Description]

# Solution
[Description]

# Results
- Metric 1
- Metric 2
```

**Display:**
- Parsed by `lib/contentLoader.ts`
- Rendered in `components/CaseStudyCard.tsx`
- Full detail in `app/portfolio/[slug]/page.tsx`

### Blog Post

**File:** `content/blog/[slug].md`

```md
---
title: "Article Title"
date: "2026-08-10"
author: "Founder Name"
tags: ["topic1", "topic2"]
---

# Heading

Paragraph text...
```

---

## Development Checklist

### Setup
- [ ] Node.js installed (v18+)
- [ ] Clone repo
- [ ] `npm install`
- [ ] `.env.local` created (copy from `.env.example`)

### Development
- [ ] `npm run dev` running on localhost:3000
- [ ] All pages loading
- [ ] Components rendering correctly
- [ ] No console errors

### Content
- [ ] Home page content finalized
- [ ] 3–5 case studies added
- [ ] Services page copy written
- [ ] Team bios written

### Forms & API
- [ ] Contact form working
- [ ] Form submissions → email
- [ ] Form submissions → Slack
- [ ] Calendar embed (Calendly) working

### Performance
- [ ] Images optimized (next/image)
- [ ] Lighthouse score > 80
- [ ] Mobile responsive (test on device)

### Deployment
- [ ] GitHub repo connected to Vercel
- [ ] Auto-deploy on push to main
- [ ] Custom domain configured
- [ ] SSL certificate active

---

## Environment Variables

**`.env.local` template:**

```
# Email service
SENDGRID_API_KEY=...
SENDGRID_FROM_EMAIL=hello@[domain]

# Slack webhook (for form notifications)
SLACK_WEBHOOK_URL=...

# Analytics
NEXT_PUBLIC_GA_ID=...

# Contentful (if using CMS backend)
CONTENTFUL_SPACE_ID=...
CONTENTFUL_ACCESS_TOKEN=...
```

---

## Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Content
npm run build-content    # Re-parse markdown files (if needed)

# Deployment
# Automatic: Push to GitHub → Vercel auto-deploys
# Manual: `vercel deploy` or Vercel dashboard
```

---

## Code Standards

**TypeScript:**
- All pages: `.tsx`
- All components: `.tsx`
- Utility functions: `.ts`

**Naming:**
- Components: `PascalCase` (Header.tsx, ContactForm.tsx)
- Utilities: `camelCase` (contentLoader.ts, formatDate.ts)
- Variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

**Imports:**
```tsx
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button';
```

---

## Testing

### Manual Testing
- [ ] All pages load (no 404s)
- [ ] All links work
- [ ] Contact form submits
- [ ] Mobile responsive (iPad, iPhone, Android)
- [ ] No console errors
- [ ] Images load

### Lighthouse Audit
- [ ] Performance > 80
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90

---

## Common Tasks

### Add a Case Study
1. Create `content/case-studies/[company].mdx`
2. Include frontmatter (title, industry, date, image)
3. Write: Problem, Solution, Results
4. Add image to `public/images/case-studies/`
5. Commit and push → Vercel auto-deploys

### Update Home Page
1. Edit `app/page.tsx`
2. Update content/components
3. Preview on localhost:3000
4. Commit and push → Vercel auto-deploys

### Add a Blog Post
1. Create `content/blog/[slug].md`
2. Include frontmatter
3. Write article content
4. Commit and push → Vercel auto-deploys

---

**Owner:** Tech Lead + Designer
**Status:** Ready to build
**First Component Target:** Header, Footer, HomePage
**Last Updated:** 2026-08-10
