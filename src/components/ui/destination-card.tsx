import Link from "next/link";
import type { LinkDestination } from "@/src/types/content";

type DestinationCardProps = {
  destination: LinkDestination;
  className?: string;
};

export function DestinationCard({
  destination,
  className = "",
}: DestinationCardProps) {
  const { title, description, href, kind, category } = destination;
  const isExternal = kind === "external";

  const linkContent = (
    <>
      <span>{isExternal ? "Visit Destination" : "Explore Route"}</span>
      <span
        aria-hidden="true"
        className="transition-transform duration-150 group-hover:translate-x-0.5"
      >
        {isExternal ? "↗" : "→"}
      </span>
      {isExternal ? (
        <span className="sr-only"> (opens in a new tab)</span>
      ) : null}
    </>
  );

  const linkClasses =
    "inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[var(--text-primary)] transition-colors duration-150 hover:text-[var(--border-focus)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-base)] rounded-md";

  return (
    <article
      className={`group relative flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-base)] p-6 transition-colors duration-150 hover:border-[var(--border-default)] hover:bg-[var(--surface-raised)] sm:p-7 ${className}`}
    >
      <div className="flex flex-col gap-4">
        {/* Destination Metadata Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          {category ? (
            <span className="rounded border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-2 py-0.5 text-[11px] text-[var(--text-secondary)] tracking-wider">
              {category}
            </span>
          ) : (
            <span className="text-[11px] text-[var(--text-muted)] tracking-wider uppercase">
              Directory Item
            </span>
          )}

          {/* Visual distinction for Internal vs External — visible without hover */}
          {isExternal ? (
            <span className="inline-flex items-center gap-1.5 rounded border border-[var(--border-default)] bg-[var(--surface-base)] px-2 py-0.5 text-[11px] font-medium text-[var(--text-secondary)]">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[var(--border-focus)]"
                aria-hidden="true"
              />
              External Site
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded border border-[var(--border-subtle)] bg-[var(--surface-base)] px-2 py-0.5 text-[11px] text-[var(--text-muted)]">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]"
                aria-hidden="true"
              />
              Internal Route
            </span>
          )}
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--border-focus)] sm:text-2xl">
            {title}
          </h3>
          {description ? (
            <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      {/* Navigation Action */}
      <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
        {isExternal ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className={linkClasses}
            aria-label={`${title} (External site, opens in a new tab)`}
          >
            {linkContent}
          </a>
        ) : (
          <Link
            href={href}
            className={linkClasses}
            aria-label={`${title} (Internal route)`}
          >
            {linkContent}
          </Link>
        )}
      </div>
    </article>
  );
}
