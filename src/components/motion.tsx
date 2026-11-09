"use client";
import { LazyMotion, domAnimation, MotionConfig } from "motion/react";
export function MotionBoundary({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: 0.25, ease: [0.2, 0.65, 0.3, 1] }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
