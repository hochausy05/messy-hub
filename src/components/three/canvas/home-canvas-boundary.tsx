"use client";

import { Component, type ReactNode, useEffect, useState } from "react";
import type { ComponentType } from "react";

import { HomeCanvasFallback } from "@/src/components/three/canvas/home-canvas-fallback";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("WebGL canvas initialization suppressed:", error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2");
    if (!context) return false;

    // The capability probe must not retain an extra GPU context.
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function HomeCanvasBoundary() {
  const [CanvasComponent, setCanvasComponent] = useState<
    ComponentType<{ onContextLost?: () => void }> | null
  >(null);
  const [hasRuntimeFailure, setHasRuntimeFailure] = useState(false);

  useEffect(() => {
    if (!checkWebGLSupport()) return;

    let isMounted = true;
    import("@/src/components/three/canvas/home-canvas")
      .then((mod) => {
        if (isMounted) {
          setCanvasComponent(() => mod.HomeCanvas);
        }
      })
      .catch((err) => {
        console.warn("Failed to load HomeCanvas bundle:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!CanvasComponent || hasRuntimeFailure) {
    return <HomeCanvasFallback />;
  }

  return (
    <CanvasErrorBoundary fallback={<HomeCanvasFallback />}>
      <CanvasComponent onContextLost={() => setHasRuntimeFailure(true)} />
    </CanvasErrorBoundary>
  );
}
