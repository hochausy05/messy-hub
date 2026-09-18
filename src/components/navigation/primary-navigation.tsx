"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { primaryNavigationItems } from "@/src/data/navigation";

function normalizePathname(pathname: string) {
  return pathname.replace(/\/$/, "") || "/";
}

export function PrimaryNavigation() {
  const pathname = normalizePathname(usePathname());

  return (
    <nav aria-label="Primary navigation">
      <ul className="primary-navigation__list">
        {primaryNavigationItems.map(({ href, label }) => {
          const isCurrent = pathname === href;

          return (
            <li key={href}>
              <Link href={href} aria-current={isCurrent ? "page" : undefined}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
