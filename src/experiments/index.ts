import type { ComponentType } from "react";
import dynamic from "next/dynamic";

import type { LabExperiment } from "@/src/types/content";

/**
 * The implementation contract is intentionally small: an experiment owns its
 * component tree and lifecycle. Only the experiment route imports this mapping;
 * the Lab index reads metadata without importing implementation modules.
 */
export type LabExperimentComponent = ComponentType;

export type LabExperimentImplementation = {
  component: LabExperimentComponent;
};

/**
 * Implementation mapping, separate from authored metadata in src/content/lab.
 */
export const labExperimentImplementations: Partial<
  Record<LabExperiment["slug"], LabExperimentImplementation>
> = {
  "kinetic-focus-grid": {
    component: dynamic(
      () => import("./kinetic-focus-grid/kinetic-focus-grid"),
    ),
  },
};

export function getExperimentImplementation(
  slug: string,
): LabExperimentImplementation | undefined {
  return labExperimentImplementations[slug];
}
