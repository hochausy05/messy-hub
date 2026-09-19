import type { ComponentType } from "react";

import type { LabExperiment } from "@/src/types/content";

/**
 * The implementation contract is intentionally small: an experiment owns its
 * component tree and lifecycle. Future entries can wrap a local implementation
 * with next/dynamic here without making the Lab index import it.
 */
export type LabExperimentComponent = ComponentType;

export type LabExperimentImplementation = {
  component: LabExperimentComponent;
};

/**
 * Implementation mapping, separate from authored metadata in src/content/lab.
 * It stays empty until a real experiment is approved and implemented.
 */
export const labExperimentImplementations: Partial<
  Record<LabExperiment["slug"], LabExperimentImplementation>
> = {
  // Example for a future task:
  // "approved-slug": { component: dynamic(() => import("./approved-slug")) },
};

export function getExperimentImplementation(
  slug: string,
): LabExperimentImplementation | undefined {
  return labExperimentImplementations[slug];
}
