import { HomeBanner } from "@/components/HomeBanner";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { CompassionateCareBanner } from "@/components/CompassionateCareBanner";
import { TestimonialsSection } from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <main className="flex-1 overflow-x-hidden">
      <HomeBanner />
      <AboutSection />
      <ServicesSection />
      <CompassionateCareBanner />
      <TestimonialsSection />
    </main>
  );
}
