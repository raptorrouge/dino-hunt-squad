import { Users, Heart, Shield, Eye, Package, Wrench } from "lucide-react";
import type { SquadMember, SquadRole } from "@/types/game";

interface ExpeditionSquadStatusProps {
  members: SquadMember[];
  casualties: string[];
}

const roleConfig: Record<SquadRole, { icon: typeof Shield; label: string }> = {
  tracker: { icon: Eye, label: "Traqueur" },
  trapper: { icon: Package, label: "Trappeur" },
  tank: { icon: Shield, label: "Tank" },
  support: { icon: Heart, label: "Support" },
  logistics: { icon: Wrench, label: "Logisticien" },
};

const ExpeditionSquadStatus = ({ members, casualties }: ExpeditionSquadStatusProps) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
          <Users className="w-5 h-5 text-accent" />
          SQUAD STATUS
        </h2>
      </div>
      
      <div className="p-4 space-y-2">
        {members.map((member) => {
          const role = roleConfig[member.role];
          const RoleIcon = role.icon;
          const isDown = casualties.includes(member.name);
          
          return (
            <div
              key={member.id}
              className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                isDown 
                  ? "bg-blood/10 border-blood/30" 
                  : "bg-secondary/30 border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDown ? "bg-blood/20 text-blood" : "bg-accent/20 text-accent"
                }`}>
                  <RoleIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className={`font-medium ${isDown ? "text-blood line-through" : "text-foreground"}`}>
                    {member.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{role.label}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {isDown ? (
                  <span className="text-xs px-2 py-1 rounded bg-blood/20 text-blood font-medium">
                    À TERRE
                  </span>
                ) : (
                  <>
                    <Heart className="w-4 h-4 text-accent" />
                    <span className="text-sm text-foreground font-mono">100%</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpeditionSquadStatus;
