# SkinSeal — final website QA

Date: 16 November 2026. Baseline: `8729b43`. Working branch: `polish/production-qa`.

## Result and scope

The existing six-section design, navy/teal/white branding, six product families, routes, authentic product artwork, approved videos and PDF resources were retained. This pass made targeted reliability, accessibility, loading and interaction improvements. No project rebuild, asset deletion, Git push or deployment was performed.

**Local implementation and QA are complete. Full public-production sign-off remains pending:** real email delivery, verified video captions/transcripts, current product-document confirmation and the existing publication approval gate remain unresolved.

## Actual changes

| File | Change |
| --- | --- |
| `src/components/enquiry-form.tsx` | Require the API's explicit confirmation before success; preserve values on unexpected responses; replace raw non-JSON gateway errors with useful retry guidance; add a 20-second abort timeout and recovery; expose required fields and busy state to assistive technology. |
| `src/app/api/enquiries/route.ts` | Reject empty/whitespace-only provider message IDs instead of treating them as confirmation. Existing validation, body limit, origin check, honeypot and rate limit remain. |
| `src/components/navigation.tsx` | Make background page/header controls inert while the mobile menu is open. Restore their previous inert states on closing, navigation, resizing or unmounting. Retain focus trapping, Escape and desktop focus restoration. |
| `src/app/simple.css` | Separate product enquiry and comparison actions onto distinct rows with a 44px comparison target; style direct phone/email actions in the contact CTA. |
| `src/components/shared.tsx` | Use the clear “Enquire Now” product-card label; add verified phone/email links directly within the enquiry section. |
| `src/app/page.tsx` | Adjust hero responsive image sizing and use eager loading with high fetch priority for the measured largest-content image, following the installed Next.js guide. |
| `tests/api.test.ts` | Add malformed provider-confirmation coverage. |
| `tests/browser/production-qa.spec.ts` | Add ten browser checks for response contracts, gateway errors, required-field semantics, mobile background isolation, action spacing, buyer/distributor journeys, timeout/retry, inert restoration and the first-time mobile video/contact journey. |
| `scripts/capture-final-qa.mjs` | Repeatable screenshots and image/overflow/menu geometry checks for the production server. Output stays in ignored `.recovery/final-qa/`. |
| `docs/superpowers/plans/2026-11-16-production-qa.md` | Scope, checkpoint and execution record. |
| `FINAL_QA_REPORT.md` | This report. |

No product formulations, sizes, medical claims, testimonials, publication permissions, API credentials or production indexing settings were changed.

## Company materials and image audit

- Recursively re-inventoried `items/`: **17 files — 8 images, 7 PDFs, 2 MP4s**. Source metadata and sampled/rendered previews were refreshed using the existing inspection script; original artwork and the previous full inventory/approval records were reviewed. All **17 SHA-256 hashes match the original asset audit**, including after implementation.
- Genuine original SkinSeal carton front/back and veterinary carton remain correctly associated. Sources are 1193×595px front, 1244×555px back and 1600×712px veterinary. The authentic 2419×451px applicator comes from the company catalogue. Original assets remain unchanged.
- No authentic individual Plus/Adv/Adv Plus/Dental pack photographs were found. Their existing clearly labelled formulation summaries remain; another variant's packaging was not relabelled or fabricated.
- Both approved product-overview films retain the permission decision recorded in `MEDIA_INTEGRATION.md` and the latest approval entry in `CONTENT_REVIEW.md`. They are not described as real professional testimonials or verified outcomes. Generated presentation scenes are disclosed in the gallery.
- All seven public PDFs were SHA-256 matched to their corresponding company originals. Existing titles/product associations, View PDF, Download and request-only datasheet/variant-document paths remain available.
- Separate patient before/after imagery, third-party press portrait/article and inaccurate generated promotional posters remain excluded. No new publication permission was inferred. General healthcare imagery remains representative licensed stock; source/license records are in `ASSET_AUDIT.md`.
- Browser image checks passed; no visible broken images or document-level overflow in the screenshot measurements. Optional reverse packaging was expanded before checking its lazy image. The closed disclosure's unloaded image was initially reported by the screenshot helper; the helper was corrected to expand it and wait for image readiness.

## Commands executed

| Command | Final result |
| --- | --- |
| `npm run lint` | Pass |
| `npm run typecheck` (`tsc --noEmit`) | Pass |
| `npm test` | Pass — 10 unit/API tests, including additional malformed provider-ID assertions |
| `npm run build` | Pass — production pages and API route generated |
| `node node_modules/next/dist/bin/next start --port 3000` | Local production server used for browser/performance QA |
| `npx playwright test --workers=2` | Pass — **38 tests** |
| `node scripts/capture-final-qa.mjs` | Pass — **58 screenshots**, image readiness and geometry recorded |
| `git diff --check` | Pass |

The first new regression checks reproduced five gaps before fixes: unconfirmed success, raw gateway error text, missing native required semantics, interactive background content while the mobile menu was open, and adjacent enquiry/comparison controls. The API test also reproduced empty provider IDs being accepted. All now pass. A new navigation test initially raced a client-side transition; it was corrected to wait for the Products URL before going Back. A new test's HTMLElement type was corrected before final TypeScript/build verification.

## Functional coverage

