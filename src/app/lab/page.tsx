import type { Metadata } from "next";

import { SectionFrame } from "@/src/components/ui/section-frame";
import { LabHeader } from "@/src/components/sections/lab/lab-header";
import { LabRegistry } from "@/src/components/sections/lab/lab-registry";

export const metadata: Metadata = {
  title: "Lab — Messy Hub",
  description:
    "Exploratory sandbox for frontend experiments, interactive motion, Three.js scenes, and shader explorations.",
};

export default function LabPage() {
  return (
    <div className="flex flex-col gap-10 sm:gap-14 lg:gap-16 pb-12 sm:pb-16 pt-6 sm:pt-10">
      <SectionFrame>
        <div className="flex flex-col gap-8 sm:gap-10">
          <LabHeader />
          <LabRegistry />
        </div>
      </SectionFrame>
    </div>
  );
}
