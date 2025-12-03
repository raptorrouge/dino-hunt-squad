import { CheckCircle, Circle, Loader2 } from "lucide-react";
import type { ExpeditionPhase } from "@/types/game";

interface ExpeditionTimelineProps {
  currentPhase: ExpeditionPhase;
}

const phases: { id: ExpeditionPhase; label: string }[] = [
  { id: "briefing", label: "Briefing" },
  { id: "insertion", label: "Insertion" },
  { id: "first_contact", label: "Premier Contact" },
  { id: "tactical_decision", label: "Approche Tactique" },
  { id: "capture_decision", label: "Capture/Élimination" },
  { id: "extraction_decision", label: "Extraction" },
  { id: "extracting", label: "En cours..." },
  { id: "complete", label: "Mission Terminée" },
];

const ExpeditionTimeline = ({ currentPhase }: ExpeditionTimelineProps) => {
  const currentIndex = phases.findIndex(p => p.id === currentPhase);
  
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="font-display text-lg font-bold text-foreground">
          PROGRESSION
        </h2>
      </div>
      
      <div className="p-4">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border" />
          
          <div className="space-y-3">
            {phases.map((phase, index) => {
              const isCompleted = index < currentIndex;
              const isCurrent = index === currentIndex;
              const isPending = index > currentIndex;
              
              return (
                <div key={phase.id} className="flex items-center gap-3 relative">
                  <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center ${
                    isCompleted 
                      ? "bg-accent text-accent-foreground" 
                      : isCurrent 
                        ? "bg-primary text-primary-foreground animate-pulse" 
                        : "bg-muted text-muted-foreground"
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Circle className="w-3 h-3" />
                    )}
                  </div>
                  
                  <span className={`text-sm ${
                    isCompleted 
                      ? "text-accent font-medium" 
                      : isCurrent 
                        ? "text-primary font-bold" 
                        : "text-muted-foreground"
                  }`}>
                    {phase.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpeditionTimeline;
