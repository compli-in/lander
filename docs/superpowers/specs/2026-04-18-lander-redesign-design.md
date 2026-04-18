# Lander Redesign — Design Spec

**Date:** 2026-04-18
**Scope:** `lander/` — the compli.in marketing site homepage (`/`). Blog routes untouched.
**Goal:** Replace the current by-the-book SaaS homepage with a DPDP-first, product-led page that proves the product works through animated mockups, not claims.

---

## 1. Audience and positioning

Weighted target mix (informs every copy and visual choice):

- **50%** — DPDP-Act-driven Indian enterprise buyer. *Aha:* "Finally, something built for Indian regulation, not retrofitted."
- **25%** — Security / compliance lead at a scaling company. *Aha:* "I can see my live cloud posture, not a stale spreadsheet."
- **25%** — Indian SaaS founder / CTO chasing their first SOC 2. *Aha:* "Gets me audit-ready faster and cheaper than Vanta / Drata."

**Positioning sentence (drives hero and section 3 copy):**
> Compli is the DPDP-first, cloud-compliance platform built in India — the same platform answers to the DPDP Board *and* your US customers.

**Tone blend:** institutional / audit-grade base (serious palette, dense proof) + modern product-led proof (animated product mockups that actually show findings being caught).

---

## 2. Visual system

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0b1220` | Primary dark background (hero, findings ticker) |
| `--bg-card` | `#0f1830` | Raised surfaces (posture card, framework panel) |
| `--border` | `#1d2a44` | Card borders, dividers on dark |
| `--text` | `#e6edf7` | Primary text on dark |
| `--text-dim` | `#a9b7d1` | Secondary text on dark |
| `--text-muted` | `#8aa0c7` | Labels, meta |
| `--accent` | `#7dd3fc` | Sky-blue highlight text, live-status dots |
| `--accent-cta` | `#2563eb` | Primary CTA background |
| `--warm` | `#b45309` | DPDP-specific callouts (India-leaning warm-amber) |
| `--cream` | `#f7f6f2` | Light-section canvas (section 3 comparison) |
| `--pass` | `#34d399` | PASS / healthy states |
| `--med` | `#f59e0b` | MED severity |
| `--high` | `#ef4444` | HIGH severity |

**Type:** Inter (already used) or system stack. Hero display at ~52px / 1.05 line-height / -0.025em tracking. Body 16–17px, line-height 1.55–1.6. All micro-labels uppercase, 11px, letter-spacing 0.16em.

**Motion:** default animations respect `prefers-reduced-motion: reduce` and hold the final frame instead. All animations initialize via IntersectionObserver — nothing animates off-screen.

---

## 3. Page structure (top to bottom)

### 3.0 Top navigation (new)

- Left: logo mark (22px rounded square, blue fill, "C") + "compli.in" wordmark, 15px/600 weight.
- Right: Product · Frameworks · Pricing · Blog (13px/450), then a single `Request Early Access` pill CTA.
- Sticky on scroll with subtle translucent background after 40px.
- Mobile: collapse links into a hamburger; keep CTA pill visible.

### 3.1 Hero — "Live findings ticker"

- Dark canvas with radial sky glow at top-center.
- `● 14 orgs scanning right now` live-status pill (border + green dot).
- Headline: **"Know your cloud compliance score"** / **"before your auditor does."** (second line in sky-blue).
- Subhead: *"DPDP Act, SOC 2, ISO 27001 — continuously evaluated across AWS, Azure, GCP, and Kubernetes. Built in India, for India-first compliance."*
- Two CTAs: `Request Early Access →` (primary), `▶ See a live scan` (ghost).
- **Findings ticker strip** (full-width dark card under CTAs):
  - Header: `Live scan · acme-prod · AWS ap-south-1` left, `● streaming findings` right.
  - Body: 4-column grid of finding cards, each with colored left-border and stacked severity / title / framework-control label.
  - Looping animation (6s cycle): a new card slides in from the right, the leftmost card slides out. Content pool: HIGH S3 public · DPDP §8(5), MED IAM key 127d · SOC 2 CC6.1, MED RDS unencrypted · ISO A.8.24, PASS CloudTrail ✓, HIGH Security group 0.0.0.0/0 · DPDP §8(5), MED CloudWatch alarms missing · SOC 2 CC7.2.

