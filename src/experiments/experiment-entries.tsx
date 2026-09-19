"use client";

import dynamic from "next/dynamic";

// Next.js cannot split Client Components dynamically imported by a Server
// Component. These small client entries keep each implementation in its own
// chunk while the existing server mapping still selects the route's component.
export const KineticFocusGridEntry = dynamic(
  () => import("./kinetic-focus-grid/kinetic-focus-grid"),
);

export const SpatialNodeFieldEntry = dynamic(
  () => import("./spatial-node-field/spatial-node-field"),
);
