import Link from "next/link";
import type { LabExperiment, LabExperimentCategory, LabExperimentStatus } from "@/src/types/content";
import { getExperimentHref, isExperimentOpenable } from "@/src/content/lab";

const CATEGORY_LABELS: Record<LabExperimentCategory, string> = {
  ui: "UI System",
  motion: "Motion / GSAP",
  three: "Three.js / 3D",
  shader: "WebGL / Shader",
};

const STATUS_LABELS: Record<LabExperimentStatus, string> = {
  active: "Active Study",
  prototype: "Prototype",
  planned: "Planned",
  archived: "Archived",
};

type LabExperimentCardProps = {
  experiment: LabExperiment;
  className?: string;
};

export function LabExperimentCard({
  experiment,
  className = "",
}: LabExperimentCardProps) {
  const { title, description, category, status } = experiment;
  const isOpenable = isExperimentOpenable(experiment);
  const href = getExperimentHref(experiment);
  const categoryLabel = CATEGORY_LABELS[category] ?? category;
  const statusLabel = STATUS_LABELS[status] ?? status;

  const cardContent = (
    <div className="flex h-full flex-col justify-between p-6">
      <div className="flex flex-col gap-4">
        {/* Card Header: Category & Status */}
        <div className="flex items-center justify-between gap-3 text-xs font-mono">
          <span className="rounded border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-2.5 py-0.5 text-[var(--text-secondary)]">
            {categoryLabel}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium ${
              status === "active"
                ? "bg-[var(--color-accent-subtle)] text-[var(--border-focus)] border border-[var(--border-focus)]/30"
                : status === "prototype"
                ? "bg-[var(--surface-overlay)] text-[var(--text-primary)] border border-[var(--border-default)]"
                : "bg-[var(--surface-raised)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                status === "active"
                  ? "bg-[var(--border-focus)]"
                  : status === "prototype"
                  ? "bg-[var(--text-secondary)]"
                  : "bg-[var(--text-muted)]"
              }`}
              aria-hidden="true"
            />
            <span>{statusLabel}</span>
          </span>
        </div>

        {/* Experiment Title & Description */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--border-focus)] transition-colors duration-150">
            {title}
          </h3>
          {description ? (
            <p className="text-sm leading-relaxed text-[var(--text-muted)] line-clamp-3">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      {/* Card Footer: Action / Affordance */}
      <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4 text-xs font-mono">
        <span className="text-[var(--text-muted)]">
          ID: {experiment.id}
        </span>
        {isOpenable ? (
          <span className="inline-flex items-center gap-1 font-medium text-[var(--text-primary)] group-hover:text-[var(--border-focus)] transition-colors duration-150">
            Launch
            <svg
              className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        ) : (
          <span className="text-[var(--text-muted)] italic">
            In Preparation
          </span>
        )}
      </div>
    </div>
  );

  const containerClasses = `group flex flex-col rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-base)]/80 transition-all duration-200 ${className}`;

  if (isOpenable) {
    return (
      <Link
        href={href}
        prefetch={false}
        className={`${containerClasses} hover:border-[var(--border-default)] hover:bg-[var(--surface-raised)]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-base)]`}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <article className={`${containerClasses} opacity-85`}>
      {cardContent}
    </article>
  );
}
