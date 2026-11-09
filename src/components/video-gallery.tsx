"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Play, X, Video } from "lucide-react";
import Link from "next/link";
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
              className="video-card"
              key={v.id}
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
                  sizes="(max-width: 700px) 90vw, 45vw"
                />
                <span className="play-circle">
                  <Play />
                </span>
              </div>
              <h3>{v.title}</h3>
              <p>{v.description}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="media-request">
          <div className="media-request-art">
            <span className="large-play">
              <Video size={44} strokeWidth={1} />
            </span>
            <span>PRODUCT KNOWLEDGE · PROFESSIONAL CARE</span>
          </div>
          <div>
            <p className="eyebrow">Clinical learning</p>
            <h3>
              See the application.
              <br />
              Understand the product.
            </h3>
            <p>
              Speak with our team to request a product demonstration or the
              latest professional learning materials for your chosen SkinSeal
              formulation.
            </p>
            <p className="muted small-copy">
              No clinical testimonials or patient footage are currently
              published.
            </p>
            <Link className="button" href="/contact?type=demonstration">
              Request a Demonstration <Play size={15} />
            </Link>
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
