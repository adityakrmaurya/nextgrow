import Hero from "@/components/home/Hero";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import Services from "@/components/home/Services";
import Process from "@/components/home/Process";
import CaseStudies from "@/components/home/CaseStudies";
import Industries from "@/components/home/Industries";
import Founder from "@/components/home/Founder";
import Testimonials from "@/components/home/Testimonials";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <Services />
      <Process />
      <CaseStudies />
      <Industries />
      <Founder />
      <Testimonials />
      <Contact />
    </>
  );
}
