import { Button } from "@/components/ui/button";
import { Target, Users, Skull } from "lucide-react";
import heroImage from "@/assets/hero-extraction.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-hero-gradient" />
      
      {/* Scanlines Effect */}
      <div className="absolute inset-0 scanlines pointer-events-none" />
      
      {/* Fog Overlay */}
      <div className="absolute inset-0 fog-overlay pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-slide-up">
          {/* Pre-title */}
          <p className="text-accent uppercase tracking-[0.3em] text-sm md:text-base mb-4 animate-flicker">
            Extraction Shooter Coopératif
          </p>
          
          {/* Main Title */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-glow">
            <span className="text-foreground">PRIMAL</span>
            <br />
            <span className="text-primary">EXTRACTION</span>
          </h1>
          
          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Chassez. Capturez. Extrayez. Survivez dans un monde préhistorique brutal 
            où chaque mission peut être votre dernière.
          </p>
          
          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <StatBadge icon={<Users className="w-5 h-5" />} label="2-5 Joueurs" />
            <StatBadge icon={<Target className="w-5 h-5" />} label="PVP + PVE" />
            <StatBadge icon={<Skull className="w-5 h-5" />} label="Hardcore" />
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl">
              Rejoindre l'Expédition
            </Button>
            <Button variant="outline" size="xl">
              Voir le Gameplay
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

const StatBadge = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border border-border rounded-lg backdrop-blur-sm">
    <span className="text-accent">{icon}</span>
    <span className="text-foreground font-medium tracking-wide">{label}</span>
  </div>
);

export default HeroSection;
