import { SectionFrame } from "@/src/components/ui/section-frame";

const principles = [
  {
    index: "A",
    title: "DOM-First Resilience",
    description:
      "All essential content, navigation paths, and interactive controls are rooted in semantic HTML, ensuring full accessibility before visual layers engage.",
  },
  {
    index: "B",
    title: "Bounded Sandboxes",
    description:
      "Heavy client motion and WebGL scenes are strictly route-scoped within the Lab, preserving performance and stability across the core hub.",
  },
  {
    index: "C",
    title: "Interconnected Presence",
    description:
      "Built as a modular junction for independent web projects, experimental code, and authored thoughts, avoiding generic resume and SaaS conventions.",
  },
] as const;

export function HomeOverview() {
  return (
    <SectionFrame
      id="architecture"
      aria-labelledby="architecture-heading"
      className="pt-4"
    >
      <div
        data-motion="overview-section"
        className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-base)] p-6 sm:p-8 lg:p-10"
      >
        <div className="flex flex-col gap-2 border-b border-[var(--border-subtle)] pb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
            System Design
          </div>
          <h2
            id="architecture-heading"
            className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl"
          >
            Hub Architecture
          </h2>
          <p className="max-w-2xl text-sm text-[var(--text-secondary)] sm:text-base">
            Guiding principles defining how Messy Hub balances creative exploration with
            rock-solid reliability.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {principles.map((item) => (
            <div
              key={item.index}
              data-motion="overview-item"
              className="flex flex-col gap-2.5"
            >
              <span className="font-mono text-xs font-semibold text-[var(--border-focus)]">
                [{item.index}]
              </span>
              <h3 className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
