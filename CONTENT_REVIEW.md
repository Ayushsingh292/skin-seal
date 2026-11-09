# Content review before launch

The website is a local development rebuild. This agent has not deployed it. `SITE_APPROVED=false` defaults to noindex and robots disallow. Do not turn it on until the owner approves launch content.

## Verified basis

- Official homepage https://skinseal.in/ retrieved directly on 9 November 2026. It identifies the four medical families and compositions, medical 0.25/0.50 mL sizes, dental 0.25 mL variants, veterinary 0.50 mL, company phone and email.
- Supplied original SkinSeal and SkinSeal Vet carton artwork confirms their formulations and pack sizes.
- Catalogue and insert identify Asepsis Marketing and the Janakpuri address. Company details agree across supplied materials.
- The original insert supports a conservative description of external application, approximated skin edges, polymer film and single-use supply. No quantitative outcome, superiority or regulatory claim is published.

## Required owner/clinical review

1. Confirm current company identity, address, email, phone, distributor status, full product names, composition, sizes and availability. This implementation uses the official range, not extra presentation-only sizes.
2. Supply the current manufacturer-approved IFU for EACH medical, dental and veterinary variant. Existing documents conflict: the presentation says 10–15 seconds, while guide/insert say 30–60 seconds. Broad intraoral and surgical claims also need reconciliation. No application timings are published on the site.
3. Approve final application descriptions and five-stage educational overview. The website explicitly requires professional assessment and product-specific instructions. Dental/veterinary indications are not inferred from the original medical insert.
4. Review sterility and single-use applicability for each variant. The homepage asterisk refers to the original source insert; the website avoids asserting comparative clinical benefit from nano silver.
5. Provide authentic individual Plus, Adv, Adv Plus and Dental packaging photography. The editorial redesign uses product-specific typographic formulation presentations for those variants, with `image: null` in the typed manifest. Original SkinSeal packaging is no longer repeated to represent them.
6. Review all seven source PDFs for clinical accuracy, current revision, copyright and distribution authorization. No PDFs are publicly downloadable yet; resource requests are functional. Catalogue references do not by themselves substantiate every marketing claim.
7. Both source videos remain withheld. One is explicitly AI-labelled and must not appear as a doctor testimonial. Obtain complete transcripts, review all frames/audio and verify publication permissions, clinical context and people/animal-treatment imagery before authorizing a public copy.
8. Do not publish the clinical before/after collage without documented patient authorization, contextual clinical review and verification that the result is authentic. Do not manipulate outcomes. The press article needs publisher reproduction rights and portrait authorization.
9. Review stock-photo licensing records and final crops. All photos are labelled representative; no endorsement or actual SkinSeal treatment is implied. The paediatric photo shows paediatric dental care as a representative healthcare setting.
10. Approve legal drafts: privacy, terms and disclaimer. Confirm responsible company entity, data processor/hosting details, retention periods, rights process, commercial terms, jurisdiction and any applicable obligations with counsel. Draft notices are visible, and legal pages remain noindex even if the global launch gate is enabled.
11. Configure Resend, verify the sending domain and review enquiry processing. Complete an authorized end-to-end delivery test using a company-controlled mailbox before launch. No actual email delivery has been tested without credentials.
12. Deploy behind a trusted proxy that strips client-supplied forwarding headers. The included in-process rate limit protects one server process; add edge/shared rate limiting for multiple instances and sustained public traffic. Approve a retention policy for provider logs and mailboxes.

## Content deliberately omitted

No invented professionals, quotes, endorsements, certifications, regulatory approvals, success rates, treatment outcomes, no-pain promises, superiority statistics, infection reduction, healing acceleration or scar-prevention claims. Generated promotional artwork is not used as evidence. No invented documents or video thumbnails are published.

## Publishing media after approval

Record reviewer, decision, date, product/variant, rights, consent, source revision and rationale here. Copy only the reviewed asset to `public/documents/` or `public/videos/`; create an appropriate non-graphic poster. Update `src/data/media.ts` with status `approved` and real paths. Verify PDF view/download, file size, video controls, aspect ratio, lazy loading, mobile playback, captions/transcript and keyboard dialog operation. The UI already supports approved entries but these media branches require testing with the actual approved files.

## Approval record

Superseded on 9 November 2026 for the two videos and seven PDFs: the owner explicitly confirmed rights, consent and clinical approval; see the current approval record below. Standalone patient imagery and third-party press remain excluded. Company packaging and brand artwork are used within the user’s express authorization to preserve and integrate authentic company assets. Everything requiring separate publication authorization remains withheld.

## Editorial redesign asset decision

Final refinement: publication status is unchanged after a fresh recursive source inspection. All six benefit descriptions and all five process descriptions are preserved verbatim. New process icons and the applicator image are product context, not clinical application instructions or evidence of outcomes. Source PDFs/videos remain unavailable for public view/download/playback until authorized; no permission was inferred from the request to improve access. The current enquiry delivery configuration requirement remains unchanged.

Reinspected all 17 original files and six representative frames from each video. The original catalogue contains a 2419 × 451-pixel authentic SkinSeal applicator image, now extracted and integrated as product artwork. It depicts no person or patient. Both videos still require full medical/rights review; sampled veterinary frames include a Veo watermark and a synthetic-looking presenter, so they must not be described as genuine clinician experiences without verification. No approval has been inferred from permission to inspect source files.

New interactive catalogue and process copy uses the same conservative, previously sourced facts. The professional-learning section is a demonstration request when no approved media exists; it does not display a false play button. The resource library preserves the real seven-document inventory, search, type filters and request context. Approved entries support View/Download, but none is currently approved.

## Current approval record - video/PDF integration, 9 November 2026

**Reviewer:** project owner, in this conversation. **Decision:** "I confirm rights, consent and clinical approval for full files", in response to the question specifically covering full videos, all PDFs, real clinical footage consent and clinical claims. **Scope:** both MP4s and seven PDFs in `items/`. This later explicit authorization supersedes the initial withholding decisions above for those nine files.

Both videos now have public compressed delivery copies, original audio, truthful promotional titles, AI disclosures and non-graphic posters. They appear on the homepage, `/clinical-experiences`, and the original or veterinary product page as appropriate. They are not represented as genuine clinician testimonials. The seven unchanged PDFs have working View/Download actions in the library and original-product references. The supplied PDFs are not asserted to be a newly certified/current revision for every variant. Conflicting application timings remain out of website instructions.

**Still pending:** verified video captions/transcripts; current product-specific IFU revisions; consent for the separate before/after image; third-party press reproduction; exact variant photography; email credentials/delivery validation; final legal and launch review. Global `SITE_APPROVED` has not been changed. Generated promotional PNGs are excluded where their product depictions differ from authentic packaging. Original `items/` remains unchanged.
