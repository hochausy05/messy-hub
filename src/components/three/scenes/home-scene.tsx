"use client";

import { HubSystem } from "@/src/components/three/objects/hub-system";

export function HomeScene() {
  return (
    <>
      {/* Ambient fill lighting */}
      <ambientLight intensity={0.75} />

      {/* Primary directional key light */}
      <directionalLight position={[4, 5, 4]} intensity={1.2} />

      {/* Subtle secondary accent light */}
      <pointLight
        position={[-3, -2, -2]}
        intensity={0.6}
        color="#8ba2c8"
      />

      {/* Abstract hub topology system */}
      <HubSystem />
    </>
  );
}
