# SkinSeal editorial redesign

## Intent and visual audit

The previous implementation is functional but uses a tilted carton hero, overly small text, repeated six-card grids, the same carton image for four missing variants, a simple dropdown and several empty-looking light sections. Preserve server validation, publication gates, metadata, navigation focus handling and verified content. Recompose the entire visual experience.

## Direction

“Precision, made tangible”: deep-ink hero, oversized editorial typography, a clean white product stage with authentic carton/applicator imagery, vivid clinical-blue details, numbered indexes, generous but purposeful margins and documentary photography. No fake product renders, invented clinical claims or fabricated testimonials.

The user explicitly requested implementation without stopping for a design discussion. This document records implementation choices under that authorization.

## Approach

1. Minor CSS refresh rejected: would preserve the repetitive composition the user identified.
2. Full application replacement rejected: working forms, routes and safety controls are valuable.
3. Selected: replace visual components and page compositions inside the existing application, retaining validated behaviour and source data.

## Work plan

- [x] Re-enumerate all source files; read PDF text, inspect scanned pages and video frames; extract only genuine non-person product artwork. Update ASSET_AUDIT.md without modifying originals.
- [x] Rebuild homepage with dark editorial hero, product stage, asymmetrical brand story, interactive formulation catalogue, editorial applications mosaic, cinematic professional-learning section, process stepper and document index.
- [x] Redesign desktop navigation as a substantial product menu; preserve keyboard/mobile focus and route behaviour.
- [x] Replace repeated variant images with product-specific typography. Use original and veterinary cartons only for their own products; include exact composition/sizes and linked details for every family.
- [x] Extend the design system to all interior routes, product pages, resources, clinical learning and contact. Retain all enquiry validation/delivery safeguards.
- [x] Add lightweight Motion for React interactions with reduced-motion support; keep primary content server-rendered and the hero image immediately visible.
- [x] Verify lint, types, unit/API tests, build, every route, all requested widths, focus interactions, media gates and accessibility. Capture and visually inspect screenshots and measure Lighthouse.

## Final verification

Lint, TypeScript, production build, 9 unit/API tests and 16 production browser checks passed. No overflow in 153 route/width combinations. 34 automated accessibility scans passed. Independent review reported no actionable findings. Final mobile Lighthouse: Performance 92, Accessibility 100, Best Practices 100, SEO 69 (intentionally blocked from indexing pending launch approval). Source hashes match for all 17 original items. See VERIFICATION.md for limits and outstanding publication/configuration requirements. No deployment performed.

## Media boundary

Inspection permission is not proof of patient/clinician consent or clinical approval. Both videos and all seven PDFs require review under the existing audit. No source approval records have been supplied. Build polished publication-aware components, document exact blockers and do not simulate video playback or document downloads. Typographic product presentations are explicitly permitted when exact variant photography is absent.

## Review focus

No repeated original carton masquerading as a variant; no unpublished media leaks; tabs and stepper work by keyboard; mobile menu preserves focus; all products and document requests remain reachable; no overflow at 320–1920px; no fake enquiry success; legal drafts and noindex remain intact.
