# Verification report

Verified locally on 9 November 2026, Windows, Node 22.16.0 / npm 10.9.2. No hosting registration, remote push or deployment was performed.

## Results

| Check | Result |
|---|---|
| `npm install motion` | Passed; Motion for React added to the existing stack |
| `npm run dev` | Started successfully; redesigned homepage served on port 3000 |
| `npm run lint` | Passed, no lint errors |
| `npm run typecheck` | Passed |
| `npm test` | 9/9 validation and API tests passed |
| `npm run build` | Passed, all requested routes generated |
| `npm run test:e2e` | 16/16 browser checks passed, final production run 37.0 seconds |
| `git diff --check` | Passed; only Git line-ending normalization notices |
| Original source integrity | All 17 `items/` files match checkpoint SHA-256 hashes |

Browser checks used headless Playwright Chromium. All 17 content/product routes returned 200, had one H1, unique titles and correct canonicals. All rendered images loaded; internal links were requested and returned 200. No browser JavaScript exceptions or console errors were recorded in the route sweep. Unknown product slugs returned 404. Sitemap and robots endpoints returned 200.

Overflow was checked across all 17 pages at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920 pixels: 153 page/width combinations passed. This is a document-overflow check, not a claim of exhaustive visual inspection at every width.

Automated axe WCAG 2 A/AA, WCAG 2.1 A/AA and applicable WCAG 2.2 AA checks passed on all 17 routes at 390 and 1440 pixels: 34 scans, no reported violations. Keyboard tests cover mobile menu expansion, focus wrapping, Escape focus restoration, desktop product disclosure Escape, product filtering and FAQ interaction. Full manual assistive-technology testing has not been performed; automated results do not establish WCAG certification.

New editorial tests verify formulation-tab arrow navigation and matching content; no false variant pack image in the Plus panel; stable catalogue height while switching all four medical formulations; process-step End navigation; resource search and correct enquiry prefill; horizontal desktop navigation at 1280px and composition information in the product menu. The product-filter count is decorative for assistive technology, keeping its accessible name clear.

Form tests cover client errors and consent, query-based product selection, retained input after failure, server rejection of invalid/foreign-origin/type/honeypot/oversized requests, capped streaming reads, phone digit validation, rate-limit rejection and missing-credentials failure. Provider acceptance, rejection, unconfirmed response and connection-error branches are tested with a local fetch stub; no actual email was sent. Resend credentials and an authorized mailbox test are still required.

## Measured Lighthouse result

Redesigned production homepage on localhost, Lighthouse 12.8.2, Headless Chromium 158, mobile form factor, simulated throttling. Final recorded report: `.recovery/redesign/lighthouse-final.json`.

| Category | Measured score |
|---|---:|
| Performance | 92 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 69 |

FCP 0.9 s; LCP 3.3 s; Total Blocking Time 60 ms; CLS 0; Speed Index 0.9 s. These are local lab results from the final measured run, not field performance guarantees. The sole failed SEO audit is intentional crawl blocking (`noindex, nofollow` and robots disallow) while company content and legal drafts await approval. No claim is made that the SEO target of 95 has been reached.

Runtime dependency audit: zero reported vulnerabilities in the production dependency set. Full development audit reports eight moderate advisories in the ESLint/typescript-eslint/minimatch toolchain. No incompatible automatic downgrade or forced dependency repair was performed.

## Independent review

A separate reviewer inspected the editorial redesign, product data, ARIA relationships, menu focus handling and publication gates. Targeted browser probes covered home, products, resources and dental detail at 320/768/1180/1920px. No actionable findings, overflow, browser errors or publication bypasses were reported. The existing validated enquiry backend was preserved. The documented trusted-proxy and per-process rate-limit deployment constraints remain.

Visual/browser review corrected low-contrast text on tinted surfaces and a formulation-switch height jump (a failing regression test measured 144px before correction). Screenshots were captured for the redesigned home at 390/768/1440 pixels; desktop product catalogue, Plus detail, About, resources and contact; and desktop/mobile initial viewports. Full screenshots and reports are in ignored `.recovery/redesign/`; HTML test report is in ignored `playwright-report/`.

## Launch limitations

- Both source videos and all seven PDFs remain unapproved and publicly inaccessible. Actual video playback and PDF download cannot be reported as tested with approved media. Gallery/player and resource actions are implemented for future approved files; currently the UI provides genuine product/document/demo enquiries.
- No fabricated clinical testimonials, AI clinician endorsements, outcomes or certifications have been used.
- Exact Plus/Adv/Adv Plus/Dental packaging photography was unavailable. These now use distinct typographic formulation presentations and `image: null`; the original carton is not repeated to represent them.
- Legal pages are visible development drafts requiring owner/legal review. All pages are protected from indexing by default, and no deployment was performed.
- Real email delivery, approved-file video/PDF behaviour, captions, Safari/Firefox and real-device assistive technology remain to be verified before launch.

See `CONTENT_REVIEW.md` for the full approval and configuration checklist.
