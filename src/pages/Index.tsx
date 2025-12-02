import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GameplaySection from "@/components/GameplaySection";
import CreatureParkSection from "@/components/CreatureParkSection";
import SquadSection from "@/components/SquadSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <section id="gameplay">
        <GameplaySection />
      </section>
      <section id="parc">
        <CreatureParkSection />
      </section>
      <section id="squad">
        <SquadSection />
      </section>
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
