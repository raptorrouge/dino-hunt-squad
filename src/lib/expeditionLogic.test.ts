import { describe, it, expect } from "vitest";
import {
  calculateBaseSuccessChance,
  calculateCredits,
  calculateLoot,
} from "./expeditionLogic";
import type { TacticalDecisions, DinoCompanion, Difficulty } from "@/types/game";

describe("expeditionLogic", () => {
  describe("calculateBaseSuccessChance", () => {
    const safeDecisions: TacticalDecisions = {
      approach: "safe",
      captureMethod: "eliminate",
      extraction: "extract_now",
    };

    const riskyDecisions: TacticalDecisions = {
      approach: "aggressive",
      captureMethod: "capture",
      extraction: "search_more",
    };

    const mockDino: DinoCompanion = {
      id: "1",
      name: "Rex",
      species: "Velociraptor",
      role: "scout",
      level: 5,
      assigned: true,
    };

    it("should return higher chance for easy difficulty", () => {
      const easyChance = calculateBaseSuccessChance("easy", safeDecisions, null);
      const hardChance = calculateBaseSuccessChance("hard", safeDecisions, null);
      expect(easyChance).toBeGreaterThan(hardChance);
    });

    it("should return higher chance for safe approach", () => {
      const safeChance = calculateBaseSuccessChance("medium", safeDecisions, null);
      const riskyChance = calculateBaseSuccessChance("medium", riskyDecisions, null);
      expect(safeChance).toBeGreaterThan(riskyChance);
    });

    it("should apply dino bonus", () => {
      const withoutDino = calculateBaseSuccessChance("medium", safeDecisions, null);
      const withDino = calculateBaseSuccessChance("medium", safeDecisions, mockDino);
      expect(withDino).toBeGreaterThan(withoutDino);
    });

    it("should clamp chance between 0.1 and 0.95", () => {
      const extremeRisky = calculateBaseSuccessChance("extreme", riskyDecisions, null);
      const easyOptimal = calculateBaseSuccessChance("easy", safeDecisions, mockDino);
      
      expect(extremeRisky).toBeGreaterThanOrEqual(0.1);
      expect(easyOptimal).toBeLessThanOrEqual(0.95);
    });
  });

  describe("calculateCredits", () => {
    const decisions: TacticalDecisions = {
      approach: "safe",
      captureMethod: "eliminate",
      extraction: "extract_now",
    };

    it("should return 0 credits on failure", () => {
      const credits = calculateCredits("failure", "hard", decisions);
      expect(credits).toBe(0);
    });

    it("should return more credits for harder difficulty", () => {
      const easyCredits = calculateCredits("success", "easy", decisions);
      const hardCredits = calculateCredits("success", "hard", decisions);
      expect(hardCredits).toBeGreaterThan(easyCredits);
    });

    it("should apply capture alive bonus", () => {
      const captureDecisions: TacticalDecisions = {
        ...decisions,
        captureMethod: "capture",
      };
      const normalCredits = calculateCredits("success", "medium", decisions);
      const captureCredits = calculateCredits("success", "medium", captureDecisions);
      expect(captureCredits).toBeGreaterThan(normalCredits);
    });
  });

  describe("calculateLoot", () => {
    const decisions: TacticalDecisions = {
      approach: "safe",
      captureMethod: "eliminate",
      extraction: "extract_now",
    };

    it("should return nothing on failure", () => {
      const loot = calculateLoot("failure", decisions, "hard");
      expect(loot).toEqual(["Rien récupéré"]);
    });

    it("should include specimen on successful capture", () => {
      const captureDecisions: TacticalDecisions = {
        ...decisions,
        captureMethod: "capture",
      };
      const loot = calculateLoot("success", captureDecisions, "medium");
      expect(loot.some(item => item.includes("Spécimen"))).toBe(true);
    });

    it("should include bonus resources when searching more", () => {
      const searchDecisions: TacticalDecisions = {
        ...decisions,
        extraction: "search_more",
      };
      const loot = calculateLoot("success", searchDecisions, "medium");
      expect(loot.some(item => item.includes("Bonus"))).toBe(true);
    });
  });
});
