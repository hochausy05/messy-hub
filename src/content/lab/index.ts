import type { LabExperiment } from "@/src/types/content";

/**
 * Authoritative registry of Lab experiments.
 */
export const labExperiments: readonly LabExperiment[] = [
  {
    id: "015",
    title: "Kinetic Focus Grid",
    slug: "kinetic-focus-grid",
    category: "motion",
    status: "active",
    description:
      "An interactive motion study exploring focus, hierarchy, and spatial response across a responsive grid.",
  },
  {
    id: "016",
    title: "Spatial Node Field",
    slug: "spatial-node-field",
    category: "three",
    status: "active",
    description:
      "A three-dimensional study of pointer proximity, connected nodes, and restrained spatial response.",
  },
];

/**
 * Resolve the navigation route for a given experiment record.
 */
export function getExperimentHref(experiment: LabExperiment): string {
  return experiment.href ?? `/lab/${experiment.slug}`;
}

/**
 * Check whether an experiment can currently be launched in the browser.
 */
export function isExperimentOpenable(experiment: LabExperiment): boolean {
  return experiment.status === "active" || experiment.status === "prototype";
}

/**
 * Resolve metadata without coupling the content registry to React modules.
 */
export function getExperimentBySlug(slug: string): LabExperiment | undefined {
  return labExperiments.find((experiment) => experiment.slug === slug);
}
