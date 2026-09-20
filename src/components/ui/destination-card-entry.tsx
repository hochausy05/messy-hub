"use client";

import dynamic from "next/dynamic";

import type { LinkDestination } from "@/src/types/content";

const DestinationCard = dynamic(() =>
  import("@/src/components/ui/destination-card").then(
    (module) => module.DestinationCard,
  ),
);

type DestinationCardEntryProps = {
  destination: LinkDestination;
};

export function DestinationCardEntry({ destination }: DestinationCardEntryProps) {
  return <DestinationCard destination={destination} />;
}
