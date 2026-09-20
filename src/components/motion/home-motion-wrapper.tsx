"use client";

import { type ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import {
  MOTION_DURATIONS,
  MOTION_EASINGS,
  MOTION_OFFSETS,
  MOTION_STAGGERS,
} from "@/src/lib/animation/motion-presets";

gsap.registerPlugin(useGSAP);

type HomeMotionWrapperProps = {
  children: ReactNode;
};

export function HomeMotionWrapper({ children }: HomeMotionWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(containerRef);

      // 1. Choreographed entrance sequence for users with no motion reduction preference
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const container = containerRef.current;
        if (!container) return;

        const tl = gsap.timeline({
          defaults: {
            ease: MOTION_EASINGS.entrance,
          },
        });

        tl.from("[data-motion='hero-badge']", {
          opacity: 0,
          y: MOTION_OFFSETS.subtle,
          duration: MOTION_DURATIONS.fast,
        })
          .from(
            "[data-motion='hero-title']",
            {
              opacity: 0,
              y: MOTION_OFFSETS.normal,
              duration: MOTION_DURATIONS.normal,
            },
            "-=0.2"
          )
          .from(
            "[data-motion='hero-desc']",
            {
              opacity: 0,
              y: MOTION_OFFSETS.normal,
              duration: MOTION_DURATIONS.normal,
            },
            "-=0.25"
          )
          .from(
            "[data-motion='hero-tags']",
            {
              opacity: 0,
              y: MOTION_OFFSETS.subtle,
              duration: MOTION_DURATIONS.fast,
            },
            "-=0.2"
          )
          .from(
            "[data-motion='hero-panel']",
            {
              opacity: 0,
              y: MOTION_OFFSETS.normal,
              duration: MOTION_DURATIONS.normal,
            },
            "-=0.3"
          )
          .from(
            "[data-motion='destinations-header']",
            {
              opacity: 0,
              y: MOTION_OFFSETS.normal,
              duration: MOTION_DURATIONS.fast,
            },
            "-=0.2"
          )
          .from(
            "[data-motion='destination-card']",
            {
              opacity: 0,
              y: MOTION_OFFSETS.pronounced,
              stagger: MOTION_STAGGERS.normal,
              duration: MOTION_DURATIONS.normal,
            },
            "-=0.15"
          )
          .from(
            "[data-motion='overview-section']",
            {
              opacity: 0,
              y: MOTION_OFFSETS.normal,
              duration: MOTION_DURATIONS.normal,
            },
            "-=0.2"
          )
          .from(
            "[data-motion='overview-item']",
            {
              opacity: 0,
              y: MOTION_OFFSETS.subtle,
              stagger: MOTION_STAGGERS.tight,
              duration: MOTION_DURATIONS.fast,
            },
            "-=0.2"
          );

        const revealForKeyboard = () => tl.progress(1);
        container.addEventListener("focusin", revealForKeyboard, { once: true });

        return () => container.removeEventListener("focusin", revealForKeyboard);
      });

      // 2. Subtle interactive card lift for fine pointer / keyboard focus devices
      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>(
            "[data-motion='destination-card']"
          );
          const cleanups: Array<() => void> = [];

          cards.forEach((card) => {
            const onEnter = () => {
              gsap.to(card, {
                y: -MOTION_OFFSETS.micro,
                duration: MOTION_DURATIONS.micro,
                ease: MOTION_EASINGS.interactive,
                overwrite: "auto",
              });
            };

            const onLeave = () => {
              gsap.to(card, {
                y: 0,
                duration: MOTION_DURATIONS.micro,
                ease: MOTION_EASINGS.interactive,
                overwrite: "auto",
              });
            };

            card.addEventListener("mouseenter", onEnter);
            card.addEventListener("mouseleave", onLeave);
            card.addEventListener("focusin", onEnter);
            card.addEventListener("focusout", onLeave);

            cleanups.push(() => {
              card.removeEventListener("mouseenter", onEnter);
              card.removeEventListener("mouseleave", onLeave);
              card.removeEventListener("focusin", onEnter);
              card.removeEventListener("focusout", onLeave);
            });
          });

          return () => {
            cleanups.forEach((cleanup) => cleanup());
          };
        }
      );

      // 3. Genuine reduced-motion mode: no transforms, no stagger delays
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-motion]", {
          clearProps: "all",
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="home-motion-wrapper">
      {children}
    </div>
  );
}
