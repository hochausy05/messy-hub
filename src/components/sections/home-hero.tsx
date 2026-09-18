import { SectionFrame } from "@/src/components/ui/section-frame";

export function HomeHero() {
  return (
    <SectionFrame className="pt-8 sm:pt-14 lg:pt-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 lg:items-start">
        {/* Main Identity & Statement */}
        <div className="flex flex-col gap-5 lg:col-span-7">
          <div className="inline-flex max-w-max items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-base)] px-3.5 py-1 text-xs font-mono text-[var(--text-secondary)]">
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              aria-hidden="true"
            />
            <span>Personal Digital Hub</span>
            <span className="text-[var(--text-muted)]" aria-hidden="true">
              /
            </span>
            <span className="text-[var(--text-muted)]">Active Workspace</span>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
              Messy Hub
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">
              An authored digital space connecting experimental code, curated web
              destinations, and personal context. Designed as an evolving workspace
              rather than a static portfolio.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono text-[var(--text-muted)]">
            <span className="rounded border border-[var(--border-subtle)] bg-[var(--surface-base)] px-2.5 py-1">
              Architecture: DOM-First
            </span>
            <span className="rounded border border-[var(--border-subtle)] bg-[var(--surface-base)] px-2.5 py-1">
              Scope: Core Hub
            </span>
            <span className="rounded border border-[var(--border-subtle)] bg-[var(--surface-base)] px-2.5 py-1">
              3 Primary Spaces
            </span>
          </div>
        </div>

        {/* Asymmetric System Frame / Quick Orientation */}
        <aside
          aria-label="Hub orientation summary"
          className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-base)] p-6 sm:p-7 lg:col-span-5"
        >
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 text-xs font-mono text-[var(--text-muted)]">
            <span className="font-semibold uppercase tracking-wider">Orientation</span>
            <span>Index 01&ndash;03</span>
          </div>

          <dl className="mt-4 space-y-3.5 text-sm">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="font-medium text-[var(--text-primary)]">Links</dt>
              <dd className="text-right text-xs text-[var(--text-muted)]">
                Web directory &amp; spaces
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="font-medium text-[var(--text-primary)]">Lab</dt>
              <dd className="text-right text-xs text-[var(--text-muted)]">
                Interactive sandbox
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="font-medium text-[var(--text-primary)]">Profile</dt>
              <dd className="text-right text-xs text-[var(--text-muted)]">
                Perspective &amp; context
              </dd>
            </div>
          </dl>

          <div className="mt-6 border-t border-[var(--border-subtle)] pt-4">
            <a
              href="#destinations"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-xs font-mono text-[var(--border-focus)] transition-colors hover:text-[var(--text-primary)]"
            >
              <span>Explore destinations</span>
              <span aria-hidden="true">&darr;</span>
            </a>
          </div>
        </aside>
      </div>
    </SectionFrame>
  );
}
