"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import {
  MOTION_DURATIONS,
  MOTION_EASINGS,
  MOTION_OFFSETS,
  MOTION_STAGGERS,
} from "@/src/lib/animation/motion-presets";
import styles from "./kinetic-focus-grid.module.css";

gsap.registerPlugin(useGSAP);

const CONCEPTS = [
  "Focus", "Depth", "Rhythm", "Scale", "Flow", "Contrast", "Space", "Response",
] as const;
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

export default function KineticFocusGrid() {
  const root = useRef<HTMLDivElement>(null);
  const respond = useRef<((index: number | null) => void) | null>(null);
  const activeRef = useRef<number | null>(null);
  const instructionsId = useId();
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const active = focused ?? hovered ?? selected;

  useGSAP(() => {
    const slots = Array.from(root.current!.querySelectorAll<HTMLElement>("[data-slot]"));
    const tiles = slots.map((slot) => slot.querySelector<HTMLButtonElement>("button")!);
    const media = gsap.matchMedia(root);
    let entered = false;

    media.add({
      reduce: "(prefers-reduced-motion: reduce)",
      motion: "(prefers-reduced-motion: no-preference)",
      fine: FINE_POINTER,
    }, (context) => {
      const { reduce, fine } = context.conditions!;
      if (!fine) setHovered(null);
      let entrance: gsap.core.Timeline | undefined;
      let interaction: gsap.core.Tween | undefined;

      if (!reduce && !entered) {
        entrance = gsap.timeline({
          defaults: { duration: MOTION_DURATIONS.fast, ease: MOTION_EASINGS.entrance },
        }).from(tiles, {
          opacity: 0.85,
          y: fine ? MOTION_OFFSETS.subtle : 0,
          stagger: MOTION_STAGGERS.tight,
          clearProps: "transform,opacity",
        });
      }
      entered = true;

      // Record delayed event-driven tweens in this media context as well.
      context.add("respond", (index: number | null) => {
        entrance?.progress(1).kill();
        interaction?.kill();
        if (reduce || !fine) return;

        // Read the stable layout slots once per interaction, before any writes.
        const centers = slots.map((slot) => ({
          x: slot.offsetLeft + slot.offsetWidth / 2,
          y: slot.offsetTop + slot.offsetHeight / 2,
          unit: Math.min(slot.offsetWidth, slot.offsetHeight),
        }));
        const origin = index === null ? null : centers[index];
        const targets = centers.map((center, i) => {
          if (!origin) return { x: 0, y: 0, scale: 1 };
          if (i === index) return { x: 0, y: -MOTION_OFFSETS.micro, scale: 1.025 };
          const dx = center.x - origin.x;
          const dy = center.y - origin.y;
          const distance = Math.hypot(dx, dy);
          const proximity = Math.max(0, 1 - distance / (center.unit * 3));
          return {
            x: (dx / distance) * MOTION_OFFSETS.micro * proximity,
            y: (dy / distance) * MOTION_OFFSETS.micro * proximity,
            scale: 1 - 0.018 * proximity,
          };
        });
        interaction = gsap.to(tiles, {
          x: (i) => targets[i].x,
          y: (i) => targets[i].y,
          scale: (i) => targets[i].scale,
          duration: MOTION_DURATIONS.micro,
          ease: MOTION_EASINGS.interactive,
          overwrite: "auto",
        });
      });
      respond.current = context.respond;
      // Preference/capability changes restore the current interaction state.
      if (activeRef.current !== null) context.respond(activeRef.current);

      return () => {
        respond.current = null;
      };
    });

    return () => media.revert();
  }, { scope: root });

  useEffect(() => {
    if (activeRef.current === active) return;
    activeRef.current = active;
    respond.current?.(active);
  }, [active]);

  return (
    <div ref={root} className={styles.study}>
      <div className={styles.toolbar}>
        <p id={instructionsId} className={styles.instructions}>
          Hover or focus to explore. Select a tile to hold its place.
        </p>
        <button
          type="button"
          className={styles.reset}
          disabled={selected === null}
          onClick={() => setSelected(null)}
        >
          Clear Selection
        </button>
      </div>
      <ul className={styles.grid} aria-label="Focus concepts" aria-describedby={instructionsId}>
        {CONCEPTS.map((concept, index) => (
          <li
            key={concept}
            data-slot
            className={styles.slot}
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch" && window.matchMedia(FINE_POINTER).matches) {
                setHovered(index);
              }
            }}
            onPointerLeave={() => setHovered(null)}
            onPointerCancel={() => setHovered(null)}
          >
            <button
              type="button"
              className={styles.tile}
              aria-pressed={selected === index}
              data-active={active === index}
              onFocus={(event) => {
                if (event.currentTarget.matches(":focus-visible")) setFocused(index);
              }}
              onBlur={() => setFocused(null)}
              onClick={() => setSelected((previous) => previous === index ? null : index)}
            >
              <span className={styles.tileMeta} aria-hidden="true">
                <span>0{index + 1}</span>
                <span>{selected === index ? "Held" : "Explore"}</span>
              </span>
              <span className={styles.figure} data-figure={index} aria-hidden="true">
                <span /><span /><span />
              </span>
              <span className={styles.label}>{concept}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.caption}>
        <p>One point of attention. A field of response.</p>
        <p role="status">{selected === null ? "No selection held" : `${CONCEPTS[selected]} held`}</p>
      </div>
    </div>
  );
}
