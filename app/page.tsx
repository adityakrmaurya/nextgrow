import Hero from "@/components/home/Hero";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import Stats from "@/components/home/Stats";
import Services from "@/components/home/Services";
import CaseStudies from "@/components/home/CaseStudies";
import Process from "@/components/home/Process";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <Stats />
      <Services />
      <Process />
      <CaseStudies />
      <CTABanner />
    </>
  );
}
