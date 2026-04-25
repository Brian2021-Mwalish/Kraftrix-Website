import { Star } from "lucide-react";

const items = [
  { name: "Amaka O.", role: "CEO, BrightLoop", quote: "Kraftrix rebuilt our platform in 6 weeks. Conversions tripled within a month." },
  { name: "Daniel K.", role: "CTO, FinSpark", quote: "An exceptional engineering team. Communication, code quality and delivery — all top tier." },
  { name: "Sarah M.", role: "Founder, Lumi", quote: "They understand African markets and global standards. Our brand has never looked sharper." },
];

const Testimonials = () => (
  <section className="py-28 bg-muted/40">
    <div className="container-x">
      <div className="max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Client love</span>
        <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
          Trusted by founders <span className="text-gradient">across Africa</span>.
        </h2>
      </div>
      <div className="mt-14 grid md:grid-cols-3 gap-6">
        {items.map((t) => (
          <figure key={t.name} className="rounded-2xl bg-card border border-border/70 p-7 shadow-soft">
            <div className="flex gap-1 text-accent mb-4">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <blockquote className="text-foreground leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-brand grid place-items-center text-primary-foreground font-bold">
                {t.name[0]}
              </div>
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
