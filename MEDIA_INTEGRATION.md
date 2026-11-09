# Company media integration

9 November 2026. Branch: `skinseal-media-integration`, based on `33e681a`.

## Published materials

The owner explicitly confirmed publication rights, real-footage consent and clinical approval for both complete videos and all seven PDFs in this conversation. That decision supersedes the earlier review-required manifest entries for these nine files. It does not constitute an independent verification of clinical claims by the implementer.

- Complete AI brand film, including original audio: homepage, promotional gallery and original SkinSeal product page. Explicit AI/generated-presenter disclosure.
- Complete veterinary film, including original audio: homepage, promotional gallery and veterinary product page. Explicit generated-scenes disclosure.
- Seven genuine PDFs: searchable/filterable resource library and original SkinSeal product references, with working View and Download actions.
- Genuine catalogue cover: featured resource preview, rendered directly from the supplied PDF.
- Existing authentic logo, carton and applicator imagery remains integrated.

Films use lightweight posters, click-to-insert players, `preload="none"`, native controls, inline mobile playback and no autoplay. Portrait footage is contained without distortion. Dialog closing pauses/unmounts the player and returns focus. Fullscreen and volume use native video controls where the browser supports them. Video descriptions distinguish promotional communication from verified clinical experiences.

Delivery copies total 30,217,457 bytes versus 96,803,327 source bytes (approximately 69% smaller). H.264/AAC with MP4 fast-start; 480 x 864 brand delivery and 1280 x 720 veterinary delivery. No footage/audio was intentionally cut from these final copies. Seven PDFs are byte-identical to their originals.

Other generated posters with inaccurate packaging, the separate patient before/after image, third-party press portrait/article and small product-list image remain excluded for the reasons recorded in the audit. All 17 original source hashes match the pre-change checkpoint.

## Verification

- ESLint, TypeScript and production build passed.
- Nine unit/API tests passed.
- All 23 browser tests passed against a local production server, including both actual video playbacks, Escape/button dismissal, keyboard focus restoration, no eager video request and all seven genuine PDF responses.
- Existing responsive suite: 17 content routes at nine widths (153 combinations), no horizontal overflow.
- Existing automated accessibility suite: all 17 routes at 390 and 1440 pixels, no configured WCAG A/AA violations.
- Additional media check: five routes at nine widths (45 combinations), plus four accessibility scans on the resources/gallery pages; passed.
- Six media screenshots saved under ignored `.recovery/media-integration/`; gallery desktop, resource mobile and player mobile screenshots visually reviewed.
- No new Lighthouse score measured. Automated checks do not establish full WCAG compliance.

Initial testing exposed low-contrast film eyebrow text and a button accessible-name mismatch; both were fixed. The pre-existing image test mutated lazy-loading attributes before React hydration, causing test-induced warnings; it now scrolls images naturally.

## Remaining follow-up

Verified captions/transcripts were not supplied and have not been fabricated. Confirm current product-specific IFU revisions before treatment use; source documents contain differing timings, which remain out of website instructions. Email credentials/delivery testing and final legal/launch review remain as documented previously. `SITE_APPROVED` was not changed. Changes have not been pushed or deployed by this agent.

Optional media preparation: `python scripts/prepare_company_media.py` with ffmpeg, PyMuPDF and Pillow. Public delivery files are already included; these tools are not required by npm installation/build.

## Subsequent copy refinement

At the owner's request, public labels now read "Product video" and "SkinSeal product overview" rather than AI/promotional-film wording. Gallery descriptions and player copy use neutral product information. Source provenance remains recorded in the asset audit; no video is described as a genuine clinician endorsement or verified treatment outcome. Files and playback behavior are unchanged.
