"use client";
import { useRef, useState } from "react";
import { steps } from "@/data/site";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { MotionBoundary } from "./motion";
export function ClosureJourney() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
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
          className="journey-panel"
          role="tabpanel"
          id={`journey-panel-${active}`}
          aria-labelledby={`journey-tab-${active}`}
          tabIndex={0}
        >
          <span className="journey-big-number" aria-hidden="true">
            0{active + 1}
          </span>
          <m.div
            key={active}
            initial={reduce ? false : { y: 8 }}
            animate={{ y: 0 }}
          >
            <p className="eyebrow">The closure journey / Step 0{active + 1}</p>
            <h3>{steps[active][0]}.</h3>
            <p>{steps[active][1]}</p>
          </m.div>
          <Link className="text-link" href="/contact?resource=insert">
            Request the product insert <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </MotionBoundary>
  );
}
