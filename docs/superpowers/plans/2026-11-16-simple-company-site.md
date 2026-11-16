# Simple SkinSeal Company Website Implementation Plan

**Goal:** Implement the user's supplied six-section redesign within the existing Next.js repository, locally only.
**Architecture:** Retain routes, verified data, media delivery, enquiry API and design tokens. Replace the homepage selector and catalogue rows with shared visible cards; simplify navigation and internal page copy. Keep detailed process/FAQ content on existing dedicated pages.
**Tech stack:** Next.js 16.4.5, React, TypeScript, existing CSS and Playwright.
**Spec:** User's FINAL WEBSITE REDESIGN brief in this session.

## Constraints and decisions
- Existing working branch created at baseline `1d1993e`: `redesign/simple-company-site`; only pre-existing untracked content is `items/`.
- Work in this checkout as requested. No deployment, push, destructive Git operation or changes to original assets.
- User supplied the design and explicitly requested implementation now; execute without an additional design approval gate.
- Reuse approved media per MEDIA_INTEGRATION.md. Videos are product overviews, not verified clinician testimonials. No new medical claims.
- Authentic original and veterinary photos; clearly labelled formulation summaries for other variants.

## Tasks
- [x] Record baseline browser screenshots and inspect existing routes; verify all 17 source hashes against prior audit.
- [x] Add meaningful regression checks for six homepage sections, visible product discovery, comparison and optional form fields; observe failures.
- [x] Simplify header to six links with preserved accessible mobile navigation; implement six homepage sections and shared product/application cards.
- [x] Add always-visible comparison, clear internal copy and a named videos route; preserve old gallery route with redirect.
- [x] Make organization and profession optional; add optional city through validation, form and delivered email. Preserve security, loading and honest failure handling.
- [x] Run unit/API tests, lint, typecheck, build; run browser journeys, media, PDFs, accessibility and nine-width responsive checks. Inspect screenshots and fix observed defects.
- [x] Document actual results, media decisions and remaining delivery/caption/launch requirements.

## Review focus
Optional blank form values; client navigation between product enquiries; mobile focus and breakpoint changes; no video downloads before play; readable cards and no overflow at 320px; old route and sitemap consistency.

## Final verification
All tasks complete. See docs/SIMPLE_REDESIGN_REPORT.md for 28 passing production browser tests, 10 unit/API tests, build/lint/typecheck, independent review and remaining launch requirements. No deployment or original asset modifications.
