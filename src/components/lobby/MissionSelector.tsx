import { MapPin, Clock, Target, Star } from "lucide-react";
import type { Mission } from "@/types/game";

interface MissionSelectorProps {
  missions: Mission[];
  selectedMission: Mission | null;
  onSelectMission: (mission: Mission) => void;
}

const MissionSelector = ({ missions, selectedMission, onSelectMission }: MissionSelectorProps) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          SÉLECTION DE MISSION
        </h2>
      </div>
      
      <div className="p-4 space-y-3">
        {missions.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            isSelected={selectedMission?.id === mission.id}
            onSelect={() => onSelectMission(mission)}
          />
        ))}
      </div>
    </div>
  );
};

const MissionCard = ({ 
  mission, 
  isSelected, 
  onSelect 
}: { 
  mission: Mission; 
  isSelected: boolean; 
  onSelect: () => void;
}) => {
  const difficultyConfig = {
    easy: { label: "Facile", color: "text-accent bg-accent/20 border-accent/30" },
    medium: { label: "Moyen", color: "text-primary bg-primary/20 border-primary/30" },
    hard: { label: "Difficile", color: "text-warning bg-warning/20 border-warning/30" },
    extreme: { label: "Extrême", color: "text-blood bg-blood/20 border-blood/30" },
  };
  
  const diff = difficultyConfig[mission.difficulty];
  
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
        isSelected 
          ? "bg-primary/10 border-primary shadow-glow" 
          : "bg-secondary/30 border-border hover:border-primary/50 hover:bg-secondary/50"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">{mission.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <MapPin className="w-4 h-4" />
            <span>{mission.zone}</span>
          </div>
        </div>
        
        <span className={`px-2 py-1 text-xs font-bold uppercase rounded border ${diff.color}`}>
          {diff.label}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground text-xs uppercase mb-1">Cibles</p>
          <div className="text-foreground">
            {mission.targets.map((t, i) => (
              <div key={i} className="flex items-center gap-1">
                <Target className="w-3 h-3 text-primary" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-muted-foreground text-xs uppercase mb-1">Temps</p>
          <div className="flex items-center gap-1 text-foreground">
            <Clock className="w-3 h-3 text-accent" />
            <span>{mission.extractionTime}</span>
          </div>
        </div>
        
        <div>
          <p className="text-muted-foreground text-xs uppercase mb-1">Récompenses</p>
          <div className="flex items-center gap-1 text-foreground">
            <Star className="w-3 h-3 text-primary" />
            <span>{mission.rewards}</span>
          </div>
        </div>
      </div>
      
      {isSelected && (
        <div className="mt-3 pt-3 border-t border-primary/30">
          <p className="text-primary text-sm font-medium uppercase tracking-wide">
            ✓ Mission sélectionnée
          </p>
        </div>
      )}
    </button>
  );
};

export default MissionSelector;
