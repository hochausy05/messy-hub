"use client";

import Link from "next/link";
import { useEffect } from "react";

type ExperimentErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ExperimentError({
  error,
  reset,
}: ExperimentErrorProps) {
  useEffect(() => {
    // Keep the route-local boundary observable without exposing technical details in the UI.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
        Experiment could not load
      </h1>
      <p className="max-w-xl text-sm leading-relaxed text-[var(--text-muted)]">
        The rest of Messy Hub is still available.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="min-h-11 rounded border border-[var(--border-default)] px-4 text-sm text-[var(--text-primary)] hover:bg-[var(--surface-raised)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
        >
          Try again
        </button>
        <Link
          href="/lab"
          className="inline-flex min-h-11 items-center px-1 text-sm text-[var(--text-secondary)] underline-offset-4 hover:text-[var(--text-primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
        >
          Return to Lab
        </Link>
      </div>
    </div>
  );
}
