"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const destinations = [
  { href: "/", label: "Home" },
  { href: "/links", label: "Links" },
  { href: "/lab", label: "Lab" },
  { href: "/profile", label: "Profile" },
] as const;

function normalizePathname(pathname: string) {
  return pathname.replace(/\/$/, "") || "/";
}

export function PrimaryNavigation() {
  const pathname = normalizePathname(usePathname());

  return (
    <nav aria-label="Primary navigation">
      <ul className="primary-navigation__list">
        {destinations.map(({ href, label }) => {
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
