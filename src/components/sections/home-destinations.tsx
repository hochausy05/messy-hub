import { SectionFrame } from "@/src/components/ui/section-frame";
import { DestinationEntry } from "@/src/components/ui/destination-entry";
import { hubDestinations } from "@/src/data/navigation";

export function HomeDestinations() {
  return (
    <SectionFrame
      id="destinations"
      aria-labelledby="destinations-heading"
      className="pt-4"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
            Hub Portals
          </div>
          <h2
            id="destinations-heading"
            className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl"
          >
            Core Destinations
          </h2>
          <p className="max-w-xl text-sm text-[var(--text-secondary)] sm:text-base">
            Direct entry points into the primary areas of the hub. Each space serves a
            distinct functional and creative role.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {hubDestinations.map((destination) => (
            <DestinationEntry key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
