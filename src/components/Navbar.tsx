import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="font-display text-xl font-bold text-primary">
            PRIMAL<span className="text-foreground">X</span>
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#gameplay">Gameplay</NavLink>
            <NavLink href="#parc">Le Parc</NavLink>
            <NavLink href="#squad">Squad</NavLink>
            <NavLink href="#univers">Univers</NavLink>
          </div>
          
          {/* CTA */}
          <div className="hidden md:block">
            <Button variant="default" size="sm">
              Rejoindre
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <NavLink href="#gameplay" mobile>Gameplay</NavLink>
              <NavLink href="#parc" mobile>Le Parc</NavLink>
              <NavLink href="#squad" mobile>Squad</NavLink>
              <NavLink href="#univers" mobile>Univers</NavLink>
              <Button variant="default" size="sm" className="mt-2">
                Rejoindre
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ 
  href, 
  children, 
  mobile = false 
}: { 
  href: string; 
  children: React.ReactNode;
  mobile?: boolean;
}) => (
  <a 
    href={href}
    className={`text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider text-sm font-medium ${
      mobile ? 'py-2' : ''
    }`}
  >
    {children}
  </a>
);

export default Navbar;
