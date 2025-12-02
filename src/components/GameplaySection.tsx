import { Crosshair, Syringe, Truck, AlertTriangle } from "lucide-react";

const GameplaySection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, hsl(var(--accent) / 0.2) 0%, transparent 40%)`
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-3">Boucle de Gameplay</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">CHASSER.</span>{" "}
            <span className="text-primary">CAPTURER.</span>{" "}
            <span className="text-accent">EXTRAIRE.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Chaque raid est une course contre la montre. Capturez vos cibles vivantes ou abattez-les, 
            mais n'oubliez jamais : l'extraction est tout ce qui compte.
          </p>
        </div>
        
        {/* Gameplay Loop Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GameplayCard
            icon={<Crosshair className="w-8 h-8" />}
            step="01"
            title="Traquer"
            description="Localisez votre cible dans les jungles denses et les vallées brumeuses. Chaque prédateur a ses habitudes."
            color="primary"
          />
          <GameplayCard
            icon={<Syringe className="w-8 h-8" />}
            step="02"
            title="Capturer"
            description="Sédation, immobilisation, transport. Les captures vivantes rapportent plus, mais coûtent du temps."
            color="accent"
          />
          <GameplayCard
            icon={<Truck className="w-8 h-8" />}
            step="03"
            title="Extraire"
            description="Rejoignez la zone d'extraction avant que les squads rivales ou les prédateurs alpha ne vous interceptent."
            color="primary"
          />
          <GameplayCard
            icon={<AlertTriangle className="w-8 h-8" />}
            step="04"
            title="Survivre"
            description="Un wipe signifie tout perdre. Gérez le risque, protégez votre butin, extrayez à temps."
            color="destructive"
          />
        </div>
        
        {/* Tension Banner */}
        <div className="mt-16 p-6 md:p-8 bg-danger-gradient border border-blood/30 rounded-lg text-center">
          <p className="text-lg md:text-xl font-medium text-foreground">
            <span className="text-blood font-bold">ATTENTION :</span> Rester plus longtemps = Plus de loot. 
            Mais chaque minute augmente le risque de{" "}
            <span className="text-primary font-bold">wipe total</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

const GameplayCard = ({ 
  icon, 
  step, 
  title, 
  description, 
  color 
}: { 
  icon: React.ReactNode; 
  step: string; 
  title: string; 
  description: string;
  color: "primary" | "accent" | "destructive";
}) => {
  const colorClasses = {
    primary: "text-primary border-primary/30 hover:border-primary/60",
    accent: "text-accent border-accent/30 hover:border-accent/60",
    destructive: "text-blood border-blood/30 hover:border-blood/60",
  };
  
  return (
    <div className={`group p-6 bg-card-gradient border rounded-lg transition-all duration-300 hover:shadow-card ${colorClasses[color]}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={colorClasses[color]}>{icon}</div>
        <span className="text-muted-foreground/50 font-display text-2xl font-bold">{step}</span>
      </div>
      <h3 className={`font-display text-xl font-bold mb-2 ${colorClasses[color]}`}>{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default GameplaySection;
