import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass border-b border-border/60">
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-primary-foreground font-display font-bold shadow-glow">
            K
          </span>
          <span className="font-display font-bold text-lg tracking-tight">
            Kraftrix<span className="text-accent">.</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <a href="#contact">Sign in</a>
          </Button>
          <Button variant="brand" size="sm" asChild>
            <a href="#quote">Get a Quote</a>
          </Button>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur">
          <div className="container-x py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 px-2 text-sm font-medium hover:text-accent">
                {l.label}
              </a>
            ))}
            <Button variant="brand" className="mt-2" asChild>
              <a href="#quote" onClick={() => setOpen(false)}>Get a Quote</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
