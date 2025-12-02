import { Users, Shield, Eye, Package, Heart, Wrench, Check, X } from "lucide-react";
import type { SquadMember } from "@/pages/Lobby";

interface SquadPanelProps {
  members: SquadMember[];
  onChangeRole: (role: SquadMember["role"]) => void;
}

const roleConfig = {
  tracker: { icon: Eye, label: "Traqueur", color: "text-accent" },
  trapper: { icon: Package, label: "Trappeur", color: "text-primary" },
  tank: { icon: Shield, label: "Tank", color: "text-blood" },
  support: { icon: Heart, label: "Support", color: "text-accent" },
  logistics: { icon: Wrench, label: "Logisticien", color: "text-primary" },
};

const SquadPanel = ({ members, onChangeRole }: SquadPanelProps) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
          <Users className="w-5 h-5 text-accent" />
          VOTRE SQUAD
        </h2>
      </div>
      
      <div className="p-4 space-y-3">
        {members.map((member) => {
          const role = roleConfig[member.role];
          const RoleIcon = role.icon;
          
          return (
            <div
              key={member.id}
              className={`p-3 rounded-lg border transition-all ${
                member.isLocal 
                  ? "bg-primary/5 border-primary/30" 
                  : "bg-secondary/30 border-border"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center ${role.color}`}>
                    <RoleIcon className="w-5 h-5" />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{member.name}</p>
                      {member.isLocal && (
                        <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded">
                          VOUS
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${role.color}`}>{role.label}</p>
                  </div>
                </div>
                
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  member.ready 
                    ? "bg-accent/20 text-accent" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {member.ready ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </div>
              </div>
              
              {member.isLocal && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground uppercase mb-2">Changer de rôle</p>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(roleConfig) as Array<keyof typeof roleConfig>).map((roleKey) => {
                      const r = roleConfig[roleKey];
                      const Icon = r.icon;
                      const isActive = member.role === roleKey;
                      
                      return (
                        <button
                          key={roleKey}
                          onClick={() => onChangeRole(roleKey)}
                          className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-all ${
                            isActive 
                              ? "bg-primary/20 text-primary border border-primary/50" 
                              : "bg-secondary text-muted-foreground border border-border hover:border-primary/30"
                          }`}
                        >
                          <Icon className="w-3 h-3" />
                          <span>{r.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        
        {/* Empty Slots */}
        {Array.from({ length: 5 - members.length }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="p-3 rounded-lg border border-dashed border-border bg-secondary/10"
          >
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center">
                <Users className="w-5 h-5 opacity-30" />
              </div>
              <p className="text-sm">Slot disponible</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SquadPanel;
