// Shared by the procedural scene and its static DOM illustration.
export type NodePosition = readonly [x: number, y: number, z: number];

export const WIDE_NODES: readonly NodePosition[] = [
  [-2.25, 0.85, -0.35],
  [-0.65, 1.65, 0.35],
  [1.9, 1.1, -0.55],
  [2.25, -0.9, 0.45],
  [0.45, -1.7, -0.3],
  [-1.8, -1.15, 0.6],
];

// A taller arrangement keeps individual nodes readable on narrow screens.
export const COMPACT_NODES: readonly NodePosition[] = [
  [-1.05, 1.1, -0.35],
  [0.2, 2.0, 0.35],
  [1.05, 0.85, -0.55],
  [1.0, -1.05, 0.45],
  [-0.1, -2.0, -0.3],
  [-1.05, -0.85, 0.6],
];

export function nodeInfluence(x: number, y: number, pointerX: number, pointerY: number) {
  const proximity = Math.max(0, 1 - Math.hypot(x - pointerX, y - pointerY) / 1.8);
  return proximity * proximity;
}
