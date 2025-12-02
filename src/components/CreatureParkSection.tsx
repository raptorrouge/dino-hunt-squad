import { Database, FlaskConical, Compass, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const CreatureParkSection = () => {
  return (
    <section className="py-24 bg-jungle-dark relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-3">Méta-Progression</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">VOTRE</span>{" "}
              <span className="text-primary">PARC</span>
              <br />
              <span className="text-accent">PRIMAL</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Les créatures capturées vivantes rejoignent votre parc personnel — un hub persistant 
              que vous développez au fil des raids réussis. Chaque dinosaure devient un atout stratégique.
            </p>
            
            <div className="space-y-4 mb-8">
              <ParkFeature
                icon={<Compass className="w-5 h-5" />}
                title="Expéditions Automatiques"
                description="Envoyez vos créatures farmer ADN, matériaux rares et composants tech"
              />
              <ParkFeature
                icon={<Database className="w-5 h-5" />}
                title="Compagnons de Mission"
                description="Montez-les, utilisez-les comme tanks, scouts ou mules de transport"
              />
              <ParkFeature
                icon={<FlaskConical className="w-5 h-5" />}
                title="Projets de Recherche"
                description="Débloquez améliorations d'équipement et technologies avancées"
              />
              <ParkFeature
                icon={<ShoppingCart className="w-5 h-5" />}
                title="Commerce Illicite"
                description="Vendez vos prises au marché noir pour des ressources premium"
              />
            </div>
            
            <Button variant="tech" size="lg">
              Explorer le Parc
            </Button>
          </div>
          
          {/* Right - Park Preview */}
          <div className="relative">
            <div className="bg-tech-gradient border border-accent/20 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl text-foreground">Parc de la Squad</h3>
                <span className="text-accent text-sm">Niveau 7</span>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <StatBox label="Créatures" value="12" />
                <StatBox label="Enclos" value="4/6" />
                <StatBox label="Expéditions" value="3" accent />
                <StatBox label="Ressources/h" value="+847" accent />
              </div>
              
              {/* Creature List Preview */}
              <div className="space-y-3">
                <CreatureRow name="Velociraptor Alpha" role="Scout" status="En mission" />
                <CreatureRow name="Carnotaurus" role="Tank" status="Disponible" />
                <CreatureRow name="Parasaurolophus" role="Transport" status="En mission" />
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-accent/30 rounded-lg rotate-12 -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-primary/20 rounded-lg -rotate-6 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

const ParkFeature = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-foreground mb-1">{title}</h4>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  </div>
);

const StatBox = ({ 
  label, 
  value, 
  accent = false 
}: { 
  label: string; 
  value: string; 
  accent?: boolean;
}) => (
  <div className="bg-secondary/30 border border-border rounded-lg p-4 text-center">
    <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">{label}</p>
    <p className={`font-display text-2xl font-bold ${accent ? 'text-accent' : 'text-foreground'}`}>
      {value}
    </p>
  </div>
);

const CreatureRow = ({ 
  name, 
  role, 
  status 
}: { 
  name: string; 
  role: string; 
  status: string;
}) => (
  <div className="flex items-center justify-between p-3 bg-secondary/20 border border-border/50 rounded-lg">
    <div>
      <p className="font-medium text-foreground text-sm">{name}</p>
      <p className="text-muted-foreground text-xs">{role}</p>
    </div>
    <span className={`text-xs px-2 py-1 rounded ${
      status === "Disponible" 
        ? "bg-accent/20 text-accent" 
        : "bg-primary/20 text-primary"
    }`}>
      {status}
    </span>
  </div>
);

export default CreatureParkSection;
