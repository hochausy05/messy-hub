import Link from "next/link";

import { primaryNavigationItems } from "@/src/data/navigation";

export function SiteFooter() {
  return (
    <div className="border-t border-[var(--border-subtle)] bg-[var(--surface-base)] py-8 mt-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="text-sm font-semibold tracking-tight text-[var(--text-primary)]">
            Messy Hub
          </span>
          <span className="text-xs text-[var(--text-muted)]">
            Personal digital space and experimental hub.
          </span>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-secondary)]">
            {primaryNavigationItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center transition-colors hover:text-[var(--text-primary)]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
