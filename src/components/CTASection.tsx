import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-jungle-dark relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] animate-pulse-glow" />
      </div>
      
      {/* Border Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-glow">
          <span className="text-foreground">PRÊT POUR</span>
          <br />
          <span className="text-primary">L'EXTRACTION ?</span>
        </h2>
        
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Rejoignez la chasse. Formez votre squad. Capturez les créatures les plus dangereuses 
          jamais parcourues sur cette terre. Mais n'oubliez pas : 
          <span className="text-primary font-semibold"> seuls les survivants gardent le butin.</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="xl" className="group">
            Commencer la Chasse
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" size="xl">
            Rejoindre le Discord
          </Button>
        </div>
        
        {/* Stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-12">
          <CTAStat value="24+" label="Espèces à Capturer" />
          <CTAStat value="8" label="Zones d'Extraction" />
          <CTAStat value="∞" label="Raids Possibles" />
        </div>
      </div>
    </section>
  );
};

const CTAStat = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <p className="font-display text-4xl md:text-5xl font-bold text-primary text-glow mb-2">{value}</p>
    <p className="text-muted-foreground uppercase tracking-wider text-sm">{label}</p>
  </div>
);

export default CTASection;
