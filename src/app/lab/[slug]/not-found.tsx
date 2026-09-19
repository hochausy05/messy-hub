import Link from "next/link";

export default function ExperimentNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
        Experiment unavailable
      </h1>
      <p className="max-w-xl text-sm leading-relaxed text-[var(--text-muted)]">
        This Lab entry does not exist or is not ready to open.
      </p>
      <Link
        href="/lab"
        className="inline-flex min-h-11 w-fit items-center text-sm text-[var(--text-secondary)] underline-offset-4 hover:text-[var(--text-primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-base)]"
      >
        Return to Lab
      </Link>
    </div>
  );
}
