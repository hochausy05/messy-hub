"use client";

import { Canvas } from "@react-three/fiber";

import { HomeScene } from "@/src/components/three/scenes/home-scene";

export function HomeCanvas() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      aria-hidden="true"
      tabIndex={-1}
    >
      <Canvas
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
