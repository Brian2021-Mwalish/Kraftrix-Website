import { CheckCircle2 } from "lucide-react";

const values = [
  { t: "Excellence", d: "We hold every pixel and every line of code to a premium standard." },
  { t: "Integrity", d: "Transparent pricing, honest timelines, and code we're proud to ship." },
  { t: "Innovation", d: "We pair African insight with global engineering best practices." },
  { t: "Partnership", d: "Your success is our long-term scoreboard, not just a deliverable." },
];

const About = () => (
  <section id="about" className="py-28 bg-muted/40">
    <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">About Kraftrix</span>
        <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold leading-tight">
          A pan-African tech studio, building the <span className="text-gradient">next generation</span> of digital companies.
        </h2>
        <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
          We exist to give African businesses the same caliber of design, engineering and infrastructure
          enjoyed by the world's leading brands — without the overhead. Our multidisciplinary team blends
          strategy, creativity and deep technical craft.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {[
            "Senior engineers",
            "Award-winning designers",
            "Pan-African delivery",
            "24/7 client support",
          ].map((b) => (
            <div key={b} className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="h-4 w-4 text-accent" /> {b}
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {values.map((v, i) => (
          <div
            key={v.t}
            className={`rounded-2xl p-7 border border-border/70 bg-card shadow-soft ${i % 2 === 1 ? "sm:translate-y-8" : ""}`}
          >
            <div className="h-1 w-10 rounded bg-gradient-brand mb-4" />
            <h3 className="font-display text-lg font-semibold">{v.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
