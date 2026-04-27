import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Bestsellers } from "@/components/Bestsellers";
import { WhyUs } from "@/components/WhyUs";
import { Results } from "@/components/Results";
import { CTABanner } from "@/components/CTABanner";
import { Footer } from "@/components/Footer";
import { ConsultationChatbot } from "@/components/ConsultationChatbot";
import { FloatingCTA } from "@/components/FloatingCTA";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [chatOpen, setChatOpen] = useState(false);
  const open = () => setChatOpen(true);
  const close = () => setChatOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenChatbot={open} />
      <main>
        <Hero onOpenChatbot={open} />
        <Bestsellers />
        <WhyUs />
        <Results />
        <CTABanner onOpenChatbot={open} />
      </main>
      <Footer />
      <FloatingCTA onClick={open} />
      <ConsultationChatbot open={chatOpen} onClose={close} />
    </div>
  );
}
