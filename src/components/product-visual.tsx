import Image from "next/image";
import { products, type Product } from "@/data/products";

export function hasOwnPhotography(p: Product) {
  return p.slug === "skinseal" || p.slug === "skinseal-veterinary";
}
export function ProductVisual({
  product: p,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const index = products.findIndex((item) => item.slug === p.slug) + 1;
  if (hasOwnPhotography(p))
    return (
      <div
        className={`product-artwork product-artwork-${p.category.toLowerCase()}`}
      >
        <div className="artwork-header">
          <span>{p.category} / Original packaging</span>
          <span>0{index}</span>
        </div>
        <Image
          className="pack-shot"
          src={p.image!}
          alt={p.imageNote}
          width={p.category === "Veterinary" ? 1600 : 1193}
          height={p.category === "Veterinary" ? 712 : 595}
          sizes="(max-width: 760px) 90vw, 45vw"
          preload={priority}
        />
        {p.slug === "skinseal" && (
          <Image
            className="applicator-shot"
            src="/images/products/original-applicator.webp"
            alt="Original blue SkinSeal applicator, reproduced from the supplied product catalogue"
            width={2419}
            height={451}
            sizes="(max-width: 760px) 85vw, 40vw"
          />
        )}
        <div className="artwork-footer">
          <span>{p.composition}</span>
          <span>{p.sizes.join(" / ")}</span>
        </div>
      </div>
    );
  return (
    <div className={`formulation-art formulation-${p.slug}`}>
      <div className="artwork-header">
        <span>SkinSeal / {p.category} range</span>
        <span>0{index}</span>
      </div>
      <div className="formula-name">
        <span>
          {p.category === "Dental"
            ? "Dedicated range"
            : "Topical skin adhesive"}
        </span>
        <strong>{p.name.replace("SkinSeal ", "").replace(" Range", "")}</strong>
        <p>{p.composition}</p>
      </div>
      <div className="formula-volume">
        {p.sizes.map((size) => (
          <span key={size}>{size}</span>
        ))}
      </div>
      <div className="artwork-footer">
        <span>Formulation overview</span>
        <span>Pack photography on request</span>
      </div>
    </div>
  );
}
