import { Trophy, AlertTriangle, XCircle, Coins, Star, Package, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ExpeditionResult } from "@/types/game";

interface MissionResultProps {
  result: ExpeditionResult;
  onReturnToLobby: () => void;
}

const outcomeConfig = {
  success: {
    icon: Trophy,
    title: "MISSION RÉUSSIE",
    color: "text-accent",
    bgColor: "bg-accent/10 border-accent/30",
  },
  partial: {
    icon: AlertTriangle,
    title: "SUCCÈS PARTIEL",
    color: "text-warning",
    bgColor: "bg-warning/10 border-warning/30",
  },
  failure: {
    icon: XCircle,
    title: "MISSION ÉCHOUÉE",
    color: "text-blood",
    bgColor: "bg-blood/10 border-blood/30",
  },
};

const MissionResult = ({ result, onReturnToLobby }: MissionResultProps) => {
  const config = outcomeConfig[result.outcome];
  const OutcomeIcon = config.icon;
  
  return (
    <div className="space-y-6">
      {/* Outcome Header */}
      <div className={`p-6 rounded-lg border ${config.bgColor} text-center`}>
        <OutcomeIcon className={`w-16 h-16 mx-auto mb-4 ${config.color}`} />
        <h2 className={`font-display text-3xl font-bold ${config.color}`}>
          {config.title}
        </h2>
        <p className="text-muted-foreground mt-2">{result.missionName}</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard
          icon={<Coins className="w-5 h-5" />}
          label="Crédits Gagnés"
          value={`${result.creditsEarned.toLocaleString()} CR`}
          color="primary"
        />
        <StatCard
          icon={<Star className="w-5 h-5" />}
          label="XP Gagnée"
          value={`+${result.xpEarned} XP`}
          color="accent"
        />
        <StatCard
          icon={<Package className="w-5 h-5" />}
          label="Objets Récupérés"
          value={`${result.loot.length}`}
          color="primary"
        />
      </div>
      
      {/* Loot List */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-display text-lg font-bold text-foreground">BUTIN RÉCUPÉRÉ</h3>
        </div>
        <div className="p-4">
          <div className="space-y-2">
            {result.loot.map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-2 bg-secondary/30 rounded-lg"
              >
                <Package className="w-4 h-4 text-primary" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Casualties */}
      {result.casualties.length > 0 && (
        <div className="bg-blood/10 border border-blood/30 rounded-lg p-4">
          <h3 className="font-display text-lg font-bold text-blood mb-3">PERTES</h3>
          <div className="space-y-2">
            {result.casualties.map((name, index) => (
              <div key={index} className="flex items-center gap-2 text-blood">
                <XCircle className="w-4 h-4" />
                <span>{name} - À terre</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Capture Status */}
      {result.capturedAlive && (
        <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 text-center">
          <Trophy className="w-8 h-8 text-accent mx-auto mb-2" />
          <p className="text-accent font-bold">SPÉCIMEN CAPTURÉ VIVANT !</p>
          <p className="text-muted-foreground text-sm">Transféré vers votre parc</p>
        </div>
      )}
      
      {/* Return Button */}
      <Button 
        onClick={onReturnToLobby} 
        variant="hero" 
        size="xl" 
        className="w-full"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        RETOUR AU LOBBY
      </Button>
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: "primary" | "accent";
}) => (
  <div className="bg-card border border-border rounded-lg p-4 text-center">
    <div className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-2 ${
      color === "primary" ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
    }`}>
      {icon}
    </div>
    <p className="text-xs text-muted-foreground uppercase mb-1">{label}</p>
    <p className={`font-display text-xl font-bold ${
      color === "primary" ? "text-primary" : "text-accent"
    }`}>
      {value}
    </p>
  </div>
);

export default MissionResult;
