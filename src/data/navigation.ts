import type { HubDestination, NavigationItem } from "@/src/types/content";

export const primaryNavigationItems: readonly NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/links", label: "Links" },
  { href: "/lab", label: "Lab" },
  { href: "/profile", label: "Profile" },
];

export const hubDestinations: readonly HubDestination[] = [
  {
    id: "links",
    title: "Links",
    slug: "/links",
    href: "/links",
    index: "01",
    description:
      "A curated visual directory of connected websites, independent projects, and external destinations.",
    actionLabel: "Explore Links",
  },
  {
    id: "lab",
    title: "Lab",
    slug: "/lab",
    href: "/lab",
    index: "02",
    description:
      "An exploratory sandbox for frontend experiments, interactive motion, and creative visual code.",
    actionLabel: "Enter Lab",
  },
  {
    id: "profile",
    title: "Profile",
    slug: "/profile",
    href: "/profile",
    index: "03",
    description:
      "Personal perspective, background context, and the ideas driving this digital space.",
    actionLabel: "View Profile",
  },
];

