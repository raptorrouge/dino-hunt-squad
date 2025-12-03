import { Footprints, Shield, Truck, Swords, Star } from "lucide-react";
import type { DinoCompanion, DinoRole } from "@/types/game";

interface DinoCompanionStatusProps {
  companion: DinoCompanion | null;
}

const roleConfig: Record<DinoRole, { icon: typeof Shield; label: string; color: string }> = {
  scout: { icon: Footprints, label: "Scout", color: "text-accent" },
  tank: { icon: Shield, label: "Tank", color: "text-blood" },
  transport: { icon: Truck, label: "Transport", color: "text-primary" },
  combat: { icon: Swords, label: "Combat", color: "text-warning" },
};

const DinoCompanionStatus = ({ companion }: DinoCompanionStatusProps) => {
  if (!companion) {
    return (
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-muted-foreground text-center">Aucun compagnon assigné</p>
      </div>
    );
  }

  const role = roleConfig[companion.role];
  const RoleIcon = role.icon;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
          <Footprints className="w-5 h-5 text-primary" />
          COMPAGNON
        </h2>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-lg bg-secondary flex items-center justify-center ${role.color}`}>
            <RoleIcon className="w-7 h-7" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-foreground text-lg">{companion.name}</h3>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-foreground">Nv.{companion.level}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{companion.species}</p>
            <div className={`mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${role.color} bg-secondary`}>
              <RoleIcon className="w-3 h-3" />
              <span>{role.label}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DinoCompanionStatus;
