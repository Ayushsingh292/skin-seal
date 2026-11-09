"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X, ArrowUpRight, Film } from "lucide-react";
import { publishedVideos, type ClinicalVideo } from "@/data/media";

export function VideoGallery({ product }: { product?: string }) {
  const entries = publishedVideos.filter(
    (v) => !product || v.product === product,
  );
  const [selected, setSelected] = useState<ClinicalVideo | null>(null);
  const [failed, setFailed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  function cleanup() {
    player.current?.pause();
    setSelected(null);
    opener.current?.focus();
  }
  function close() {
    player.current?.pause();
    dialog.current?.close();
    cleanup();
  }
  if (!entries.length) return null;
  return (
    <div className="company-film-library">
      <div className="film-intro">
        <div>
          <p className="eyebrow">SkinSeal video collection</p>
          <h2>
            Meet the range.
            <br />
            <span>See the story.</span>
          </h2>
        </div>
        <p>
          Get to know SkinSeal through our product videos. Explore the range
          and find information relevant to your practice.
        </p>
      </div>
      <div
        className={`video-grid${entries.length === 1 ? " video-grid-single" : ""}`}
      >
        {entries.map((v, index) => (
          <button
            key={v.id}
            className={`video-card film-${v.orientation}`}
            aria-haspopup="dialog"
            onClick={(e) => {
              opener.current = e.currentTarget;
              setFailed(false);
              setSelected(v);
              dialog.current?.showModal();
            }}
          >
            <div className="video-poster">
              <Image
                src={v.poster!}
                alt=""
                fill
                sizes="(max-width:760px) 90vw, (max-width:1280px) 45vw, 600px"
              />
              <span className="film-badge">
                <Film size={14} /> Product video
              </span>
              <span className="play-circle">
                <Play fill="currentColor" aria-hidden="true" />
              </span>
              <span className="film-duration">{v.duration}</span>
            </div>
            <span className="video-category">
              0{index + 1} / {v.productName}
            </span>
            <h3>
              <span>
                <span className="sr-only">Watch </span>
                {v.title}
              </span>{" "}
              <ArrowUpRight size={22} />
            </h3>
            <p>{v.description}</p>
          </button>
        ))}
      </div>
      <p className="film-disclosure">
        Product selection and use require professional assessment and the
        applicable Instructions for Use.
      </p>
      <dialog
        ref={dialog}
        className="video-dialog"
        aria-labelledby="video-title"
        aria-describedby="video-disclosure"
        onClose={cleanup}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
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
              <p className="eyebrow">
                {selected.productName} / Product video
              </p>
              <h2 id="video-title">{selected.title}</h2>
              <video
                ref={player}
                key={selected.id}
                controls
                playsInline
                preload="none"
                poster={selected.poster}
                aria-label={selected.title}
                aria-describedby="video-disclosure"
                onError={() => setFailed(true)}
              >
                <source src={selected.src} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
              {failed && (
                <p role="alert">
                  The film could not load.{" "}
                  <a href={selected.src}>Open the video directly</a>.
                </p>
              )}
              <p id="video-disclosure">{selected.disclosure}</p>
              <Link
                className="text-link"
                href={`/contact?product=${selected.product}&type=demonstration`}
              >
                Ask about this product <ArrowUpRight size={17} />
              </Link>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}
