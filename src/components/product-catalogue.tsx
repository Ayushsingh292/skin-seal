"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { products } from "@/data/products";
import { ProductVisual } from "./product-visual";
import { MotionBoundary } from "./motion";

export function ProductCatalogue() {
  const [selected, setSelected] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const medical = products.filter((p) => p.category === "Medical");
  const product = medical[selected];
  function choose(index: number) {
    setSelected(index);
    refs.current[index]?.focus();
  }
  return (
    <MotionBoundary>
      <div className="formulation-catalogue">
        {medical
          .filter((p) => p.slug !== product.slug)
          .map((p) => (
            <div
              key={p.slug}
              hidden
              role="tabpanel"
              id={`formula-panel-${p.slug}`}
              aria-labelledby={`formula-tab-${p.slug}`}
            />
          ))}
        <div className="formulation-sidebar">
          <div className="catalogue-kicker">
            <span>01 / Medical range</span>
            <span>04 formulations</span>
          </div>
          <div
            className="formulation-tabs"
            role="tablist"
            aria-label="Medical formulations"
          >
            {medical.map((p, i) => (
              <button
                key={p.slug}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                role="tab"
                id={`formula-tab-${p.slug}`}
                aria-controls={`formula-panel-${p.slug}`}
                aria-selected={selected === i}
                tabIndex={selected === i ? 0 : -1}
                onClick={() => setSelected(i)}
                onKeyDown={(event) => {
                  let next = i;
                  if (event.key === "ArrowRight" || event.key === "ArrowDown")
                    next = (i + 1) % medical.length;
                  else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
                    next = (i + medical.length - 1) % medical.length;
                  else if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = medical.length - 1;
                  else return;
                  event.preventDefault();
                  choose(next);
                }}
              >
                <span className="formula-tab-number">0{i + 1}</span>
                <span>
                  <strong>{p.name}</strong>
                  <small>{p.label}</small>
                </span>
                <ArrowUpRight size={20} />
              </button>
            ))}
          </div>
          <Link href="/products" className="text-link">
            Compare the complete range <ArrowRight size={17} />
          </Link>
        </div>
        <div
          className="formulation-panel"
          role="tabpanel"
          id={`formula-panel-${product.slug}`}
          aria-labelledby={`formula-tab-${product.slug}`}
          tabIndex={0}
        >
          <div className="formula-panel-status">
            <span>0{selected + 1} / 04</span>
            <p>{product.composition}</p>
          </div>
          <m.div
            key={product.slug}
            initial={reduce ? false : { x: 12 }}
            animate={{ x: 0 }}
          >
            <ProductVisual product={product} />
            <div className="formula-panel-copy">
              <div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
              <Link className="button" href={`/products/${product.slug}`}>
                View Details <ArrowUpRight size={17} />
              </Link>
            </div>
          </m.div>
        </div>
      </div>
      <div className="specialty-ranges">
        <article className="dental-feature">
          <div className="specialty-index">
            <span>02 / Dental range</span>
            <span>For dental professionals</span>
          </div>
          <h3>
            A dedicated range.
            <br />
            <span>A different discipline.</span>
          </h3>
          <p>
            SkinSeal, Plus, Adv and Adv Plus dental variants. Listed size: 0.25
            mL.
          </p>
          <Link href="/products/skinseal-dental" className="text-link">
            Explore SkinSeal Dental <ArrowUpRight size={20} />
          </Link>
          <span className="dental-type" aria-hidden="true">
            D
          </span>
        </article>
        <article className="vet-feature">
          <div className="specialty-index">
            <span>03 / Veterinary range</span>
            <span>0.50 mL</span>
          </div>
          <div>
            <h3>
              Care beyond
              <br />
              human medicine.
            </h3>
            <Image
              src="/images/products/veterinary.webp"
              alt="Authentic SkinSeal Vet 0.50 mL packaging"
              width={1600}
              height={712}
              sizes="(max-width: 760px) 85vw, 40vw"
            />
          </div>
          <p>N-Butyl-2-Cyanoacrylate · For veterinary professionals.</p>
          <Link href="/products/skinseal-veterinary" className="text-link">
            Explore SkinSeal Veterinary <ArrowUpRight size={20} />
          </Link>
        </article>
      </div>
    </MotionBoundary>
  );
}
