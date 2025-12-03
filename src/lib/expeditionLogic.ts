import type { 
  Difficulty, 
  TacticalDecisions, 
  DinoCompanion, 
  MissionOutcome, 
  ExpeditionResult,
  Mission,
  SquadMember
} from "@/types/game";

// Difficulty modifiers (higher = harder)
const difficultyModifiers: Record<Difficulty, number> = {
  easy: 0.2,
  medium: 0.4,
  hard: 0.6,
  extreme: 0.8,
};

// Dino role bonuses
const dinoRoleBonuses: Record<string, { approach: number; capture: number; extraction: number }> = {
  scout: { approach: 0.15, capture: 0, extraction: 0.1 },
  tank: { approach: 0.1, capture: 0.05, extraction: 0.15 },
  transport: { approach: 0, capture: 0.1, extraction: 0.2 },
  combat: { approach: 0.2, capture: 0.1, extraction: 0.05 },
};

/**
 * Calculate base success chance based on difficulty and tactical choices
 */
export function calculateBaseSuccessChance(
  difficulty: Difficulty,
  decisions: TacticalDecisions,
  dino: DinoCompanion | null
): number {
  // Start with base chance
  let chance = 0.7;
  
  // Apply difficulty modifier (reduces chance)
  chance -= difficultyModifiers[difficulty];
  
  // Tactical approach modifiers
  if (decisions.approach === "safe") {
    chance += 0.1; // Safe approach is more reliable
  } else {
    chance -= 0.05; // Aggressive is riskier but doesn't change outcome much
  }
  
  // Capture method modifiers
  if (decisions.captureMethod === "capture") {
    chance -= 0.15; // Capturing alive is harder
  } else {
    chance += 0.05; // Elimination is easier
  }
  
  // Extraction timing modifiers
  if (decisions.extraction === "search_more") {
    chance -= 0.1; // Staying longer is riskier
  } else {
    chance += 0.05; // Extracting early is safer
  }
  
  // Apply dino bonuses
  if (dino) {
    const bonus = dinoRoleBonuses[dino.role] || { approach: 0, capture: 0, extraction: 0 };
    chance += bonus.approach;
    if (decisions.captureMethod === "capture") {
      chance += bonus.capture;
    }
    chance += bonus.extraction;
    
    // Level bonus (1% per level)
    chance += dino.level * 0.01;
  }
  
  // Clamp between 0.1 and 0.95
  return Math.max(0.1, Math.min(0.95, chance));
}

/**
 * Determine mission outcome based on success chance
 */
export function determineMissionOutcome(successChance: number): MissionOutcome {
  const roll = Math.random();
  
  if (roll < successChance) {
    return "success";
  } else if (roll < successChance + 0.2) {
    return "partial";
  }
  return "failure";
}

/**
 * Calculate casualties based on outcome and decisions
 */
export function calculateCasualties(
  outcome: MissionOutcome,
  decisions: TacticalDecisions,
  squadMembers: SquadMember[]
): string[] {
  const casualties: string[] = [];
  
  // Base casualty chance based on outcome
  let casualtyChance = 0;
  if (outcome === "failure") {
    casualtyChance = 0.6;
  } else if (outcome === "partial") {
    casualtyChance = 0.3;
  } else {
    casualtyChance = 0.1;
  }
  
  // Aggressive approach increases casualty risk
  if (decisions.approach === "aggressive") {
    casualtyChance += 0.15;
  }
  
  // Searching more increases risk
  if (decisions.extraction === "search_more") {
    casualtyChance += 0.1;
  }
  
  // Check each squad member (except local player who always survives for gameplay)
  squadMembers.forEach((member) => {
    if (!member.isLocal && Math.random() < casualtyChance) {
      casualties.push(member.name);
    }
  });
  
  return casualties;
}

/**
 * Calculate loot based on outcome and decisions
 */
export function calculateLoot(
  outcome: MissionOutcome,
  decisions: TacticalDecisions,
  difficulty: Difficulty
): string[] {
  const baseLoot: string[] = [];
  
  if (outcome === "failure") {
    return ["Rien récupéré"];
  }
  
  // Base loot based on difficulty
  const lootTiers: Record<Difficulty, string[]> = {
    easy: ["ADN Raptor", "Composants Basiques", "500 CR"],
    medium: ["ADN Carnivore", "Composants Standards", "2,000 CR"],
    hard: ["ADN Alpha", "Composants Rares", "8,000 CR"],
    extreme: ["ADN Légendaire", "Tech Avancée", "25,000 CR"],
  };
  
  baseLoot.push(...lootTiers[difficulty]);
  
  // Capture alive bonus
  if (decisions.captureMethod === "capture" && outcome === "success") {
    baseLoot.push("Spécimen Vivant (+50% valeur)");
  }
  
  // Search more bonus
  if (decisions.extraction === "search_more") {
    baseLoot.push("Ressources Bonus");
  }
  
  return baseLoot;
}

/**
 * Calculate credits earned
 */
export function calculateCredits(
  outcome: MissionOutcome,
  difficulty: Difficulty,
  decisions: TacticalDecisions
): number {
  const baseCredits: Record<Difficulty, number> = {
    easy: 2500,
    medium: 6000,
    hard: 12000,
    extreme: 50000,
  };
  
  let credits = baseCredits[difficulty];
  
  if (outcome === "failure") {
    return 0;
  }
  
  if (outcome === "partial") {
    credits = Math.floor(credits * 0.4);
  }
  
  // Capture alive bonus
  if (decisions.captureMethod === "capture" && outcome === "success") {
    credits = Math.floor(credits * 1.5);
  }
  
  // Search more bonus
  if (decisions.extraction === "search_more") {
    credits = Math.floor(credits * 1.2);
  }
  
  return credits;
}

/**
 * Generate complete expedition result
 */
export function generateExpeditionResult(
  mission: Mission,
  decisions: TacticalDecisions,
  dino: DinoCompanion | null,
  squadMembers: SquadMember[]
): ExpeditionResult {
  const successChance = calculateBaseSuccessChance(mission.difficulty, decisions, dino);
  const outcome = determineMissionOutcome(successChance);
  const casualties = calculateCasualties(outcome, decisions, squadMembers);
  const loot = calculateLoot(outcome, decisions, mission.difficulty);
  const credits = calculateCredits(outcome, mission.difficulty, decisions);
  
  return {
    outcome,
    loot,
    creditsEarned: credits,
    xpEarned: outcome === "success" ? 100 : outcome === "partial" ? 50 : 10,
    casualties,
    capturedAlive: decisions.captureMethod === "capture" && outcome === "success",
    missionId: mission.id,
    missionName: mission.name,
    timestamp: Date.now(),
  };
}
