import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/20 blur-3xl animate-blob" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl animate-blob" />

      <div className="container-x relative grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Engineered in Africa, built for the world
          </span>
          <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
            Digital solutions that <span className="text-gradient">move Africa forward</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Kraftrix Africa Technologies designs, builds and scales modern websites,
            software, networks and brands for ambitious organizations across the continent.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="brand" size="lg" asChild>
              <a href="#quote">Request a Quote <ArrowRight /></a>
            </Button>
            <Button variant="outlineBrand" size="lg" asChild>
              <a href="#services">Explore Services</a>
            </Button>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            {[
              { k: "120+", v: "Projects delivered" },
              { k: "50+", v: "Happy clients" },
              { k: "9", v: "Service lines" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-3xl font-bold text-gradient">{s.k}</dt>
                <dd className="text-xs text-muted-foreground mt-1">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="absolute -inset-6 bg-gradient-brand opacity-30 blur-3xl rounded-[3rem]" />
          <div className="relative rounded-[2rem] overflow-hidden shadow-glow ring-brand">
            <img src={hero} alt="Kraftrix Africa connected technology network" width={1920} height={1280} className="w-full h-auto" />
          </div>
          <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-soft border border-border/60 animate-float">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-brand grid place-items-center text-primary-foreground font-bold">99%</div>
              <div>
                <div className="text-xs font-semibold">Uptime SLA</div>
                <div className="text-[11px] text-muted-foreground">Enterprise-grade hosting</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
