"use client";
import { useRef, useState } from "react";
import { steps } from "@/data/site";
import {
  ArrowUpRight,
  ClipboardCheck,
  Hand,
  Droplet,
  ShieldCheck,
  HeartPulse,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { MotionBoundary } from "./motion";
const stageIcons = [ClipboardCheck, Hand, Droplet, ShieldCheck, HeartPulse];
export function ClosureJourney() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const StageIcon = stageIcons[active];
  return (
    <MotionBoundary>
      <div className="closure-journey">
        {steps.map(([title], i) =>
          i !== active ? (
            <div
              hidden
              role="tabpanel"
              id={`journey-panel-${i}`}
              aria-labelledby={`journey-tab-${i}`}
              key={title}
            />
          ) : null,
        )}
        <div
          className="journey-tabs"
          role="tablist"
          aria-label="Closure journey"
        >
          {steps.map(([title], i) => (
            <button
              key={title}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`journey-tab-${i}`}
              aria-controls={`journey-panel-${i}`}
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                let next = i;
                if (e.key === "ArrowRight" || e.key === "ArrowDown")
                  next = (i + 1) % steps.length;
                else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
                  next = (i + steps.length - 1) % steps.length;
                else if (e.key === "Home") next = 0;
                else if (e.key === "End") next = steps.length - 1;
                else return;
                e.preventDefault();
                setActive(next);
                refs.current[next]?.focus();
              }}
            >
              <span>0{i + 1}</span>
              <strong>{title}</strong>
              <span className="journey-line" />
            </button>
          ))}
        </div>
        <div
          className="journey-progress"
          role="progressbar"
          aria-label="Closure journey progress"
          aria-valuemin={0}
          aria-valuemax={5}
          aria-valuenow={active + 1}
          aria-valuetext={`Step ${active + 1} of 5: ${steps[active][0]}`}
        >
          {steps.map(([title], index) => (
            <span key={title} data-complete={index <= active} />
          ))}
        </div>
        <div
          className="journey-panel"
          role="tabpanel"
          id={`journey-panel-${active}`}
          aria-labelledby={`journey-tab-${active}`}
          tabIndex={0}
        >
          <div className="journey-product-context">
            <span>Product reference / Original SkinSeal</span>
            <Image
              src="/images/products/original-applicator.webp"
              alt="Original SkinSeal applicator shown for product context, not as an application demonstration"
              width={2419}
              height={451}
              sizes="(max-width:759px) 80vw, 40vw"
            />
            <p>Always refer to the exact product’s Instructions for Use.</p>
          </div>
          <m.div
            key={active}
            initial={reduce ? false : { y: 8 }}
            animate={{ y: 0 }}
            className="journey-stage-copy"
          >
            <div className="journey-stage-heading">
              <StageIcon size={28} strokeWidth={1.4} />
              <span>Step {active + 1} of 5</span>
            </div>
            <h3>{steps[active][0]}.</h3>
            <p>{steps[active][1]}</p>
            <Link className="text-link" href="/contact?resource=insert">
              Request the product insert <ArrowUpRight size={18} />
            </Link>
          </m.div>
        </div>
      </div>
    </MotionBoundary>
  );
}
