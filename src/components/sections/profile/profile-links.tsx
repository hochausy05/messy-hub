import Link from "next/link";

import type { ProfileLink } from "@/src/types/content";

type ProfileLinksProps = {
  links: readonly ProfileLink[];
};

const linkClasses =
  "inline-flex min-h-11 items-center gap-2 rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors duration-150 hover:border-[var(--border-focus)] hover:text-[var(--border-focus)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--document-background)]";

export function ProfileLinks({ links }: ProfileLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <nav aria-labelledby="profile-links-heading" className="border-t border-[var(--border-subtle)] pt-8">
      <h2
        id="profile-links-heading"
        className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]"
      >
        Elsewhere
      </h2>

      <ul className="mt-4 flex flex-wrap gap-3">
        {links.map((link) => (
          <li key={link.id}>
            {link.kind === "external" ? (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className={linkClasses}
              >
                <span>{link.label}</span>
                <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <Link href={link.href} className={linkClasses}>
                <span>{link.label}</span>
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
