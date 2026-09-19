import { labExperiments } from "@/src/content/lab";
import type { LabExperiment } from "@/src/types/content";
import { LabEmptyState } from "./lab-empty-state";
import { LabExperimentCard } from "./lab-experiment-card";

export function LabRegistry() {
  const experiments: readonly LabExperiment[] = labExperiments;

  if (experiments.length === 0) {
    return <LabEmptyState />;
  }

  return (
    <section aria-labelledby="lab-registry-heading" className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
        <h2
          id="lab-registry-heading"
          className="font-mono text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]"
        >
          All Experiments ({experiments.length})
        </h2>
        <span className="font-mono text-xs text-[var(--text-muted)]">
          Registry 01 &ndash; {String(experiments.length).padStart(2, "0")}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {experiments.map((experiment) => (
          <LabExperimentCard key={experiment.id} experiment={experiment} />
        ))}
      </div>
    </section>
  );
}
