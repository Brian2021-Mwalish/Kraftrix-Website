import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/60 bg-background">
    <div className="container-x py-16 grid md:grid-cols-4 gap-10">
      <div className="md:col-span-2">
        <a href="#home" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-primary-foreground font-display font-bold">K</span>
          <span className="font-display font-bold text-lg">Kraftrix<span className="text-accent">.</span></span>
        </a>
        <p className="mt-4 text-sm text-muted-foreground max-w-sm">
          Pan-African technology studio crafting websites, software, networks and brands of global standard.
        </p>
        <div className="mt-6 flex gap-3">
          {[Twitter, Linkedin, Instagram, Facebook].map((I, i) => (
            <a key={i} href="#" aria-label="social" className="h-10 w-10 rounded-xl border border-border grid place-items-center hover:bg-gradient-brand hover:text-primary-foreground hover:border-transparent transition-smooth">
              <I className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display font-semibold mb-4">Company</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><a href="#about" className="hover:text-accent">About</a></li>
          <li><a href="#services" className="hover:text-accent">Services</a></li>
          <li><a href="#portfolio" className="hover:text-accent">Portfolio</a></li>
          <li><a href="#blog" className="hover:text-accent">Blog</a></li>
          <li><a href="#contact" className="hover:text-accent">Contact</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-display font-semibold mb-4">Get in touch</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>hello@kraftrix.africa</li>
          <li>+254 700 000 000</li>
          <li>Nairobi, Kenya</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border/60">
      <div className="container-x py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Kraftrix Africa Technologies. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-accent">Privacy</a>
          <a href="#" className="hover:text-accent">Terms</a>
          <a href="#" className="hover:text-accent">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
