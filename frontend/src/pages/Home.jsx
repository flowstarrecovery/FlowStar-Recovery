import { useEffect } from "react";
import Hero from "@/components/site/Hero";
import StatsRibbon from "@/components/site/StatsRibbon";
import Process from "@/components/site/Process";
import ClaimChecker from "@/components/site/ClaimChecker";
import About from "@/components/site/About";
import BlogPreview from "@/components/site/BlogPreview";
import FAQ from "@/components/site/FAQ";
import Contact from "@/components/site/Contact";

export default function Home() {
  useEffect(() => {
    // smooth scroll to hash on load
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, []);

  return (
    <div data-testid="home-page">
      <Hero />
      <StatsRibbon />
      <Process />
      <ClaimChecker />
      <About />
      <BlogPreview />
      <FAQ />
      <Contact />
    </div>
  );
}
