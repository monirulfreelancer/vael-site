import CaseStudies from "@/components/CaseStudies";
import ClientLogos from "@/components/ClientLogos";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ClientLogos />
        <Services />
        <CaseStudies />
        <Process />
        <Pricing />
      </main>
    </>
  );
}
