import Link from "next/link";

import type { HubDestination } from "@/src/types/content";

type DestinationEntryProps = {
  destination: HubDestination;
};

export function DestinationEntry({ destination }: DestinationEntryProps) {
  const { title, slug, href, description, actionLabel, index } = destination;

  return (
    <article
      data-motion="destination-card"
      className="group relative flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-base)] p-6 transition-colors duration-150 hover:border-[var(--border-default)] hover:bg-[var(--surface-raised)] sm:p-7"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
          <span className="font-semibold tracking-wider">{index}</span>
          <span className="rounded border border-[var(--border-subtle)] px-2 py-0.5 text-[11px] text-[var(--text-secondary)]">
            {slug}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-2xl">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
        <Link
          href={href}
          className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:text-[var(--border-focus)] focus-visible:text-[var(--border-focus)]"
          aria-label={`${actionLabel} - ${title} (${slug})`}
        >
          <span>{actionLabel}</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-150 group-hover:translate-x-0.5"
          >
            &rarr;
          </span>
        </Link>
      </div>
    </article>
  );
}
