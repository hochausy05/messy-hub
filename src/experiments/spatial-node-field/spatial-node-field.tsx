"use client";

import { Component, useEffect, useState, type ComponentType, type ReactNode } from "react";

import { COMPACT_NODES, WIDE_NODES, type NodePosition } from "./field-layout";
import styles from "./spatial-node-field.module.css";

function StaticField({ nodes }: { nodes: readonly NodePosition[] }) {
  return (
    <svg viewBox="-3 -3 6 6" fill="none" aria-hidden="true" focusable="false">
      <ellipse rx="2.55" ry="2.3" stroke="var(--border-subtle)" strokeWidth="0.012" />
      {nodes.map(([x, y], index) => (
        <g key={index}>
          <path d={`M 0 0 L ${x} ${-y}`} stroke="var(--border-default)" strokeWidth="0.012" />
          <path
            d={`M ${x} ${-y - 0.18} l 0.18 0.18 -0.18 0.18 -0.18 -0.18 Z`}
            fill="var(--surface-overlay)"
            stroke="var(--border-focus)"
            strokeWidth="0.018"
          />
        </g>
      ))}
      <path d="M 0 -.55 .52 -.17 .32 .45 -.32 .45 -.52 -.17 Z M 0 -.55 0 .12 .32 .45 M -.52 -.17 0 .12 .52 -.17 M 0 .12 -.32 .45"
        fill="var(--surface-raised)" stroke="var(--border-focus)" strokeWidth="0.018" />
    </svg>
  );
}

function FieldFallback() {
  return (
    <div className={styles.fallback}>
      <div className={styles.wideIllustration}><StaticField nodes={WIDE_NODES} /></div>
      <div className={styles.compactIllustration}><StaticField nodes={COMPACT_NODES} /></div>
      <p>Static view · The spatial composition remains available.</p>
    </div>
  );
}

class FieldErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <FieldFallback /> : this.props.children;
  }
}

function supportsWebGL2() {
  try {
    const probe = document.createElement("canvas");
    const context = probe.getContext("webgl2");
    if (!context) return false;
    // The capability probe must not keep an extra GPU context alive.
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export default function SpatialNodeField() {
  const [Scene, setScene] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (!supportsWebGL2()) return;
    let mounted = true;
    // Keep R3F and scene code behind the owning route's client boundary.
    import("./spatial-node-scene")
      .then((module) => {
        if (mounted) setScene(() => module.default);
      })
      .catch(() => {
        // The static composition remains usable when loading fails.
      });
    return () => { mounted = false; };
  }, []);

  return (
    <figure className={styles.study}>
      <div className={styles.introduction}>
        <p>One anchor. Six nodes. A shared field.</p>
        <p className={styles.pointerHint}>Move your pointer through the field to explore proximity.</p>
        <p className={styles.staticHint}>A still composition of connected forms at different depths.</p>
      </div>
      <div className={styles.stage}>
        <FieldErrorBoundary>
          {Scene ? <Scene /> : <FieldFallback />}
        </FieldErrorBoundary>
      </div>
      <figcaption className={styles.caption}>
        <span>Nearer nodes respond more. The anchor stays in place.</span>
        <span>Proximity / Depth / Response</span>
      </figcaption>
    </figure>
  );
}
