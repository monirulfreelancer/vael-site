import About from "@/components/About";
import CaseStudies from "@/components/CaseStudies";
import ClientLogos from "@/components/ClientLogos";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

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
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
