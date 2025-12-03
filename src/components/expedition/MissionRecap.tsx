import { Target, MapPin, Clock, AlertTriangle } from "lucide-react";
import type { Mission } from "@/types/game";

interface MissionRecapProps {
  mission: Mission;
}

const difficultyConfig = {
  easy: { label: "Facile", color: "text-accent bg-accent/20 border-accent/30" },
  medium: { label: "Moyen", color: "text-primary bg-primary/20 border-primary/30" },
  hard: { label: "Difficile", color: "text-warning bg-warning/20 border-warning/30" },
  extreme: { label: "Extrême", color: "text-blood bg-blood/20 border-blood/30" },
};

const MissionRecap = ({ mission }: MissionRecapProps) => {
  const diff = difficultyConfig[mission.difficulty];
  
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          MISSION EN COURS
        </h2>
        <span className={`px-2 py-1 text-xs font-bold uppercase rounded border ${diff.color}`}>
          {diff.label}
        </span>
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <h3 className="font-display text-2xl font-bold text-primary">{mission.name}</h3>
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            <MapPin className="w-4 h-4" />
            <span>{mission.zone}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-secondary/30 rounded-lg">
            <p className="text-xs text-muted-foreground uppercase mb-1">Objectifs</p>
            <div className="space-y-1">
              {mission.targets.map((target, i) => (
                <div key={i} className="flex items-center gap-2 text-foreground text-sm">
                  <AlertTriangle className="w-3 h-3 text-warning" />
                  <span>{target}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-3 bg-secondary/30 rounded-lg">
            <p className="text-xs text-muted-foreground uppercase mb-1">Temps d'extraction</p>
            <div className="flex items-center gap-2 text-foreground">
              <Clock className="w-4 h-4 text-accent" />
              <span className="font-display font-bold">{mission.extractionTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionRecap;
