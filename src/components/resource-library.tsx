"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Download, FileText, Search } from "lucide-react";
import { documents, type Resource } from "@/data/media";
export function ResourceRows({ items = documents }: { items?: Resource[] }) {
  return (
    <div className="resource-index">
      {items.map((d, i) => (
        <article className="resource-row" key={d.id}>
          <span className="document-number">0{i + 1}</span>
          <FileText size={23} strokeWidth={1.3} />
          <div className="resource-title">
            <p>
              {d.category} <span> / {d.product}</span>
            </p>
            <h3>{d.title}</h3>
          </div>
          <span className="document-size">
            PDF
            <br />
            {d.size}
          </span>
          {d.status === "approved" && d.href ? (
            <div className="resource-actions">
              <a href={d.href} target="_blank" rel="noopener noreferrer">
                View PDF <ArrowUpRight size={16} />
              </a>
              <a href={d.href} download>
                Download <Download size={16} />
              </a>
            </div>
          ) : (
            <Link className="text-link" href={`/contact?resource=${d.id}`}>
              Request current document <ArrowUpRight size={19} />
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
export function ResourceLibrary() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All documents");
  const filtered = documents.filter(
    (d) =>
      (type === "All documents" || d.category === type) &&
      `${d.title} ${d.category} ${d.product}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <>
      <div className="library-toolbar">
        <div className="library-search">
          <Search size={18} />
          <input
            type="search"
            aria-label="Search documents"
            placeholder="Search documents"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <label className="library-category">
          Document type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>All documents</option>
            {Array.from(new Set(documents.map((d) => d.category))).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <p aria-live="polite">
          {filtered.length} document{filtered.length === 1 ? "" : "s"}
        </p>
      </div>
      {filtered.length ? (
        <ResourceRows items={filtered} />
      ) : (
        <div className="library-empty">
          <h3>No matching documents.</h3>
          <p>Try a different title or document type.</p>
          <button
            className="button outline"
            onClick={() => {
              setSearch("");
              setType("All documents");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
