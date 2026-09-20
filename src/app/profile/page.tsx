import type { Metadata } from "next";

import { ProfileIntro } from "@/src/components/sections/profile/profile-intro";
import { SectionFrame } from "@/src/components/ui/section-frame";
import { profileContent } from "@/src/content/profile";

export const metadata: Metadata = {
  title: "Profile — Messy Hub",
  description: profileContent.bio,
};

export default function ProfilePage() {
  return (
    <div className="pb-12 pt-6 sm:pb-16 sm:pt-10 lg:pt-14">
      <SectionFrame>
        <ProfileIntro content={profileContent} />
      </SectionFrame>
    </div>
  );
}
