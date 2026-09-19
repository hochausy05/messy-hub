import Link from "next/link";

export function LinksEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-subtle)] bg-[var(--surface-base)]/60 px-6 py-12 text-center sm:px-12 sm:py-16">
      <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-3 py-1 font-mono text-xs text-[var(--text-secondary)]">
        <span
          className="h-1.5 w-1.5 rounded-full bg-[var(--border-focus)] animate-pulse"
          aria-hidden="true"
        />
        <span>Directory Status: Curating</span>
      </div>

      <h2 className="mt-5 text-xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-2xl">
        No Connected Destinations Yet
      </h2>

      <p className="mt-2.5 max-w-md text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
        Connected websites, external projects, and referenced destinations are
        currently being gathered and organized. Verified links will appear here
        as they are added to the hub.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors duration-150 hover:border-[var(--border-focus)] hover:text-[var(--border-focus)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-base)]"
        >
          Return to Home
        </Link>
        <Link
          href="/lab"
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[var(--border-subtle)] px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors duration-150 hover:border-[var(--border-default)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-base)]"
        >
          Explore the Lab
        </Link>
      </div>
    </div>
  );
}
