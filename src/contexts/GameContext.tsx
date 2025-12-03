import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { 
  GameState, 
  ExpeditionResult, 
  Mission, 
  SquadMember, 
  DinoCompanion,
  TacticalDecisions,
  ExpeditionPhase
} from "@/types/game";

interface ExpeditionState {
  mission: Mission | null;
  squadMembers: SquadMember[];
  companion: DinoCompanion | null;
  phase: ExpeditionPhase;
  decisions: Partial<TacticalDecisions>;
}

interface GameContextType {
  gameState: GameState;
  expeditionState: ExpeditionState;
  startExpedition: (mission: Mission, squad: SquadMember[], companion: DinoCompanion | null) => void;
  advancePhase: () => void;
  makeDecision: <K extends keyof TacticalDecisions>(key: K, value: TacticalDecisions[K]) => void;
  completeExpedition: (result: ExpeditionResult) => void;
  resetExpedition: () => void;
}

const initialGameState: GameState = {
  squadStats: {
    missionsPlayed: 0,
    successes: 0,
    partials: 0,
    failures: 0,
    totalCreditsEarned: 0,
  },
  dinoStats: {},
  lastMission: null,
};

const initialExpeditionState: ExpeditionState = {
  mission: null,
  squadMembers: [],
  companion: null,
  phase: "briefing",
  decisions: {},
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [expeditionState, setExpeditionState] = useState<ExpeditionState>(initialExpeditionState);

  const startExpedition = useCallback((
    mission: Mission, 
    squad: SquadMember[], 
    companion: DinoCompanion | null
  ) => {
    setExpeditionState({
      mission,
      squadMembers: squad.map(m => ({ ...m, health: 100, status: "active" })),
      companion,
      phase: "briefing",
      decisions: {},
    });
  }, []);

  const advancePhase = useCallback(() => {
    setExpeditionState(prev => {
      const phases: ExpeditionPhase[] = [
        "briefing",
        "insertion",
        "first_contact",
        "tactical_decision",
        "capture_decision",
        "extraction_decision",
        "extracting",
        "complete",
      ];
      const currentIndex = phases.indexOf(prev.phase);
      const nextPhase = phases[Math.min(currentIndex + 1, phases.length - 1)];
      return { ...prev, phase: nextPhase };
    });
  }, []);

  const makeDecision = useCallback(<K extends keyof TacticalDecisions>(
    key: K, 
    value: TacticalDecisions[K]
  ) => {
    setExpeditionState(prev => ({
      ...prev,
      decisions: { ...prev.decisions, [key]: value },
    }));
  }, []);

  const completeExpedition = useCallback((result: ExpeditionResult) => {
    setGameState(prev => {
      const newStats = { ...prev.squadStats };
      newStats.missionsPlayed += 1;
      newStats.totalCreditsEarned += result.creditsEarned;
      
      if (result.outcome === "success") newStats.successes += 1;
      else if (result.outcome === "partial") newStats.partials += 1;
      else newStats.failures += 1;

      // Update dino stats if companion was used
      const newDinoStats = { ...prev.dinoStats };
      const companion = expeditionState.companion;
      if (companion) {
        const current = newDinoStats[companion.id] || { missionsCompleted: 0, successCount: 0 };
        newDinoStats[companion.id] = {
          missionsCompleted: current.missionsCompleted + 1,
          successCount: current.successCount + (result.outcome === "success" ? 1 : 0),
        };
      }

      return {
        squadStats: newStats,
        dinoStats: newDinoStats,
        lastMission: result,
      };
    });

    setExpeditionState(prev => ({ ...prev, phase: "complete" }));
  }, [expeditionState.companion]);

  const resetExpedition = useCallback(() => {
    setExpeditionState(initialExpeditionState);
  }, []);

  return (
    <GameContext.Provider value={{
      gameState,
      expeditionState,
      startExpedition,
      advancePhase,
      makeDecision,
      completeExpedition,
      resetExpedition,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
