"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";

import { HomeScene } from "@/src/components/three/scenes/home-scene";

type HomeCanvasProps = {
  onContextLost?: () => void;
};

export function HomeCanvas({ onContextLost }: HomeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !onContextLost) return;

    const handleContextLoss = (event: Event) => {
      event.preventDefault();
      onContextLost();
    };

    canvas.addEventListener("webglcontextlost", handleContextLoss);
    return () => canvas.removeEventListener("webglcontextlost", handleContextLoss);
  }, [onContextLost]);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      aria-hidden="true"
      tabIndex={-1}
    >
      <Canvas
        ref={canvasRef}
        frameloop="demand"
        camera={{ position: [0, 0, 4.4], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
        }}
        tabIndex={-1}
        className="h-full w-full pointer-events-none sm:pointer-events-auto"
      >
        <HomeScene />
      </Canvas>
    </div>
  );
}
