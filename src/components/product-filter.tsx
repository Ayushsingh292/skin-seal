"use client";
import { useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "./shared";
export function ProductFilter() {
  const [category, setCategory] = useState("All Products");
  return (
    <>
      <div className="filter-tabs" role="group" aria-label="Filter products">
        {["All Products", "Medical", "Dental", "Veterinary"].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="product-grid">
        {products
          .filter((p) => category === "All Products" || p.category === category)
          .map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
      </div>
    </>
  );
}
