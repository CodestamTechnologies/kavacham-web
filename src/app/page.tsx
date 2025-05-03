import AboutSection from "@/components/main/about";
import { CosmicWaitlist } from "@/components/main/feature";
import HeroSection from "@/components/main/hero";
import ServicesSection from "@/components/main/service";
import TestimonialsPage from "@/components/main/testimonal";
import HowItWorks from "@/components/main/work";

export default function Home() {
  return (
    <>
    <HeroSection />
    <CosmicWaitlist/>
    <AboutSection/>
    <ServicesSection/>
    <TestimonialsPage/>
    <HowItWorks/>
    
    </>
  );
}