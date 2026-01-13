import PreloaderShell from "@/components/landing/PreloaderShell";
import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/HeroSection";
import { readSiteContent } from "@/lib/siteContent";
import MiniProofStrip from "@/components/landing/MiniProofStrip";
import AboutSection from "@/components/landing/AboutSection";
import ServicesSection from "@/components/landing/ServicesSection";
import PricingSection from "@/components/landing/PricingSection";
import ProcessSection from "@/components/landing/ProcessSection";
import PortfolioSection from "@/components/landing/PortfolioSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FaqSection from "@/components/landing/FaqSection";
import FinalCtaSection from "@/components/landing/FinalCtaSection";
import Footer from "@/components/landing/Footer";

export default function Page() {
  const content = readSiteContent();
  return (
    <PreloaderShell>
      <div className="min-h-dvh bg-slate-950 text-white">
      <LandingHeader />
      <main>
        <HeroSection content={content} />
        <MiniProofStrip />
        <AboutSection />
        <ServicesSection />
        <PricingSection />
        <ProcessSection />
        <PortfolioSection />
        <TestimonialsSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
      </div>
    </PreloaderShell>
  );
}
