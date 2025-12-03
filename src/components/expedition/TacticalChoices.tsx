import { Shield, Zap, Target, Skull, Search, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ExpeditionPhase, TacticalChoice, CaptureChoice, ExtractionChoice } from "@/types/game";

interface TacticalChoicesProps {
  phase: ExpeditionPhase;
  onApproachChoice: (choice: TacticalChoice) => void;
  onCaptureChoice: (choice: CaptureChoice) => void;
  onExtractionChoice: (choice: ExtractionChoice) => void;
  onAdvance: () => void;
}

const TacticalChoices = ({ 
  phase, 
  onApproachChoice, 
  onCaptureChoice, 
  onExtractionChoice,
  onAdvance 
}: TacticalChoicesProps) => {
  
  // Phases that just need to advance
  if (phase === "briefing" || phase === "insertion" || phase === "first_contact") {
    const phaseMessages = {
      briefing: "L'équipe révise les objectifs et prépare l'équipement...",
      insertion: "Approche discrète de la zone cible en cours...",
      first_contact: "Cible repérée ! La squad prend position...",
    };
    
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <p className="text-muted-foreground mb-4">{phaseMessages[phase]}</p>
        <Button onClick={onAdvance} variant="default" size="lg">
          Continuer
        </Button>
      </div>
    );
  }
  
  // Tactical approach decision
  if (phase === "tactical_decision") {
    return (
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-display text-lg font-bold text-foreground">
            CHOIX TACTIQUE
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Comment aborder la cible ?
          </p>
        </div>
        
        <div className="p-4 grid sm:grid-cols-2 gap-4">
          <ChoiceButton
            icon={<Shield className="w-6 h-6" />}
            title="Approche Prudente"
            description="Minimise les risques, maximise la survie de l'équipe"
            color="accent"
            onClick={() => onApproachChoice("safe")}
          />
          <ChoiceButton
            icon={<Zap className="w-6 h-6" />}
            title="Attaque Agressive"
            description="Plus rapide mais plus dangereux pour la squad"
            color="warning"
            onClick={() => onApproachChoice("aggressive")}
          />
        </div>
      </div>
    );
  }
  
  // Capture method decision
  if (phase === "capture_decision") {
    return (
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-display text-lg font-bold text-foreground">
            MÉTHODE DE CAPTURE
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Capture vivante ou élimination ?
          </p>
        </div>
        
        <div className="p-4 grid sm:grid-cols-2 gap-4">
          <ChoiceButton
            icon={<Target className="w-6 h-6" />}
            title="Capture Vivante"
            description="Difficile mais récompense +50%. Spécimen pour le parc."
            color="accent"
            onClick={() => onCaptureChoice("capture")}
          />
          <ChoiceButton
            icon={<Skull className="w-6 h-6" />}
            title="Élimination"
            description="Plus simple et sûr. ADN et composants récupérables."
            color="blood"
            onClick={() => onCaptureChoice("eliminate")}
          />
        </div>
      </div>
    );
  }
  
  // Extraction decision
  if (phase === "extraction_decision") {
    return (
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-display text-lg font-bold text-foreground">
            EXTRACTION
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Fouiller la zone ou extraire maintenant ?
          </p>
        </div>
        
        <div className="p-4 grid sm:grid-cols-2 gap-4">
          <ChoiceButton
            icon={<Search className="w-6 h-6" />}
            title="Fouiller Plus"
            description="Bonus de ressources mais risque accru d'embuscade"
            color="primary"
            onClick={() => onExtractionChoice("search_more")}
          />
          <ChoiceButton
            icon={<Truck className="w-6 h-6" />}
            title="Extraire Maintenant"
            description="Sécurise le butin actuel, minimise les risques"
            color="accent"
            onClick={() => onExtractionChoice("extract_now")}
          />
        </div>
      </div>
    );
  }
  
  // Extracting phase
  if (phase === "extracting") {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <div className="animate-pulse mb-4">
          <Truck className="w-12 h-12 text-primary mx-auto" />
        </div>
        <p className="text-foreground font-medium mb-2">Extraction en cours...</p>
        <p className="text-muted-foreground text-sm mb-4">Calcul des résultats de mission</p>
        <Button onClick={onAdvance} variant="hero" size="lg">
          Voir les Résultats
        </Button>
      </div>
    );
  }
  
  return null;
};

const ChoiceButton = ({
  icon,
  title,
  description,
  color,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "primary" | "accent" | "warning" | "blood";
  onClick: () => void;
}) => {
  const colorClasses = {
    primary: "border-primary/30 hover:border-primary hover:bg-primary/10 text-primary",
    accent: "border-accent/30 hover:border-accent hover:bg-accent/10 text-accent",
    warning: "border-warning/30 hover:border-warning hover:bg-warning/10 text-warning",
    blood: "border-blood/30 hover:border-blood hover:bg-blood/10 text-blood",
  };
  
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${colorClasses[color]}`}
    >
      <div className="mb-3">{icon}</div>
      <h4 className="font-display font-bold text-foreground mb-1">{title}</h4>
      <p className="text-muted-foreground text-sm">{description}</p>
    </button>
  );
};

export default TacticalChoices;
