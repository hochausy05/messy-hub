/**
 * Intentional static non-WebGL fallback for the Home 3D visual.
 * Displays a clean vector blueprint of the hub topology when WebGL is loading,
 * unsupported, or disabled.
 */
export function HomeCanvasFallback() {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[var(--surface-base)]"
      aria-hidden="true"
    >
      <svg
        className="h-full w-full max-w-[260px] opacity-75"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Orbital rings */}
        <circle
          cx="100"
          cy="100"
          r="68"
          stroke="var(--border-subtle)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <circle
          cx="100"
          cy="100"
          r="42"
          stroke="var(--border-subtle)"
          strokeWidth="1"
        />

        {/* Node connection vectors */}
        <line
          x1="100"
          y1="100"
          x2="148"
          y2="72"
          stroke="var(--border-subtle)"
          strokeWidth="1.2"
        />
        <line
          x1="100"
          y1="100"
          x2="56"
          y2="68"
          stroke="var(--border-subtle)"
          strokeWidth="1.2"
        />
        <line
          x1="100"
          y1="100"
          x2="108"
          y2="152"
          stroke="var(--border-subtle)"
          strokeWidth="1.2"
        />

        {/* Central hub node */}
        <circle
          cx="100"
          cy="100"
          r="16"
          fill="var(--surface-raised)"
          stroke="var(--border-focus)"
          strokeWidth="1.5"
        />
        <circle cx="100" cy="100" r="5" fill="var(--border-focus)" />

        {/* Satellite nodes (Links, Lab, Profile) */}
        <circle
          cx="148"
          cy="72"
          r="7"
          fill="var(--surface-raised)"
          stroke="var(--border-focus)"
          strokeWidth="1.2"
        />
        <circle
          cx="56"
          cy="68"
          r="6"
          fill="var(--surface-raised)"
          stroke="var(--border-default)"
          strokeWidth="1.2"
        />
        <circle
          cx="108"
          cy="152"
          r="6.5"
          fill="var(--surface-raised)"
          stroke="var(--border-default)"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}
