import { useState } from "react";
import MissionSelector from "@/components/lobby/MissionSelector";
import SquadPanel from "@/components/lobby/SquadPanel";
import DinoCompanionSelector from "@/components/lobby/DinoCompanionSelector";
import LobbyHeader from "@/components/lobby/LobbyHeader";
import ReadyPanel from "@/components/lobby/ReadyPanel";

export interface Mission {
  id: string;
  name: string;
  zone: string;
  difficulty: "easy" | "medium" | "hard" | "extreme";
  targets: string[];
  extractionTime: string;
  rewards: string;
}

export interface SquadMember {
  id: string;
  name: string;
  role: "tracker" | "trapper" | "tank" | "support" | "logistics";
  ready: boolean;
  isLocal?: boolean;
}

export interface DinoCompanion {
  id: string;
  name: string;
  species: string;
  role: "scout" | "tank" | "transport" | "combat";
  level: number;
  assigned: boolean;
}

const Lobby = () => {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [squadMembers, setSquadMembers] = useState<SquadMember[]>([
    { id: "1", name: "Vous", role: "tracker", ready: false, isLocal: true },
    { id: "2", name: "ShadowHunter", role: "trapper", ready: true },
    { id: "3", name: "DinoSlayer99", role: "tank", ready: false },
  ]);
  const [companions, setCompanions] = useState<DinoCompanion[]>([
    { id: "1", name: "Rex", species: "Velociraptor", role: "scout", level: 7, assigned: false },
    { id: "2", name: "Brutus", species: "Carnotaurus", role: "tank", level: 5, assigned: false },
    { id: "3", name: "Cargo", species: "Parasaurolophus", role: "transport", level: 4, assigned: true },
  ]);
  const [selectedCompanion, setSelectedCompanion] = useState<string | null>("3");

  const missions: Mission[] = [
    {
      id: "1",
      name: "Chasse au Raptor",
      zone: "Vallée des Fougères",
      difficulty: "easy",
      targets: ["Velociraptor x3"],
      extractionTime: "15 min",
      rewards: "2,500 CR + ADN Raptor",
    },
    {
      id: "2",
      name: "Capture Alpha",
      zone: "Cratère Fumant",
      difficulty: "hard",
      targets: ["Carnotaurus Alpha (vivant)"],
      extractionTime: "25 min",
      rewards: "12,000 CR + Composants Rares",
    },
    {
      id: "3",
      name: "Extraction Critique",
      zone: "Jungle Noire",
      difficulty: "extreme",
      targets: ["T-Rex (vivant)", "Oeufs x5"],
      extractionTime: "35 min",
      rewards: "50,000 CR + Tech Légendaire",
    },
  ];

  const handleToggleReady = () => {
    setSquadMembers((prev) =>
      prev.map((m) => (m.isLocal ? { ...m, ready: !m.ready } : m))
    );
  };

  const handleSelectCompanion = (id: string) => {
    setSelectedCompanion(id);
    setCompanions((prev) =>
      prev.map((c) => ({ ...c, assigned: c.id === id }))
    );
  };

  const handleChangeRole = (role: SquadMember["role"]) => {
    setSquadMembers((prev) =>
      prev.map((m) => (m.isLocal ? { ...m, role } : m))
    );
  };

  const allReady = squadMembers.every((m) => m.ready) && !!selectedMission;

  return (
    <div className="min-h-screen bg-background">
      <LobbyHeader />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Missions */}
          <div className="lg:col-span-2 space-y-6">
            <MissionSelector
              missions={missions}
              selectedMission={selectedMission}
              onSelectMission={setSelectedMission}
            />
            
            <DinoCompanionSelector
              companions={companions}
              selectedCompanion={selectedCompanion}
              onSelectCompanion={handleSelectCompanion}
            />
          </div>
          
          {/* Right Column - Squad */}
          <div className="space-y-6">
            <SquadPanel
              members={squadMembers}
              onChangeRole={handleChangeRole}
            />
            
            <ReadyPanel
              isReady={squadMembers.find((m) => m.isLocal)?.ready || false}
              allReady={allReady}
              selectedMission={selectedMission}
              onToggleReady={handleToggleReady}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
