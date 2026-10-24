import type { Metadata } from "next";
import { AboutSection } from "@/components/AboutSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import petlioData from "@/data/petlio.json";

export const metadata: Metadata = {
  title: `About Us | ${petlioData.site.name}`,
  description: petlioData.about.description,
};

export default function AboutPage() {
  return (
    <main className="flex-1 overflow-hidden">
      <AboutSection showCta={false} />
      <WhyChooseUs />
    </main>
  );
}
