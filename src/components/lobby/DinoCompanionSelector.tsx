import { Footprints, Shield, Truck, Swords, Star } from "lucide-react";
import type { DinoCompanion } from "@/types/game";

interface DinoCompanionSelectorProps {
  companions: DinoCompanion[];
  selectedCompanion: string | null;
  onSelectCompanion: (id: string) => void;
}

const roleConfig = {
  scout: { icon: Footprints, label: "Scout", color: "text-accent" },
  tank: { icon: Shield, label: "Tank", color: "text-blood" },
  transport: { icon: Truck, label: "Transport", color: "text-primary" },
  combat: { icon: Swords, label: "Combat", color: "text-warning" },
};

const DinoCompanionSelector = ({ 
  companions, 
  selectedCompanion, 
  onSelectCompanion 
}: DinoCompanionSelectorProps) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
          <Footprints className="w-5 h-5 text-primary" />
          COMPAGNON DE MISSION
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Sélectionnez un dinosaure pour vous accompagner
        </p>
      </div>
      
      <div className="p-4">
        <div className="grid sm:grid-cols-3 gap-3">
          {companions.map((companion) => {
            const role = roleConfig[companion.role];
            const RoleIcon = role.icon;
            const isSelected = selectedCompanion === companion.id;
            
            return (
              <button
                key={companion.id}
                onClick={() => onSelectCompanion(companion.id)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  isSelected 
                    ? "bg-tech-gradient border-accent shadow-tech" 
                    : "bg-secondary/30 border-border hover:border-accent/50"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center ${role.color}`}>
                    <RoleIcon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-primary" />
                    <span className="text-sm font-bold text-foreground">Nv.{companion.level}</span>
                  </div>
                </div>
                
                <h3 className="font-display font-bold text-foreground">{companion.name}</h3>
                <p className="text-sm text-muted-foreground">{companion.species}</p>
                
                <div className={`mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${role.color} bg-secondary`}>
                  <RoleIcon className="w-3 h-3" />
                  <span>{role.label}</span>
                </div>
                
                {isSelected && (
                  <div className="mt-3 pt-2 border-t border-accent/30">
                    <p className="text-accent text-xs font-medium uppercase">✓ Assigné</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DinoCompanionSelector;
