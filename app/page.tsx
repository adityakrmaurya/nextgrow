import Hero from "@/components/home/Hero";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import Stats from "@/components/home/Stats";
import Services from "@/components/home/Services";
import WhyUs from "@/components/home/WhyUs";
import Process from "@/components/home/Process";
import CaseStudies from "@/components/home/CaseStudies";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <Stats />
      <Services />
      <WhyUs />
      <Process />
      <CaseStudies />
      <CTABanner />
    </>
  );
}
