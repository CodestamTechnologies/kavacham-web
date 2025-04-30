import AboutSection from "@/components/main/about";
import CosmicUpdates from "@/components/main/feature";
import Footer from "@/components/main/footer";
import HeroSection from "@/components/main/hero";
import ServicesSection from "@/components/main/service";
import TestimonialsPage from "@/components/main/testimonal";
import HowItWorks from "@/components/main/work";

export default function Home() {
  return (
    <>
    <HeroSection />
    <AboutSection/>
    <ServicesSection/>
    <TestimonialsPage/>
    <HowItWorks/>
    <CosmicUpdates/>
    <Footer/>
    </>
  );
}