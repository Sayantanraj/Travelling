import HeroSection from "@/components/hero/HeroSection";
import AnniversaryBand from "@/components/sections/AnniversaryBand";
import BumperCarousel from "@/components/sections/BumperCarousel";
import SeasonalTours from "@/components/sections/SeasonalTours";
import FeaturedRows from "@/components/sections/FeaturedRows";
import BranchMap from "@/components/sections/BranchMap";
import WhyHowladar from "@/components/sections/WhyHowladar";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AnniversaryBand />
      <BumperCarousel />
      <SeasonalTours />
      <FeaturedRows />
      <WhyHowladar />
      <BranchMap />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
