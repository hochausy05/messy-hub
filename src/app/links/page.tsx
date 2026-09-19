import type { Metadata } from "next";

import { SectionFrame } from "@/src/components/ui/section-frame";
import { LinksHeader } from "@/src/components/sections/links/links-header";
import { LinksDirectory } from "@/src/components/sections/links/links-directory";

export const metadata: Metadata = {
  title: "Links — Messy Hub",
  description:
    "Curated visual directory of connected websites, external projects, and referenced destinations.",
};

export default function LinksPage() {
  return (
    <div className="flex flex-col gap-10 sm:gap-14 lg:gap-16 pb-12 sm:pb-16 pt-6 sm:pt-10">
      <SectionFrame>
        <div className="flex flex-col gap-8 sm:gap-10">
          <LinksHeader />
          <LinksDirectory />
        </div>
      </SectionFrame>
    </div>
  );
}
