import { Shield, Eye, Wrench, Heart, Package } from "lucide-react";

const SquadSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                         linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-3">Coopération</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">FORMEZ VOTRE</span>{" "}
            <span className="text-primary">SQUAD</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Chaque rôle compte. Une squad bien coordonnée survit là où les loups solitaires périssent.
            Optimisé pour 3-5 joueurs, adaptable en solo.
          </p>
        </div>
        
        {/* Roles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <RoleCard
            icon={<Eye className="w-6 h-6" />}
            title="Traqueur"
            description="Repère les cibles et les menaces. Maître de la reconnaissance."
            color="accent"
          />
          <RoleCard
            icon={<Package className="w-6 h-6" />}
            title="Trappeur"
            description="Expert en capture vivante. Sédatifs, filets, cages."
            color="primary"
          />
          <RoleCard
            icon={<Shield className="w-6 h-6" />}
            title="Tank"
            description="Encaisse les dégâts. Protège la squad pendant l'extraction."
            color="blood"
          />
          <RoleCard
            icon={<Heart className="w-6 h-6" />}
            title="Support"
            description="Soins, réanimations, buffs. Maintient l'équipe en vie."
            color="accent"
          />
          <RoleCard
            icon={<Wrench className="w-6 h-6" />}
            title="Logisticien"
            description="Gère le transport du butin. Véhicules et dinos de bât."
            color="primary"
          />
        </div>
        
        {/* Cooperation Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <CoopFeature
            title="Loot Partagé"
            description="Tout le butin extrait est réparti équitablement. Succès collectif, récompense collective."
          />
          <CoopFeature
            title="Réanimations"
            description="Un coéquipier à terre n'est pas mort. Risquez tout pour le relever ou abandonnez-le."
          />
          <CoopFeature
            title="Extraction Coordonnée"
            description="Partir seul est possible. Partir ensemble multiplie les chances de survie."
          />
        </div>
      </div>
    </section>
  );
};

const RoleCard = ({ 
  icon, 
  title, 
  description,
  color
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  color: "primary" | "accent" | "blood";
}) => {
  const colorMap = {
    primary: {
      icon: "text-primary",
      border: "border-primary/30 hover:border-primary/60",
      bg: "bg-primary/5 hover:bg-primary/10"
    },
    accent: {
      icon: "text-accent",
      border: "border-accent/30 hover:border-accent/60",
      bg: "bg-accent/5 hover:bg-accent/10"
    },
    blood: {
      icon: "text-blood",
      border: "border-blood/30 hover:border-blood/60",
      bg: "bg-blood/5 hover:bg-blood/10"
    }
  };
  
  const colors = colorMap[color];
  
  return (
    <div className={`p-5 rounded-lg border transition-all duration-300 ${colors.border} ${colors.bg}`}>
      <div className={`mb-3 ${colors.icon}`}>{icon}</div>
      <h3 className="font-display text-lg font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const CoopFeature = ({ 
  title, 
  description 
}: { 
  title: string; 
  description: string;
}) => (
  <div className="text-center p-6 bg-secondary/30 border border-border rounded-lg">
    <h4 className="font-display text-xl font-bold text-primary mb-3">{title}</h4>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default SquadSection;