### 3.2 "See it catch a real issue" + Frameworks (merged)

Two-column layout, stacks on mobile.

- **Left (~60%)** — animated dashboard mock, scripted 12s sequence:
  1. Fake CLI line: `compli connect --provider aws` → "Assume role OK · 18 accounts"
  2. Scan progress bar fills 0 → 100%
  3. Findings list populates top-down; the **S3 public bucket** finding zooms into a detail card
  4. Detail card reveals three framework badges lighting up in sequence: **DPDP §8(5)**, **SOC 2 CC6.1**, **ISO A.8.3**
  5. Score widget in the corner ticks **82 → 78** with a downward arrow
  6. Holds on the final frame for 3s, then loops
- **Right (~40%)** — framework panel. Three cards stacked: **DPDP Act · 94 controls · 67 automated**, **SOC 2 · 120 / 89**, **ISO 27001 · 93 / 71**. Each card has an automated-coverage progress bar and three sample mapped controls. When the left sequence lights up DPDP §8(5) / SOC 2 CC6.1 / ISO A.8.3, the corresponding row on the right gets a brief blue outline — keeps both sides locked in narrative sync.

Section heading: **"See exactly what we catch."** Subhead positions the merge: *"One scan, three frameworks. Every finding maps to the controls your auditor — and the DPDP Board — actually reference."*

### 3.3 Why India needs its own platform

Light canvas (`--cream`) to break the dark rhythm and signal a new thought.

- Short opinionated intro (~2 sentences): *"Vanta and Drata were built for US startups. The DPDP Act is not a checkbox you add on — it needs a platform that starts from Indian regulation and extends outward."*
- **Comparison table** — 5 rows × 3 columns (Dimension / Vanta or Drata / Compli):
  1. DPDP Act coverage — *Not offered* / *Native, day-1*
  2. Data residency — *US-only* / *ap-south-1, India*
  3. Pricing — *USD, US-scale* / *INR, India-scale*
  4. Indian auditor network — *None* / *Partnered with CERT-In listed auditors*
  5. Support timezone — *US business hours* / *IST, 24×5*
- Checkmarks / crosses rendered as simple inline SVG. No marketing hyperbole — table is scannable.

### 3.4 How it works

3 numbered steps, each with a small animated component. Dark canvas again.

1. **Connect your cloud in 5 minutes.** Terminal-style mock of `aws sts assume-role` → "Connected to 18 accounts."
2. **Continuous scans, not quarterly snapshots.** Progress bar loops every 6s with `Scanning · 342/500 checks` counter.
3. **Live posture + prioritised fixes.** Score dial widget animates from current to target.

### 3.5 Agentic / remediation preview

- **"Coming next"** chip.
- Animated mock of an AI agent drafting a remediation PR:
  1. Left pane: file tree highlights `infra/s3.tf`
  2. Right pane: diff view reveals `-  acl = "public-read"` / `+  acl = "private"` lines appearing as typed
  3. Green `Apply fix →` button pulses at the bottom
- Single paragraph copy: *"Agentic remediation drafts the fix as a pull request, mapped to the same control. Land audit-ready commits without hand-written Terraform hunts."*

### 3.6 Early-access CTA block

- Inline form replacing today's standalone `#early-access` anchor section.
- Fields: **Work email**, **Company**, **Primary cloud** (AWS · Azure · GCP · Kubernetes · Mixed), and a small `Which framework first?` multi-select (DPDP / SOC 2 / ISO 27001).
- Single submit button `Request Early Access →`. On success, inline confirmation ("You're on the list. We'll reach out within 2 business days.")
- Form posts to an existing endpoint (confirm during planning — likely a serverless handler or Resend/Loops integration).

### 3.7 Footer

Keep current `Footer` component. Update only to match the new colour tokens if the old palette drifts.

---

## 4. Component architecture

New components, all in `lander/src/components/`:

