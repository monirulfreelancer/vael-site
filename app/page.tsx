import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

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
        <Testimonials />
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
