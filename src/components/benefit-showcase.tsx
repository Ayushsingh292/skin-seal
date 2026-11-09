import Image from "next/image";
import {
  Droplet,
  Sparkles,
  ShieldCheck,
  PackageCheck,
  Crosshair,
  Layers,
  Plus,
} from "lucide-react";
import { benefits } from "@/data/site";
const icons = [Droplet, Sparkles, ShieldCheck, PackageCheck, Crosshair, Layers];
export function BenefitShowcase() {
  return (
    <div className="benefit-grid benefit-visual-layout">
      <div className="benefit-product">
        <span className="benefit-emblem">
          <ShieldCheck size={42} strokeWidth={1} />
        </span>
        <h3>
          Topical.
          <br /> By design.
        </h3>
        <Image
          src="/images/products/original-applicator.webp"
          alt="Authentic original SkinSeal applicator, shown as a product reference"
          width={2419}
          height={451}
          sizes="(max-width:759px) 85vw, (max-width:1179px) 42vw, 30vw"
        />
        <div className="benefit-product-label">
          <span>Original SkinSeal applicator</span>
          <p>For professional use, according to the product insert.</p>
        </div>
      </div>
      <div className="benefit-explanations">
        {benefits.map((benefit, index) => {
          const Icon = icons[index];
          return (
            <details
              className="benefit-item"
              key={benefit.title}
              open={index === 0}
            >
              <summary>
                <Icon size={21} strokeWidth={1.5} />
                <span>{benefit.title}</span>
                <Plus size={16} className="benefit-disclosure" />
              </summary>
              <p>{benefit.text}</p>
            </details>
          );
        })}
      </div>
    </div>
  );
}
