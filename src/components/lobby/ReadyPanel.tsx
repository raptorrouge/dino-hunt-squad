import { Rocket, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Mission } from "@/types/game";

interface ReadyPanelProps {
  isReady: boolean;
  allReady: boolean;
  selectedMission: Mission | null;
  selectedCompanion: boolean;
  onToggleReady: () => void;
  onLaunch: () => void;
}

const ReadyPanel = ({ 
  isReady, 
  allReady, 
  selectedMission, 
  selectedCompanion,
  onToggleReady,
  onLaunch 
}: ReadyPanelProps) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
          <Rocket className="w-5 h-5 text-primary" />
          LANCEMENT
        </h2>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Status Checks */}
        <div className="space-y-2">
          <StatusCheck 
            label="Mission sélectionnée" 
            checked={!!selectedMission} 
          />
          <StatusCheck 
            label="Compagnon sélectionné" 
            checked={selectedCompanion} 
          />
          <StatusCheck 
            label="Vous êtes prêt" 
            checked={isReady} 
          />
          <StatusCheck 
            label="Squad prête" 
            checked={allReady} 
          />
        </div>
        
        {/* Selected Mission Summary */}
        {selectedMission && (
          <div className="p-3 bg-secondary/30 border border-border rounded-lg">
            <p className="text-xs text-muted-foreground uppercase mb-1">Mission</p>
            <p className="font-display font-bold text-foreground">{selectedMission.name}</p>
            <p className="text-sm text-muted-foreground">{selectedMission.zone}</p>
          </div>
        )}
        
        {/* Ready Button */}
        <Button
          onClick={onToggleReady}
          variant={isReady ? "tech" : "default"}
          size="xl"
          className="w-full"
        >
          {isReady ? "ANNULER PRÊT" : "PRÊT"}
        </Button>
        
        {/* Launch Button */}
        <Button
          variant="hero"
          size="xl"
          className="w-full"
          disabled={!allReady}
          onClick={onLaunch}
        >
          <Rocket className="w-5 h-5 mr-2" />
          LANCER L'EXPÉDITION
        </Button>
        
        {!allReady && (
          <div className="flex items-start gap-2 p-3 bg-warning/10 border border-warning/30 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Tous les membres doivent être prêts, une mission et un compagnon sélectionnés pour lancer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const StatusCheck = ({ label, checked }: { label: string; checked: boolean }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-muted-foreground">{label}</span>
    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
      checked ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
    }`}>
      {checked ? <CheckCircle className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}
    </div>
  </div>
);

export default ReadyPanel;