- `TopNav.tsx` — new file replacing `Header.tsx`. Delete `Header.tsx` and update the import in `page.tsx`.
- `HeroLive.tsx` — full hero including the findings ticker strip. Internally composes `FindingsTicker`.
- `FindingsTicker.tsx` — isolated, reusable. Accepts a `findings: Finding[]` prop so the pool is data-driven.
- `SeeItCatch.tsx` — merged section 2. Composes `ScanMockDashboard` (left) and `FrameworkPanel` (right).
- `ScanMockDashboard.tsx` — the 12s scripted sequence.
- `FrameworkPanel.tsx` — the 3 framework cards; exposes `highlight(controlId)` imperative via ref so `SeeItCatch` can sync the two sides.
- `IndiaComparison.tsx` — section 3 table.
- `HowItWorks.tsx` — rewrite existing, 3 steps + animated mini-components.
- `AgenticPreview.tsx` — section 5 diff animation.
- `EarlyAccessForm.tsx` — section 6.

**Deleted from `page.tsx` imports:** `Features`, `Agentic` (subsumed into new sections), `ComingSoon` (subsumed into `AgenticPreview`), existing `Hero`, existing `HowItWorks`, existing `Frameworks`.

**Keep:** `Footer`, `JsonLd`, the three schema.org objects (update `description` fields to match new copy).

### Boundary rules

- Each new animated component owns its own motion state internally. No global animation coordinator.
- Shared tokens (colours, easing, durations) live in a single `lander/src/components/tokens.ts` export. Tailwind arbitrary values may reference these via CSS custom properties set in `globals.css`.
- Sections communicate only through props. `SeeItCatch` is the one exception that uses a ref-based imperative handle to drive `FrameworkPanel.highlight()`; this is a deliberate local coupling because the two components are narratively inseparable.

---

## 5. Accessibility and performance

- All animated sections have a **skip-to-static** fallback when `prefers-reduced-motion: reduce`. Each animation defines a "final frame" that is rendered directly when motion is disabled.
- Findings ticker and scan mock are decorative; wrap in `aria-hidden="true"` and provide a concise screen-reader summary (e.g. `<span class="sr-only">Live scan example showing findings such as public S3 buckets mapped to DPDP section 8(5), SOC 2 CC6.1, and ISO A.8.3 controls.</span>`).
- Comparison table uses real `<table>` semantics with `<caption>` and scope attributes.
- Form fields have labels, not just placeholders. Errors announce via `aria-live="polite"`.
- No video assets → no autoplay/accessibility landmines. Total added JS target: keep under ~30KB gzipped of new app code.
- All images (logo mark, framework icons) as inline SVG where possible; no decorative PNGs.

---

## 6. SEO and structured data

- Update `organizationSchema.description` and `softwareSchema.description` in `page.tsx` to lead with DPDP Act.
- Add `FAQPage` schema block covering: *Is Compli DPDP-compliant?*, *Does Compli support SOC 2?*, *Where is data stored?*, *Do you integrate with Indian auditors?* Four Q&As, answers mirroring the comparison table.
- `<title>` and `<meta description>` updated in `layout.tsx` to reflect DPDP-first positioning.
- All new copy passes a plain-English scan: target Flesch ~60+. No jargon without a parenthetical on first use.

---

## 7. Out of scope (explicitly not in this spec)

- Blog and `/blog/[slug]` changes.
- Pricing page (CTA links to `#early-access` for now).
- A separate Frameworks page — section 2 is enough until we have more to say.
- Real product screencasts — all animations are polished mockups until the product is end-to-end stable.
- Localisation. Page ships in English only. Hindi / regional language support is a later spec.

---

## 8. Acceptance criteria

1. Homepage renders the 7 sections in the order above, with no references to the deprecated `Features`, `Agentic`, `ComingSoon`, or old `Hero` / `HowItWorks` / `Frameworks` components.
2. Findings ticker loops smoothly on desktop and mobile; no layout shift on first frame.
3. `SeeItCatch` section plays its 12s sequence, and the framework panel on the right highlights the three matching controls in the correct order within 200ms of the left-side badges lighting up.
4. Comparison table is fully keyboard-navigable and readable at 320px width (horizontal scroll permitted only as a last resort).
5. With `prefers-reduced-motion: reduce`, every animated component shows its final static frame — no motion, no layout jitter.
6. Lighthouse (mobile, throttled 4G): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
7. Early-access form submits successfully to the existing backend and shows the inline confirmation state.
8. No console errors or hydration warnings in dev or production build.
