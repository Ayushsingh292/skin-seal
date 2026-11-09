# Content review before launch

The website is a local development rebuild. No deployment has been performed. `SITE_APPROVED=false` defaults to noindex and robots disallow. Do not turn it on until the owner approves launch content.

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
5. Provide authentic individual Plus, Adv, Adv Plus and Dental packaging photography. Until then their cards and pages explicitly identify the original SkinSeal family packaging as a reference image.
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

No clinical media/document approval records have been supplied. Company packaging and brand artwork are used within the user’s express authorization to preserve and integrate authentic company assets. Everything requiring separate publication authorization remains withheld.
