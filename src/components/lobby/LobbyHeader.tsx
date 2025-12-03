import { ArrowLeft, Users, Wifi, Trophy, Target } from "lucide-react";
import { Link } from "react-router-dom";
import type { SquadStats } from "@/types/game";

interface LobbyHeaderProps {
  stats: SquadStats;
}

const LobbyHeader = ({ stats }: LobbyHeaderProps) => {
  const successRate = stats.missionsPlayed > 0 
    ? Math.round((stats.successes / stats.missionsPlayed) * 100) 
    : 0;

  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wide">Retour</span>
            </Link>
            
            <div className="h-6 w-px bg-border" />
            
            <h1 className="font-display text-xl font-bold">
              <span className="text-primary">LOBBY</span>
              <span className="text-foreground"> D'EXPÉDITION</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            {stats.missionsPlayed > 0 && (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Missions:</span>
                  <span className="text-foreground font-medium">{stats.missionsPlayed}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Trophy className="w-4 h-4 text-accent" />
                  <span className="text-muted-foreground">Réussite:</span>
                  <span className="text-accent font-medium">{successRate}%</span>
                </div>
              </>
            )}
            
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">Squad:</span>
              <span className="text-foreground font-medium">3/5</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Wifi className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-accent">En ligne</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LobbyHeader;
