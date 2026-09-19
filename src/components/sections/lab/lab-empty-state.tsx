import Link from "next/link";

const EXPERIMENTAL_TRACKS = [
  {
    title: "UI Systems",
    tag: "Track 01",
    description: "Novel component layouts, tactile micro-interactions, and interface architectures.",
  },
  {
    title: "Motion / GSAP",
    tag: "Track 02",
    description: "Kinetic typography, timeline choreography, and reduced-motion-safe animations.",
  },
  {
    title: "Three.js / 3D",
    tag: "Track 03",
    description: "Interactive WebGL canvases, isolated spatial objects, and bounded viewport physics.",
  },
  {
    title: "WebGL / Shaders",
    tag: "Track 04",
    description: "Custom fragment shaders, mathematical graphics, and procedural visual experiments.",
  },
] as const;

export function LabEmptyState() {
  return (
    <div className="flex flex-col gap-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-base)]/40 p-6 sm:p-8 lg:p-10">
      {/* Workbench Status Banner */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-3 py-1 font-mono text-xs text-[var(--text-secondary)]">
          <span
            className="h-1.5 w-1.5 rounded-full bg-[var(--border-focus)] animate-pulse"
            aria-hidden="true"
          />
          <span>Workbench Status: Calibrated &amp; Ready</span>
        </div>

        <h2 className="mt-4 text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          Experiments in Preparation
        </h2>

        <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
          The registry infrastructure and sandbox boundary are active. Initial
          studies across creative UI, GSAP motion choreography, and 3D scenes
          are currently in development and will appear here as they are published.
        </p>
      </div>

      {/* Experimental Discipline Overviews */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {EXPERIMENTAL_TRACKS.map((track) => (
          <div
            key={track.tag}
            className="flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-raised)]/60 p-4 transition-colors duration-150"
          >
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                {track.tag}
              </span>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                {track.title}
              </h3>
              <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                {track.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Return & Destination Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <Link
          href="/links"
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors duration-150 hover:border-[var(--border-focus)] hover:text-[var(--border-focus)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-base)]"
        >
          Browse Connected Destinations
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[var(--border-subtle)] px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors duration-150 hover:border-[var(--border-default)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-base)]"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
