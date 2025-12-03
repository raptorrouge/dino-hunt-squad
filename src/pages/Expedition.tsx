import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "@/contexts/GameContext";
import { generateExpeditionResult } from "@/lib/expeditionLogic";
import MissionRecap from "@/components/expedition/MissionRecap";
import ExpeditionSquadStatus from "@/components/expedition/ExpeditionSquadStatus";
import DinoCompanionStatus from "@/components/expedition/DinoCompanionStatus";
import ExpeditionTimeline from "@/components/expedition/ExpeditionTimeline";
import TacticalChoices from "@/components/expedition/TacticalChoices";
import MissionResult from "@/components/expedition/MissionResult";
import type { TacticalDecisions } from "@/types/game";

const Expedition = () => {
  const navigate = useNavigate();
  const { 
    expeditionState, 
    gameState,
    advancePhase, 
    makeDecision, 
    completeExpedition,
    resetExpedition 
  } = useGame();
  
  const { mission, squadMembers, companion, phase, decisions } = expeditionState;
  
  // Redirect if no mission
  useEffect(() => {
    if (!mission) {
      navigate("/lobby");
    }
  }, [mission, navigate]);
  
  if (!mission) {
    return null;
  }
  
  // Handle decision and advance
  const handleApproachChoice = (choice: TacticalDecisions["approach"]) => {
    makeDecision("approach", choice);
    advancePhase();
  };
  
  const handleCaptureChoice = (choice: TacticalDecisions["captureMethod"]) => {
    makeDecision("captureMethod", choice);
    advancePhase();
  };
  
  const handleExtractionChoice = (choice: TacticalDecisions["extraction"]) => {
    makeDecision("extraction", choice);
    advancePhase();
  };
  
  const handleAdvance = () => {
    // If we're in extracting phase, generate result
    if (phase === "extracting") {
      const finalDecisions: TacticalDecisions = {
        approach: decisions.approach || "safe",
        captureMethod: decisions.captureMethod || "eliminate",
        extraction: decisions.extraction || "extract_now",
      };
      
      const result = generateExpeditionResult(
        mission,
        finalDecisions,
        companion,
        squadMembers
      );
      
      completeExpedition(result);
    } else {
      advancePhase();
    }
  };
  
  const handleReturnToLobby = () => {
    resetExpedition();
    navigate("/lobby");
  };
  
  // Get casualties from last mission result if complete
  const casualties = gameState.lastMission?.casualties || [];
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-accent text-xs uppercase tracking-wider">Expédition en cours</p>
              <h1 className="font-display text-2xl font-bold text-primary">{mission.name}</h1>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-sm">Zone</p>
              <p className="text-foreground font-medium">{mission.zone}</p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        {phase === "complete" && gameState.lastMission ? (
          <div className="max-w-2xl mx-auto">
            <MissionResult 
              result={gameState.lastMission} 
              onReturnToLobby={handleReturnToLobby}
            />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Mission Info */}
            <div className="lg:col-span-2 space-y-6">
              <MissionRecap mission={mission} />
              
              {/* Tactical Choices */}
              <TacticalChoices
                phase={phase}
                onApproachChoice={handleApproachChoice}
                onCaptureChoice={handleCaptureChoice}
                onExtractionChoice={handleExtractionChoice}
                onAdvance={handleAdvance}
              />
            </div>
            
            {/* Right Column - Status */}
            <div className="space-y-6">
              <ExpeditionTimeline currentPhase={phase} />
              <ExpeditionSquadStatus members={squadMembers} casualties={casualties} />
              <DinoCompanionStatus companion={companion} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Expedition;
