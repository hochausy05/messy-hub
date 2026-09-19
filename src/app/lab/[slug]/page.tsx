import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ExperimentFrame } from "@/src/components/lab/experiment-frame";
import {
  getExperimentBySlug,
  isExperimentOpenable,
} from "@/src/content/lab";
import { getExperimentImplementation } from "@/src/experiments";

type ExperimentPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ExperimentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const experiment = getExperimentBySlug(slug);

  return {
    title: experiment ? `${experiment.title} — Lab — Messy Hub` : "Lab — Messy Hub",
    description: experiment?.description ?? "Messy Hub Lab experiment.",
  };
}

export default async function ExperimentPage({
  params,
}: ExperimentPageProps) {
  const { slug } = await params;
  const experiment = getExperimentBySlug(slug);
  const implementation = experiment
    ? getExperimentImplementation(experiment.slug)
    : undefined;

  if (!experiment || !isExperimentOpenable(experiment) || !implementation) {
    notFound();
  }

  const Experiment = implementation.component;

  return (
    <ExperimentFrame experiment={experiment}>
      <Experiment />
    </ExperimentFrame>
  );
}
