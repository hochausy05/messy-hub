export function LabHeader() {
  return (
    <header className="flex flex-col gap-3">
      <div className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
        <span>Sandbox</span>
        <span aria-hidden="true" className="text-[var(--border-default)]">
          /
        </span>
        <span>Experimental Workbench</span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
        The Lab
      </h1>

      <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
        An exploratory playground for interactive frontend experiments, creative
        motion choreographies, Three.js scenes, and shader explorations.
      </p>

      <div
        className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--text-muted)]"
        aria-label="Experimental tracks"
      >
        <span className="rounded-md border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-2.5 py-1">
          UI Systems
        </span>
        <span className="rounded-md border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-2.5 py-1">
          Motion / GSAP
        </span>
        <span className="rounded-md border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-2.5 py-1">
          Three.js / 3D
        </span>
        <span className="rounded-md border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-2.5 py-1">
          WebGL / Shaders
        </span>
      </div>
    </header>
  );
}
