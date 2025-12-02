import { ArrowLeft, Users, Wifi } from "lucide-react";
import { Link } from "react-router-dom";

const LobbyHeader = () => {
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
