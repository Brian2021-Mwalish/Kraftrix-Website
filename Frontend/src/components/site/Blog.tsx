import { ArrowUpRight, Calendar } from "lucide-react";

const posts = [
  { date: "Apr 12, 2026", read: "5 min", cat: "Engineering", title: "Why headless commerce is winning across African retail" },
  { date: "Mar 28, 2026", read: "7 min", cat: "Design", title: "Designing for low-bandwidth: lessons from Lagos to Lusaka" },
  { date: "Mar 09, 2026", read: "4 min", cat: "Cloud", title: "Cutting cloud bills 40% with smart Africa-region architecture" },
];

const Blog = () => (
  <section id="blog" className="py-28">
    <div className="container-x">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Insights</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            From the <span className="text-gradient">Kraftrix journal</span>.
          </h2>
        </div>
        <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent transition-smooth">
          All articles <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-14 grid md:grid-cols-3 gap-6">
        {posts.map((p, i) => (
          <a key={p.title} href="#" className="group rounded-2xl border border-border/70 bg-card overflow-hidden transition-smooth hover:-translate-y-1 hover:shadow-glow">
            <div className={`h-44 ${["bg-primary", "bg-secondary", "bg-accent"][i]} relative`}>
              <span className="absolute top-4 left-4 inline-flex rounded-full bg-background/90 px-3 py-1 text-xs font-bold">{p.cat}</span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {p.date} · {p.read} read
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold leading-snug group-hover:text-accent transition-smooth">{p.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Blog;
