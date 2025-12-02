const Footer = () => {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="/" className="font-display text-xl font-bold text-primary">
            PRIMAL<span className="text-foreground">X</span>
          </a>
          
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Presse</a>
            <a href="#" className="hover:text-primary transition-colors">Carrières</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
            <a href="#" className="hover:text-primary transition-colors">Conditions</a>
            <a href="#" className="hover:text-primary transition-colors">Confidentialité</a>
          </div>
          
          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            © 2024 Primal Extraction. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