| Journey / area | Verified behavior |
| --- | --- |
| Doctor | Homepage → Products → each of six details pages → enquiry; each product is preselected correctly. |
| Hospital buyer | Products → comparison → request information for SkinSeal Adv Plus → matching enquiry selection. Six visible table rows require no tab switching. |
| Dentist | Dental card/details render correctly and dental enquiries select the dedicated range. |
| Distributor | Homepage navigation → Contact → Distributor business enquiry; disabled loading state and explicit-confirmation feedback tested with a controlled API response. This is **not** proof of real email delivery. |
| First-time visitor | At 320px: explanation → Products → return Home → featured video actually plays with native controls → Contact/enquiry. Dialog fits the viewport. |
| Form failures | Client errors/consent, required-only submission, actual missing-configuration failure, malformed HTTP 200, non-JSON gateway error and virtual-clock 20-second timeout/retry. Values are retained after failures. |
| Server | Validation, honeypot, foreign origin, unsupported content type, capped/chunked body, rate limiting and provider acceptance/rejection/malformed confirmation/timeout. Provider responses are mocked in unit tests. |
| Navigation | Desktop links, active state, mobile opening, focus trapping, Escape, product links, menu close, resize restoration and preservation of previously inert elements. |
| Media | Both real MP4 files play on demand; no initial video download, native controls, dialog dismissal and focus restoration. All seven PDF responses contain real PDF bytes; all public copies match originals. |
| Routes / SEO | Unique titles/canonicals, Open Graph metadata, sitemap, robots, valid internal links, unavailable private originals and unknown-product 404. No unexpected route-check console/page errors. Canonical origin remains the existing `https://skinseal.in`; confirm the intended launch domain before publishing. |

## Responsive and visual checks

- **17 content routes × 9 widths = 153 route/viewport combinations:** 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920px. No document-level horizontal overflow. The comparison table intentionally scrolls inside its labelled region.
- Homepage still has exactly six direct sections and all six product families visible. Cards retain 3/2/1 product columns, consistent imagery areas and direct actions.
- Automated WCAG A/AA scans on all 17 content routes at 390px and 1440px: **no configured violations**. Keyboard/focus, required-state, reduced-motion CSS and native video controls were also reviewed. Automated checks are not complete accessibility certification.
- Captured 11 major routes at 320, 390, 768, 1024 and 1440px (55 screenshots), plus expanded-menu screenshots at 320×480, 375×667 and 768×430. Final geometry JSON shows no overflow or broken visible images.
- Visually reviewed 320/768/1440 contact sheets across all eleven routes; separately inspected small-screen form fields, homepage video/contact/footer, tablet comparison/contact/footer and compact/landscape menus. Existing representative desktop/mobile browser screenshots were also retained.
- Independent source review found no blocking issue. Suggested timeout/retry and pre-existing-inert restoration tests were added and pass.

## Measured Lighthouse results

Lighthouse **12.8.2**, local optimized production homepage, headless Chrome, simulated Lighthouse throttling. These are individual laboratory runs, not live Vercel or field measurements. Scores vary by run/environment.

| Profile | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Baseline mobile | 91 | 100 | 100 | 69 |
| Final mobile | **94** | **100** | **100** | **69** |
| Final desktop | **100** | **100** | **100** | **69** |

Final mobile: FCP 0.9s, LCP 3.0s, total blocking time 20ms, CLS 0. Final desktop: FCP 0.2s, LCP 0.7s, total blocking time 0ms, CLS 0.

Performance/Accessibility/Best Practices targets were met in these runs. **The SEO target was not met:** the existing `SITE_APPROVED` gate intentionally emits `noindex, nofollow` and blocks crawling until launch approval. This was preserved; approval was not inferred merely to improve a score. Results are in `.recovery/qa-baseline-mobile.json`, `.recovery/qa-final-mobile.json` and `.recovery/qa-final-desktop.json`.

## Remaining unverified / launch requirements

1. **Actual email delivery is unverified.** Configure server-side `RESEND_API_KEY`, a verified-domain `ENQUIRY_FROM_EMAIL`, `ENQUIRY_TO_EMAIL` and exact-origin `SITE_URL` using `.env.example`. Send an authorized real enquiry and confirm receipt before relying on live submissions. Without configuration, visitors receive an honest error and direct phone/email options.
2. **Verified captions/transcripts are unavailable** for the approved films. They were not invented. Full audio/frame-level clinical review relies on the existing owner approval record, not this technical QA pass.
3. Confirm current variant-specific IFUs, datasheets, formulation/size availability and permissions with the company. Obtain approved individual pack photos for the four families without them. Marketing films and generic documents do not replace exact-variant instructions.
4. Complete the existing content/legal/launch review before enabling `SITE_APPROVED=true`. Confirm canonical/production domain and environment settings. Shared/edge rate limiting for multi-instance deployment remains the pre-existing operational follow-up in `CONTENT_REVIEW.md`.
5. Tests used Chromium and local production. Real iOS/Safari/Firefox devices, assistive technologies, delivered emails and deployed Vercel/CDN performance were not independently verified. Both referenced live websites could not be fetched through the web tool in this session; the local site and recorded company materials were audited instead.

All changes remain local on the dedicated branch. No deployment authorization was assumed.
