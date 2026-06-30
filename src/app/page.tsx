"use client"

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import LogoBelt from "@/components/layout/LogoBelt";
import Features from "@/components/layout/Features";
import HowItWorks from "@/components/layout/HowItWorks";
import AnalysisPreview from "@/components/layout/AnalysisPreview";
import Testimonials from "@/components/layout/Testimonials";
import Footer from "@/components/layout/Footer";
import Pricing from "@/components/UI/Pricing";
import FAQ from "@/components/layout/FAQ";
import CTASection from "@/components/layout/CTASection";

export default function App() {
  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <Navbar />
      <main>
        <Hero />
        <LogoBelt />
        <Features />
        <HowItWorks />
        <AnalysisPreview />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
