import { Code2, Globe, Headphones, Network, Camera, Palette, Search, Megaphone, Cloud } from "lucide-react";

const services = [
  { icon: Globe, title: "Website Development", desc: "Lightning-fast, conversion-focused sites built on modern frameworks." },
  { icon: Code2, title: "Software Development", desc: "Custom web & mobile apps tailored to your business workflow." },
  { icon: Headphones, title: "IT Support", desc: "Reliable on-demand and managed IT support for growing teams." },
  { icon: Network, title: "Networking", desc: "Robust LAN, WAN and Wi-Fi infrastructure designed to scale." },
  { icon: Camera, title: "CCTV Installation", desc: "Smart surveillance for offices, retail and residential security." },
  { icon: Palette, title: "Branding", desc: "Logos, identity systems and brand guidelines that command attention." },
  { icon: Megaphone, title: "Digital Marketing", desc: "Performance campaigns across Google, Meta and TikTok." },
  { icon: Search, title: "SEO", desc: "Climb search rankings with technical SEO and content strategy." },
  { icon: Cloud, title: "Cloud Solutions", desc: "Migrate, secure and optimize on AWS, GCP and Azure." },
];

const Services = () => (
  <section id="services" className="py-28 relative">
    <div className="container-x">
      <div className="max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">What we do</span>
        <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
          Full-stack digital services, <span className="text-gradient">one trusted partner</span>.
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          From the first sketch to the final deployment, Kraftrix delivers technology that performs.
        </p>
      </div>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <article
            key={s.title}
            className="group relative rounded-2xl border border-border/70 bg-card p-7 transition-smooth hover:-translate-y-1 hover:shadow-glow hover:border-primary/30"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-brand opacity-0 group-hover:opacity-[0.04] transition-smooth" />
            <div className="relative">
              <div className="h-12 w-12 rounded-xl bg-gradient-brand grid place-items-center text-primary-foreground shadow-glow">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
