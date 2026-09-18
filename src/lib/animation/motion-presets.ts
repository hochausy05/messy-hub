/**
 * Centralized motion presets and timing constants.
 * Keeps motion values grouped and easily tunable without locking permanent tokens prematurely.
 */
export const MOTION_DURATIONS = {
  instant: 0,
  micro: 0.2,
  fast: 0.35,
  normal: 0.5,
  slow: 0.65,
} as const;

export const MOTION_EASINGS = {
  entrance: "power2.out",
  exit: "power2.in",
  standard: "power1.inOut",
  interactive: "power2.out",
} as const;

export const MOTION_OFFSETS = {
  micro: 3,
  subtle: 8,
  normal: 12,
  pronounced: 16,
} as const;

export const MOTION_STAGGERS = {
  tight: 0.06,
  normal: 0.08,
  relaxed: 0.1,
} as const;
