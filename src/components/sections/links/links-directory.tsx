import { DestinationCardEntry } from "@/src/components/ui/destination-card-entry";
import { LinksEmptyState } from "./links-empty-state";
import { linkDestinations } from "@/src/content/links";
import type { LinkDestination } from "@/src/types/content";

export function LinksDirectory() {
  const allDestinations: readonly LinkDestination[] = linkDestinations;
  // Only display published destinations (or items without an explicit draft status)
  const approvedDestinations = allDestinations.filter(
    (item) => item.status !== "draft"
  );

  if (approvedDestinations.length === 0) {
    return <LinksEmptyState />;
  }

  return (
    <section aria-labelledby="directory-heading" className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
        <h2
          id="directory-heading"
          className="font-mono text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]"
        >
          All Destinations ({approvedDestinations.length})
        </h2>
        <span className="font-mono text-xs text-[var(--text-muted)]">
          Index 01 &ndash; {String(approvedDestinations.length).padStart(2, "0")}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {approvedDestinations.map((destination) => (
          <DestinationCardEntry key={destination.id} destination={destination} />
        ))}
      </div>
    </section>
  );
}
