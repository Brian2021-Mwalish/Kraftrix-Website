import { ArrowUpRight } from "lucide-react";

const projects = [
  { tag: "Fintech", title: "PesaFlow Banking Portal", desc: "A multi-tenant SaaS dashboard for digital lenders.", color: "bg-primary" },
  { tag: "E-commerce", title: "Sahara Marketplace", desc: "Headless commerce platform serving 4 African markets.", color: "bg-secondary" },
  { tag: "Healthcare", title: "MediTrack EHR", desc: "Electronic health records used by 12 clinics.", color: "bg-accent" },
  { tag: "Logistics", title: "RouteAfrica Dispatch", desc: "Real-time fleet tracking & delivery optimization.", color: "bg-primary" },
];

const Portfolio = () => (
  <section id="portfolio" className="py-28">
    <div className="container-x">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Selected work</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            Crafted for impact, <span className="text-gradient">measured by results</span>.
          </h2>
        </div>
        <a href="#contact" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent transition-smooth">
          View all case studies <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-14 grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <article key={p.title} className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card transition-smooth hover:-translate-y-1 hover:shadow-glow">
            <div className={`relative h-64 ${p.color} overflow-hidden`}>
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-xs font-bold text-foreground">
                {p.tag}
              </div>
            </div>
            <div className="p-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
              </div>
              <div className="h-10 w-10 rounded-full grid place-items-center bg-muted group-hover:bg-gradient-brand group-hover:text-primary-foreground transition-smooth">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Portfolio;
