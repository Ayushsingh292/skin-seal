# SkinSeal simplified company website

16 November 2026. Local branch: `redesign/simple-company-site`, starting at `1d1993e`. No push or deployment. Original `items/` remains untouched and untracked as it was at the start.

## Implemented

- Homepage reduced from ten to exactly six major sections: clear product hero, all six product families, six concise characteristics, seven application categories, one featured product video, and contact/enquiry.
- Preserved deep navy, teal, self-hosted typography, authentic packaging/applicator imagery and the existing Next.js application.
- Header now exposes Home, Products, Applications, About Us, Resources and Contact on desktop, with active indicators and a prominent enquiry link. Preserved mobile focus trapping, Escape dismissal, product links and breakpoint focus restoration; removed the desktop mega menu.
- Shared product cards show category, formulation, listed sizes, details and product-specific enquiries. All six are visible without tabs or filtering; 3/2/1 columns on desktop/tablet/mobile.
- Products page includes an always-visible formulation comparison table. Narrow screens scroll the table within its labelled container.
- Product pages prioritize image, overview, formulation/sizes, product information, applications and documentation. Retained original reverse packaging in an optional disclosure, approved related video players, resource references and requests for variant-specific documents. Removed repeated galleries and marketing sections.
- Applications page uses consistent image cards, readable copy and direct enquiries. About, Resources, Contact and Why SkinSeal headings use clearer language. Detailed process and FAQ remain on Why SkinSeal.
- Added `/videos`, accessible from homepage, Resources and footer. `/clinical-experiences` redirects to it. Updated sitemap; retained other useful routes.
- Resources retains all seven approved View/Download PDF actions, search and categories; added a direct datasheet/document request action.
- Contact requires name, email, phone, product and message, plus consent. Organization/profession are now optional; added optional city to validation and delivered email. Product enquiries preselect the product and remount correctly on query changes. Document requests name the exact selected variant.
- Preserved real API submission, loading/error/success feedback, honeypot, origin/body checks, rate limiting and provider-response verification. No fake success or local pretend inbox.

## Company assets

Recursively inventoried all 17 files in `items/` using `scripts/inspect_redesign_assets.py`. Read existing asset/approval records; inspected image contact sheets, PDF contents/rendered previews and sampled frames of both videos. Recomputed source SHA-256 hashes: **17/17 match the original ASSET_AUDIT.md inventory**.

- Original carton front/back, 0.25 mL product presentation, catalogue-derived logo/applicator and veterinary 0.50 mL carton remain in use. Supplied high-resolution artwork takes priority over the old low-resolution website thumbnails.
- No authentic individual Plus/Adv/Adv Plus/Dental pack photographs were found. Their cards explicitly use formulation overviews with pack photography available on request; no invented or relabelled packaging.
- Both existing optimized videos and seven byte-identical PDF delivery copies retain the approval decision recorded in MEDIA_INTEGRATION.md. The homepage features only the original-product overview; the gallery offers both films with native controls, no autoplay and no eager media download.
- The gallery describes generated presentation scenes and distinguishes these overviews from verified clinical experiences/testimonials.
- Patient before/after image, third-party press portrait/article, generated promotional posters with inaccurate packaging and the small product-list poster remain excluded. Required permissions/review and publication suitability remain recorded in ASSET_AUDIT.md.
- Existing licensed representative healthcare stock photographs remain labelled as settings, not SkinSeal outcomes or endorsements. Source/license records are in ASSET_AUDIT.md.

## Executed verification

Final source checks and production build:

```text
npm run lint       PASS
npm run typecheck  PASS
npm test           PASS — 10 tests
npm run build     PASS — all routes generated
npx playwright test --workers=2
                  PASS — 28 tests against next start at http://localhost:3000
git diff --check   PASS
```

Browser coverage includes:

- Six homepage sections, six visible products, authentic photograph/placeholder distinctions, comparison and all six product-detail-to-enquiry journeys.
- Exact variant documentation requests, form validation, optional profile fields and honest unconfigured-delivery feedback. Provider acceptance/rejection/timeout are covered with mocks in API tests; no real email was delivered.
- Mobile menu keyboard focus, Escape, product navigation and desktop breakpoint restoration.
- Both real MP4 files playing on demand; focus restoration and no video download before playback. All seven real PDFs returned valid PDF bytes; private originals remain inaccessible.
- 17 content routes at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920px: no document-level horizontal overflow.
- Same routes at 390 and 1440px: no violations in the configured automated WCAG A/AA checks. These checks do not establish complete accessibility compliance.
- Unique titles/canonicals, internal link responses, images (including expanded optional packaging), unknown-product 404, sitemap/robots and no unexpected browser console/page errors during route checks.
- Screenshot captures under ignored `.recovery/`: homepage at five widths, product/contact layouts, and application/about/video pages. Desktop and 320/390px home compositions and application layout were visually reviewed.
- Independent code review found an inherited application image order/width issue. A geometry regression test reproduced it, the CSS fix passed, and reviewer verification confirmed full-width photographs above copy for all seven cards. Production QA also found and corrected document-number contrast.

The first production QA attempt on a different origin was rejected by the existing origin check. Final QA used the configured localhost origin without weakening the API. The image test was updated to expand optional packaging before expecting a lazy-loaded image to load.

## Outstanding before live use

1. Configure `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL` on a verified sending domain, `ENQUIRY_TO_EMAIL`, and `SITE_URL` matching the exact deployed origin (see `.env.example`). Verify real delivery in the intended environment. Without these, the website truthfully reports that online delivery is unavailable and offers phone/email contact.
2. Obtain verified captions/transcripts for the approved videos; they were not supplied or fabricated. The videos are product overviews, not a substitute for exact-variant application training.
3. Obtain high-resolution approved packaging photos and current IFUs/datasheets for the remaining variants. Confirm current formulation/size availability and document revisions with the company. Existing source documents have differing timings; no timing promises were added.
4. Preserve existing publication approvals and complete the launch/content review in CONTENT_REVIEW.md. `SITE_APPROVED` was not changed. Deployment remains subject to the owner's authorization.

The 30-second discovery target is a design objective, not a measured usability result. No Lighthouse performance score or manual assistive-technology certification was claimed. Referenced live sites could not be retrieved through the web tool during this session; the local running site, repository evidence and prior source audit were used for implementation and QA.
