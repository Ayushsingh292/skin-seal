# Verification report

Verified locally on 9 November 2026, Windows, Node 22.16.0 / npm 10.9.2. No hosting registration, remote push or deployment was performed.

## Results

| Check | Result |
|---|---|
| `npm install` | Passed; existing stack restored and compatible dependencies installed |
| `npm run dev` | Started successfully; homepage returned HTTP 200 (port 3001 while production occupied 3000) |
| `npm run lint` | Passed, no lint errors |
| `npm run typecheck` | Passed |
| `npm test` | 9/9 validation and API tests passed |
| `npm run build` | Passed, all requested routes generated |
| `npm run test:e2e` | 11/11 browser checks passed, final run 35.7 seconds |
| `git diff --check` | Passed; only Git line-ending normalization notices |
| Original source integrity | All 17 `items/` files match checkpoint SHA-256 hashes |

Browser checks used headless Playwright Chromium. All 17 content/product routes returned 200, had one H1, unique titles and correct canonicals. All rendered images loaded; internal links were requested and returned 200. No browser JavaScript exceptions or console errors were recorded in the route sweep. Unknown product slugs returned 404. Sitemap and robots endpoints returned 200.

Overflow was checked across all 17 pages at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920 pixels: 153 page/width combinations passed. This is a document-overflow check, not a claim of exhaustive visual inspection at every width.

Automated axe WCAG 2 A/AA, WCAG 2.1 A/AA and applicable WCAG 2.2 AA checks passed on all 17 routes at 390 and 1440 pixels: 34 scans, no reported violations. Keyboard tests cover mobile menu expansion, focus wrapping, Escape focus restoration, desktop product disclosure Escape, product filtering and FAQ interaction. Full manual assistive-technology testing has not been performed; automated results do not establish WCAG certification.

Form tests cover client errors and consent, query-based product selection, retained input after failure, server rejection of invalid/foreign-origin/type/honeypot/oversized requests, capped streaming reads, phone digit validation, rate-limit rejection and missing-credentials failure. Provider acceptance, rejection, unconfirmed response and connection-error branches are tested with a local fetch stub; no actual email was sent. Resend credentials and an authorized mailbox test are still required.

## Measured Lighthouse result

Production homepage on localhost, Lighthouse 12.8.2, Headless Chromium 158, mobile form factor, simulated throttling. Final recorded report: `.recovery/lighthouse-release.json`.

| Category | Measured score |
|---|---:|
| Performance | 91 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 69 |

FCP 0.9 s; LCP 3.4 s; Total Blocking Time 90 ms; CLS 0; Speed Index 1.0 s. These are local lab results from the final measured run, not field performance guarantees. An earlier run scored 93 for performance; local timing varies. The sole failed SEO audit is intentional crawl blocking (`noindex, nofollow` and robots disallow) while company content and legal drafts await approval. No claim is made that the SEO target of 95 has been reached.

Runtime dependency audit: zero reported vulnerabilities in the production dependency set. Full development audit reports eight moderate advisories in the ESLint/typescript-eslint/minimatch toolchain. No incompatible automatic downgrade or forced dependency repair was performed.

## Independent review

A separate reviewer inspected the source and ran targeted probes. Findings fixed: punctuation-only phone numbers, desktop dropdown focus loss, and full-body reading before the size cap. Regression tests reproduced the issues and passed after correction. The documented trusted-proxy and per-process rate-limit deployment constraints remain. No publication-gate bypass was found.

Visual review also found and corrected the font-variable scope fallback and refined minor-wound photography. Screenshots were captured for home at 390/768/1440 pixels, desktop product/contact pages, and desktop/mobile initial viewports. Full screenshots and reports remain in ignored `.recovery/`; HTML test report is in ignored `playwright-report/`.

## Launch limitations

- Both source videos and all seven PDFs remain unapproved and publicly inaccessible. Actual video playback and PDF download cannot be reported as tested with approved media. Gallery/player and resource actions are implemented for future approved files; currently the UI provides genuine product/document/demo enquiries.
- No fabricated clinical testimonials, AI clinician endorsements, outcomes or certifications have been used.
- Exact Plus/Adv/Adv Plus/Dental packaging photography was unavailable. Shared original-family packaging is clearly labelled.
- Legal pages are visible development drafts requiring owner/legal review. All pages are protected from indexing by default, and no deployment was performed.
- Real email delivery, approved-file video/PDF behaviour, captions, Safari/Firefox and real-device assistive technology remain to be verified before launch.

See `CONTENT_REVIEW.md` for the full approval and configuration checklist.
