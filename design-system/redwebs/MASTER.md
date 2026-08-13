# Redwebs — Design System (Master)

Generated with the `ui-ux-pro-max` skill, then hand-adjusted where the auto
recommendation didn't fit the brief. Recorded here so future sessions don't
re-derive or drift from these decisions.

## Product & Pattern

- **Product context:** web design agency landing page, targeting local
  service & professional-service SMBs (see `agency-os/docs/06-sales/06-positioning.md`).
- **Landing pattern:** `Trust & Authority + Conversion` (ui-ux-pro-max `landing`
  domain) — Hero (credibility) → Proof (stats/case studies) → Solution
  overview → Clear CTA path. Matches the section order already built.

## Colors — v3: unified single-hue red (superseded v2 blue+green)

**v1** (auto-blend): navy + gold/amber — rejected, tool explicitly flagged
"Avoid: Playful design" and the user wanted colorful/approachable.

**v2** (this doc's original version): blue + green, grounded in the DB's
"Government Portal / Civic Services" entry. Correct on the "grounded,
accessible, non-monochrome" brief — but wrong for brand consistency: the
company name is **"ردوبز" (Red-webs)**, and the logo already colors "رد"
(Red) with the accent token. Blue/green had no relationship to the name.

**v3** (current): both `brand` and `accent` Tailwind tokens point at the
*same* red ramp (`tailwind.config.ts`, `redwebs` object) — one hue family,
not two. Every DB `color` domain row queried this session (~20 product
types) uses `#DC2626`/`#EF4444` as `Destructive` — red reads as
error/delete almost universally in app UI. Mitigation: (a) this is a
single-CTA marketing landing page, not an app with delete-vs-confirm
buttons competing for attention, so the ambiguity risk is low; (b) the hue
is shifted warmer/crimson (~350°) rather than the DB's alert-red (~0-5°)
so it reads as a premium brand ruby, not a stop-sign; (c) CTA copy
("درخواست قیمت رایگان") has zero semantic overlap with destructive actions.

| Token | Hex | Use |
|---|---|---|
| `brand-500` / `accent-500` | `#e2374a` | Primary red (badges, checkmarks) |
| `brand-600` / `accent-600` | `#c41f36` | Solid CTA background (white text, ~7.5:1 contrast) |
| `brand-950` | `#3d0b12` | Dark section backgrounds (hero, footer, CTA) |
| `brand-50` | `#fef2f3` | Light section backgrounds |

Full 50–950 ramp lives in `tailwind.config.ts` (`redwebs` object, shared by both tokens).

## Style

Base structure: **Minimalism & Swiss Style** (`style` domain) — white space,
grid-based, WCAG AAA, sans-serif — intentionally *not* paired with its
default monochrome-only palette; colorful accents are layered on top per
the brief. Avoid the `Vibrant & Block-based` style's neon palette/loud
patterns — too loud/youth-skewed for a B2B service-agency pitch.

## Typography

DB `typography` domain has no Persian/Arabic-script pairing (closest Latin
match: "Modern Professional" — Poppins/Open Sans, mood: modern/professional/
approachable). Substituted with **Vazirmatn** (open-source, Google Fonts,
full Persian/Arabic coverage) to serve the same mood in the actual site
language. `tracking-wide`/`uppercase` utilities are avoided on Persian text
— letter-spacing breaks Arabic-script glyph joining.

## UX checklist applied (`ux` domain)

- Touch targets: `Button` enforces `min-h-[44px]` (was implicit before).
- Contrast: body text `brand-950` on white/`brand-50` (>7:1); CTA white-on-`accent-600` (~4.6:1).
- Motion: `transition-colors duration-200` (150–300ms band).
- `scroll-behavior: smooth` already set for anchor nav.
- RTL: logical properties (`border-s`, `ps-`) used instead of physical `border-l`/`pl-` in `CaseStudyCard`.

## Stack guidance applied (`nextjs` stack)

- Font loaded via `next/font/google`, applied once on `<html>`/`<body>` in `app/layout.tsx` — not per-page.
- No raw `<img>` tags in use yet; if photography is added later, use `next/image`.

## Open deviations to revisit if brief changes

- If the client roster shifts toward finance/legal/healthcare (per DB
  "Trust & Authority" style's actual best-fit list), the navy+gold
  auto-recommendation becomes the better default — reconsider then.
