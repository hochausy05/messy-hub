import type { LabExperiment } from "@/src/types/content";

/**
 * Authoritative registry of Lab experiments.
 * TASK-013 establishes discovery/index architecture only.
 * Initial experiments will be registered in TASK-015 and TASK-016.
 */
export const labExperiments: readonly LabExperiment[] = [];

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
