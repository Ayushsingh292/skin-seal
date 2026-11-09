"use client";
import { useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "./shared";
import { ProductVisual } from "./product-visual";
export function ProductFilter() {
  const [category, setCategory] = useState("All Products");
  const filtered = products.filter(
    (p) => category === "All Products" || p.category === category,
  );
  return (
    <>
      <div className="portfolio-intro">
        <div>
          <p className="eyebrow">The catalogue / Six product families</p>
          <h2>
            Compare the details.
            <br />
            Find your formulation.
          </h2>
        </div>
        <p>
          Explore compositions, listed sizes and areas of practice. Selection
          should follow professional assessment and the exact product’s
          documentation.
        </p>
      </div>
      <div className="filter-tabs" role="group" aria-label="Filter products">
        {["All Products", "Medical", "Dental", "Veterinary"].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
          >
            {c}
            <span aria-hidden="true">
              {c === "All Products" ? "06" : c === "Medical" ? "04" : "01"}
            </span>
          </button>
        ))}
      </div>
      {category !== "All Products" && category !== "Medical" && (
        <div className="filtered-feature">
          <ProductVisual product={filtered[0]} />
          <p>{filtered[0].description}</p>
        </div>
      )}
      <div className="catalogue-column-labels" aria-hidden="true">
        <span>Family</span>
        <span>Composition / Variants</span>
        <span>Listed sizes</span>
        <span>Explore</span>
      </div>
      <div className="product-grid catalogue-index">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
      <p className="section-note">
        For variants without verified pack photography, the website uses a
        formulation presentation. No replacement packaging has been created.
      </p>
    </>
  );
}
