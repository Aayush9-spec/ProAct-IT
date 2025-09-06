import HeroSection from "@/components/HeroSection";
import AgentFeatures from "@/components/AgentFeatures";
import LiveDemo from "@/components/LiveDemo";
import SignupSection from "@/components/SignupSection";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <main className="min-h-screen">
      <HeroSection />
      <AgentFeatures />
      <LiveDemo />
      <SignupSection />
    </main>
  );
};

export default Index;