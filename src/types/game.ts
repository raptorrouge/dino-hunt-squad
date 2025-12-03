// Core game types

export type Difficulty = "easy" | "medium" | "hard" | "extreme";
export type SquadRole = "tracker" | "trapper" | "tank" | "support" | "logistics";
export type DinoRole = "scout" | "tank" | "transport" | "combat";
export type TacticalChoice = "safe" | "aggressive";
export type CaptureChoice = "capture" | "eliminate";
export type ExtractionChoice = "search_more" | "extract_now";

export interface Mission {
  id: string;
  name: string;
  zone: string;
  difficulty: Difficulty;
  targets: string[];
  extractionTime: string;
  rewards: string;
}

export interface SquadMember {
  id: string;
  name: string;
  role: SquadRole;
  ready: boolean;
  isLocal?: boolean;
  health?: number; // 0-100
  status?: "active" | "down" | "extracted";
}

export interface DinoCompanion {
  id: string;
  name: string;
  species: string;
  role: DinoRole;
  level: number;
  assigned: boolean;
  missionsCompleted?: number;
  successRate?: number;
}

export interface TacticalDecisions {
  approach: TacticalChoice;
  captureMethod: CaptureChoice;
  extraction: ExtractionChoice;
}

export type ExpeditionPhase = 
  | "briefing" 
  | "insertion" 
  | "first_contact" 
  | "tactical_decision" 
  | "capture_decision" 
  | "extraction_decision" 
  | "extracting" 
  | "complete";

export type MissionOutcome = "success" | "partial" | "failure";

export interface ExpeditionResult {
  outcome: MissionOutcome;
  loot: string[];
  creditsEarned: number;
  xpEarned: number;
  casualties: string[]; // Names of downed squad members
  capturedAlive: boolean;
  missionId: string;
  missionName: string;
  timestamp: number;
}

export interface SquadStats {
  missionsPlayed: number;
  successes: number;
  partials: number;
  failures: number;
  totalCreditsEarned: number;
}

export interface DinoStats {
  [dinoId: string]: {
    missionsCompleted: number;
    successCount: number;
  };
}

export interface GameState {
  squadStats: SquadStats;
  dinoStats: DinoStats;
  lastMission: ExpeditionResult | null;
}
