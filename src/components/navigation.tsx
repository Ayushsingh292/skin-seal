"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { navigation } from "@/data/site";
import { products } from "@/data/products";

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const productTrigger = useRef<HTMLButtonElement>(null);
  const productMenu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!sub || open) return;
    const outside = (event: PointerEvent) => {
      if (!productMenu.current?.contains(event.target as Node)) setSub(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [sub, open]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    function keyboard(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (e.key === "Tab") {
        const els = [
          trigger.current,
          ...Array.from(
            panel.current?.querySelectorAll<HTMLElement>("a,button") ?? [],
          ),
        ].filter(
          (el): el is HTMLElement => !!el && el.getClientRects().length > 0,
        );
        const first = els[0],
          last = els.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener("keydown", keyboard);
    const query = window.matchMedia("(min-width: 1180px)");
    const resize = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", resize);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", keyboard);
      query.removeEventListener("change", resize);
    };
  }, [open]);
  function close() {
    setOpen(false);
    setSub(false);
  }
  return (
    <header className="site-header">
      <div className="nav-utility">
        <div className="container">
          <span>ADVANCED TOPICAL SKIN ADHESIVES · FOR PROFESSIONAL USE</span>
          <a href="tel:+918376823209">+91 837 682 3209</a>
        </div>
      </div>
      <div className="nav-wrap container">
        <Link
          className="brand"
          href="/"
          aria-label="SkinSeal home"
          onClick={close}
        >
          <Image
            src="/images/brand/skinseal-logo.png"
            alt="SkinSeal — Just Seal & Heal"
            width={145}
            height={78}
            preload
          />
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {navigation.map(([name, href]) =>
            href === "/products" ? (
              <div
                className="nav-product"
                key={href}
                ref={productMenu}
                onBlur={(event) => {
                  if (
                    !event.currentTarget.contains(event.relatedTarget as Node)
                  )
                    setSub(false);
                }}
              >
                <Link
                  className={pathname.startsWith(href) ? "active" : ""}
                  href={href}
                >
                  Products
                </Link>
                <button
                  ref={productTrigger}
                  aria-label="Open product navigation"
                  aria-expanded={sub}
                  onClick={() => setSub(!sub)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setSub(false);
                      productTrigger.current?.focus();
                    }
                  }}
                >
                  <ChevronDown size={13} />
                </button>
                {sub && (
                  <div
                    className="product-dropdown"
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setSub(false);
                        productTrigger.current?.focus();
                      }
                    }}
                  >
                    <div className="megamenu-intro">
                      <span>The SkinSeal portfolio</span>
                      <h2>
                        A considered choice
                        <br />
                        for your practice.
                      </h2>
                      <Link href="/products" onClick={() => setSub(false)}>
                        Compare the complete range <ArrowUpRight size={19} />
                      </Link>
                    </div>
                    <div className="megamenu-grid">
                      {products.map((p) => (
                        <Link
                          href={`/products/${p.slug}`}
                          key={p.slug}
                          onClick={() => setSub(false)}
                        >
                          <strong>{p.name}</strong>
                          <span>{p.composition}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={href}
                href={href}
                className={pathname === href ? "active" : ""}
                aria-current={pathname === href ? "page" : undefined}
              >
                {name}
              </Link>
            ),
          )}
        </nav>
        <Link className="button small nav-cta" href="/contact">
          Enquire Now <ArrowUpRight size={15} />
        </Link>
        <button
          ref={trigger}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="mobile-panel" id="mobile-navigation" ref={panel}>
          <nav aria-label="Mobile navigation">
            {navigation.map(([name, href]) => (
              <div key={href}>
                <div className="mobile-nav-row">
                  <Link
                    href={href}
                    onClick={close}
                    aria-current={pathname === href ? "page" : undefined}
                  >
                    {name}
                  </Link>
                  {href === "/products" && (
                    <button
                      aria-label="Expand products"
                      aria-expanded={sub}
                      onClick={() => setSub(!sub)}
                    >
                      <ChevronDown />
                    </button>
                  )}
                </div>
                {href === "/products" && sub && (
                  <div className="mobile-products">
                    {products.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        onClick={close}
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <Link href="/contact" className="button" onClick={close}>
            Enquire Now <ArrowUpRight size={17} />
          </Link>
          <p className="muted">For healthcare & veterinary professionals.</p>
        </div>
      )}
    </header>
  );
}
