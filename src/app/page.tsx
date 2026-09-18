import { HomeHero } from "@/src/components/sections/home-hero";
import { HomeDestinations } from "@/src/components/sections/home-destinations";
import { HomeOverview } from "@/src/components/sections/home-overview";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 sm:gap-14 lg:gap-16 pb-12 sm:pb-16">
      <HomeHero />
      <HomeDestinations />
      <HomeOverview />
    </div>
  );
}
