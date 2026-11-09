"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X, ArrowUpRight, ArrowRight } from "lucide-react";
import { publishedVideos, type ClinicalVideo } from "@/data/media";
export function VideoGallery() {
  const [selected, setSelected] = useState<ClinicalVideo | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  function close() {
    dialog.current?.close();
    setSelected(null);
    opener.current?.focus();
  }
  return (
    <>
      {publishedVideos.length ? (
        <div className="video-grid">
          {publishedVideos.map((v) => (
            <button
              key={v.id}
              className="video-card"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setSelected(v);
                dialog.current?.showModal();
              }}
            >
              <div className="video-poster">
                <Image
                  src={v.poster!}
                  alt=""
                  fill
                  sizes="(max-width:760px) 90vw,50vw"
                />
                <span className="play-circle">
                  <Play fill="currentColor" />
                </span>
              </div>
              <span className="video-category">
                Product demonstration / {v.product}
              </span>
              <h3>{v.title}</h3>
              <p>{v.description}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="cinema-request">
          <div className="cinema-copy">
            <p className="eyebrow">A closer look</p>
            <h2>
              Understand
              <br />
              the product.
              <br />
              <span>See the detail.</span>
            </h2>
            <p>
              Bring the SkinSeal range into focus. Request a professional
              demonstration and the relevant learning materials for your chosen
              formulation.
            </p>
            <Link className="button white" href="/contact?type=demonstration">
              Request a Demonstration <ArrowUpRight size={20} />
            </Link>
            <Link className="text-link" href="/clinical-experiences">
              Clinical experiences & learning <ArrowRight size={18} />
            </Link>
          </div>
          <div className="cinema-product">
            <div className="cinema-frame-top">
              <span>SKINSEAL / PRODUCT FOCUS</span>
              <span>01 — ORIGINAL</span>
            </div>
            <div className="cinema-product-image">
              <Image
                src="/images/products/original-applicator.webp"
                alt="Original SkinSeal applicator detail from the supplied company catalogue"
                width={2419}
                height={451}
                sizes="(max-width:760px) 85vw,50vw"
              />
            </div>
            <div className="cinema-caption">
              <span>Original product imagery.</span>
              <p>
                No clinical testimonials or patient footage are currently
                published.
              </p>
              <Link
                href="/contact?type=demonstration"
                aria-label="Ask about a SkinSeal demonstration"
              >
                <ArrowUpRight size={25} />
              </Link>
            </div>
          </div>
        </div>
      )}
      <dialog
        ref={dialog}
        className="video-dialog"
        aria-labelledby="video-title"
        onCancel={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="dialog-inner">
          <button
            className="dialog-close"
            aria-label="Close video"
            onClick={close}
          >
            <X />
          </button>
          {selected && (
            <>
              <h2 id="video-title">{selected.title}</h2>
              <video
                key={selected.id}
                controls
                playsInline
                preload="none"
                poster={selected.poster}
              >
                <source src={selected.src} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
              <p>{selected.description}</p>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
