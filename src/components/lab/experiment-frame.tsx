import Link from "next/link";
import type { ReactNode } from "react";

import type { LabExperiment } from "@/src/types/content";

type ExperimentFrameProps = {
  experiment: LabExperiment;
  children: ReactNode;
};

export function ExperimentFrame({
  experiment,
  children,
}: ExperimentFrameProps) {
  return (
    <div className="flex flex-col gap-8 pb-12 pt-6 sm:gap-10 sm:pb-16 sm:pt-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <nav aria-label="Experiment navigation">
          <Link
            href="/lab"
            className="inline-flex min-h-11 items-center text-sm text-[var(--text-secondary)] underline-offset-4 hover:text-[var(--text-primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-base)]"
          >
            ← Back to Lab
          </Link>
        </nav>

        <header className="flex flex-col gap-2 border-b border-[var(--border-subtle)] pb-6">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
            {experiment.category} experiment · {experiment.id}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {experiment.title}
          </h1>
          {experiment.description ? (
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
              {experiment.description}
            </p>
          ) : null}
        </header>

        <main aria-label={`${experiment.title} experiment`} className="min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
