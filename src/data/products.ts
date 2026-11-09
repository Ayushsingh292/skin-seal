export type Product = {
  slug: string;
  name: string;
  label: string;
  composition: string;
  sizes: string[];
  description: string;
  category: "Medical" | "Dental" | "Veterinary";
  image: string | null;
  imageNote: string;
  accent: string;
  applications: string[];
};
const referenceImage = "/images/products/skinseal.webp";
const referenceNote =
  "Product-specific formulation presentation. Exact variant photography is available on request.";
export const products: Product[] = [
  {
    slug: "skinseal",
    name: "SkinSeal",
    label: "The original formulation",
    composition: "N-Butyl-2-Cyanoacrylate",
    sizes: ["0.25 mL", "0.50 mL"],
    description:
      "A topical skin adhesive for appropriately selected superficial wounds and surgical skin closure.",
    category: "Medical",
    image: referenceImage,
    imageNote: "Authentic SkinSeal 0.25 mL packaging.",
    accent: "teal",
    applications: [
      "Selected superficial surgical incisions",
      "Appropriately assessed minor cuts and lacerations",
    ],
  },
  {
    slug: "skinseal-plus",
    name: "SkinSeal Plus",
    label: "Octyl formulation",
    composition: "2-Octyl Cyanoacrylate",
    sizes: ["0.25 mL", "0.50 mL"],
    description:
      "The octyl cyanoacrylate formulation in the SkinSeal topical adhesive family.",
    category: "Medical",
    image: null,
    imageNote: referenceNote,
    accent: "blue",
    applications: [
      "Professional skin closure, subject to the variant-specific Instructions for Use",
    ],
  },
  {
    slug: "skinseal-adv",
    name: "SkinSeal Adv",
    label: "Butyl + nano silver",
    composition: "N-Butyl-2-Cyanoacrylate + Nano Silver",
    sizes: ["0.25 mL", "0.50 mL"],
    description:
      "A butyl cyanoacrylate formulation with nano silver. Consult the product documentation for its intended use.",
    category: "Medical",
    image: null,
    imageNote: referenceNote,
    accent: "purple",
    applications: [
      "Professional skin closure, subject to the variant-specific Instructions for Use",
    ],
  },
  {
    slug: "skinseal-adv-plus",
    name: "SkinSeal Adv Plus",
    label: "Octyl + nano silver",
    composition: "2-Octyl Cyanoacrylate + Nano Silver",
    sizes: ["0.25 mL", "0.50 mL"],
    description:
      "An octyl cyanoacrylate formulation with nano silver, within the SkinSeal range.",
    category: "Medical",
    image: null,
    imageNote: referenceNote,
    accent: "amber",
    applications: [
      "Professional skin closure, subject to the variant-specific Instructions for Use",
    ],
  },
  {
    slug: "skinseal-dental",
    name: "SkinSeal Dental Range",
    label: "Dedicated dental variants",
    composition: "SkinSeal, Plus, Adv and Adv Plus dental variants",
    sizes: ["0.25 mL"],
    description:
      "A dedicated dental range. Request the exact variant’s indications and product information before selection.",
    category: "Dental",
    image: null,
    imageNote: referenceNote,
    accent: "blue",
    applications: [
      "Dental professional use according to the exact dental variant’s approved documentation",
    ],
  },
  {
    slug: "skinseal-veterinary",
    name: "SkinSeal Veterinary Range",
    label: "For veterinary practice",
    composition: "N-Butyl-2-Cyanoacrylate",
    sizes: ["0.50 mL"],
    description:
      "SkinSeal Vet is the dedicated veterinary product, intended for professional veterinary use.",
    category: "Veterinary",
    image: "/images/products/veterinary.webp",
    imageNote: "Authentic SkinSeal Vet 0.50 mL packaging.",
    accent: "teal",
    applications: [
      "Veterinary professional use according to the veterinary product documentation",
    ],
  },
];
export const findProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
