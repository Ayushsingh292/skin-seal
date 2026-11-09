# SkinSeal premium website

Premium editorial redesign of the SkinSeal professional product website using the existing Next.js 16.4.5 App Router, React 19.3, TypeScript, React Hook Form, Zod, Lucide and Motion for React. The design uses a deep-navy product hero, an interactive formulation catalogue, an editorial applications mosaic, a keyboard-operated closure journey and a searchable document index. Inter and Manrope are self-hosted variable fonts. No deployment has been performed.

## Run locally

Node.js 20.9+ required (verified here with Node 22.16 and npm 10.9).

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production run:

```bash
npm run build
npm start
```

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npx playwright install chromium
# Run against a running production server on port 3000:
npm run test:e2e
```

Browser checks cover all 17 content/product routes, metadata, images, local navigation, all nine requested viewport widths, filters, keyboard FAQ, mobile focus and Escape, form validation and missing-delivery feedback, API rejection paths, unapproved-media gating, unknown products and automated WCAG checks. Screenshots go to ignored `.recovery/`; Playwright reports go to ignored `playwright-report/`. Automated checks do not establish full WCAG conformance. See `VERIFICATION.md` for measured results and limits.

The editorial suite also covers formulation-tab arrow navigation, absence of false variant packaging, process-step Home/End navigation, document-search request context, and horizontal desktop navigation with a substantial product menu.

## Routes and source

- `/`, `/about`, `/products`, all six `/products/[slug]` routes, `/applications`, `/why-skinseal`, `/clinical-experiences`, `/resources`, `/contact`, `/privacy-policy`, `/terms`, `/disclaimer`.
- `src/data/products.ts`: typed product descriptions, compositions, sizes and explicit image-reference notes.
- `src/data/applications.ts`, `src/data/site.ts`: application areas, navigation and company details.
- `src/data/media.ts`: typed document/video publication manifest.
- `src/components/product-catalogue.tsx`, `closure-journey.tsx`: accessible interactive product and process experiences, using lightweight Motion `LazyMotion`/`m` features and reduced-motion preferences.
- `src/components/product-visual.tsx`: genuine original/Vet pack imagery and distinct typographic presentations for variants without photographs.
- `src/components/resource-library.tsx`: search, document-type filtering, genuine inventory metadata, and approval-aware resource actions.
- `src/components`: shared editorial layout, navigation, form and approval-aware video gallery.
- `src/lib/validations.ts`: shared client/server enquiry schema.
- `src/app/api/enquiries/route.ts`: server-only Resend delivery integration.
- `public/images`: local, optimized packaging/brand assets and representative Pexels photography.
- `items/`: unchanged original company materials; never served as public assets.

## Email setup

Copy `.env.example` to `.env.local`; do not commit real credentials.

1. Create/configure a Resend account and verify the company sending domain.
2. Set `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL` and `ENQUIRY_TO_EMAIL`.
3. Set `SITE_URL` to the exact site origin (no trailing slash); locally use `http://localhost:3000`. If unset, the handler compares Origin to the request URL origin.
4. Restart the server. Perform an authorized delivery test with a company-owned recipient before launch.

Missing credentials return HTTP 503 and direct contact details. Failed provider calls return a delivery error; no success is simulated. Only a provider-accepted email with a delivery identifier returns success. That confirms provider acceptance, not inbox delivery. The handler uses text-only email content, input limits, a consent requirement, honeypot rejection, same-origin checks, a 20 KB request limit, provider timeout and an in-process five-attempt/ten-minute IP-hash limit. It stores no enquiry database and does not log form contents.

Deploy behind a trusted proxy that overwrites forwarding headers. Add shared/edge rate limiting before scaling across processes; in-memory limits reset on restart. Configure appropriate host-level body-size and network controls for public traffic. Enquiry emails and provider logs need an approved company retention policy.

## Media and launch review

Read [ASSET_AUDIT.md](ASSET_AUDIT.md) and [CONTENT_REVIEW.md](CONTENT_REVIEW.md) before publishing. The original SkinSeal and veterinary carton artwork is integrated. The supplied catalogue's original 2419 × 451px applicator artwork is also integrated without recreating the product. Four other families use product-specific typographic formulation presentations with `image: null`; no one product's packaging is assigned to another formulation. Representative clinical photographs were refreshed from the documented licensed sources at 1600px wide.

All seven PDFs and both videos remain withheld pending medical/rights review. No public-safe authorization for these was supplied, and application instructions conflict between sources. Resources therefore offer functional document requests. No clinical testimonials, patient outcomes or AI presenter videos are published. The video player and PDF view/download UI support approved entries once genuine reviewed assets and manifest paths are provided; those branches must be tested with the final approved files.

To release a document, record approval in `CONTENT_REVIEW.md`, copy the vetted file into `public/documents`, and set its manifest status and `href`. For videos, also provide a lightweight non-graphic poster, captions/transcript as needed, `src`, product association and accurate description. Recheck performance, mobile controls, dialog focus and resource downloads. Never serve originals directly from `items/`.

All pages default to `noindex` and `robots.txt` disallows crawling while `SITE_APPROVED` is not `true`. Legal pages visibly retain development-draft notices and independent noindex metadata. Approve and replace these drafts before launch; then adjust their metadata and the launch gate. Changing the environment variable does not grant deployment authorization.

## Recovery record

Initial commit: `66b2133` (Create Next App). At task start every tracked file had been deleted; only `items/` remained. Git branches/reflog contained no prior finished site. The starter was restored after preserving the deleted-file state.

Branch: `skinseal-premium-rebuild`.

Current visual-redesign branch: `skinseal-editorial-redesign`, based on `35fcbfa`. The starting code and uncommitted state were preserved in `../skinseal-editorial-checkpoint-20261109/` with a repository bundle, working-tree patch and source-file hashes. Original `items/` remains untracked and unchanged; no source material was removed. The previous full asset backup remains in the earlier checkpoint.

Safety checkpoint outside the repository: `../skinseal-safety-20261109/`, containing `repository.bundle`, `working-tree.patch`, `items-sha256.json` and a full `items/` backup. The patch preserves the initial deletions. No reset, clean, force push or environment-file removal was used. Source hashes in the audit allow comparison. Git restore was used only for files verified absent and preserved by that checkpoint.

## Asset attribution

Company assets: supplied SkinSeal packaging and catalogue logo. Representative photography: Pexels, under https://www.pexels.com/license/; individual sources are in the asset audit. No endorsement is implied. Fonts: Google Fonts official repository, licensed under OFL; license files are in `public/fonts/`.

Optional asset/review utilities in `scripts/` use Python with Pillow/PyMuPDF/OpenCV for source inspection, or the existing Playwright browser dependencies for local screenshots/accessibility diagnostics. Python is not required to install, run or build the website. Inspection outputs are saved only under ignored `.recovery/redesign/`.
