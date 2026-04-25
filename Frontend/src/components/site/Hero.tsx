import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

/* ─── brand tokens ─────────────────────────────────────────── */
const C = {
  royalPurple:  "#413584",
  vibrantPurple:"#5644AE",
  orange:       "#F8492D",
  white:        "#FBFAF9",
  black:        "#000000",
};

/* ─── tiny hook: fires once when element enters viewport ────── */
function useInView(threshold = 0.15) {
  const ref  = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ─── animated counter ──────────────────────────────────────── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, visible } = useInView();
  useEffect(() => {
    if (!visible) return;
    let start: number | null = null;
    const duration = 1400;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out-expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setVal(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── network node SVG (replaces hero image) ───────────────── */
function NetworkCanvas() {
  const canvasRef = useRef<SVGSVGElement>(null);
  const [tick, setTick] = useState(0);

  /* pulse animation via state tick */
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60);
    return () => clearInterval(id);
  }, []);

  const nodes = [
    { x: 200, y: 150, r: 28, main: true },
    { x: 90,  y: 80,  r: 16 },
    { x: 310, y: 70,  r: 16 },
    { x: 60,  y: 210, r: 14, hot: true },
    { x: 340, y: 220, r: 14, hot: true },
    { x: 160, y: 240, r: 12 },
    { x: 260, y: 240, r: 12 },
    { x: 130, y: 160, r: 10 },
    { x: 270, y: 160, r: 10 },
  ];

  const edges = [
    [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],
    [1,2],[3,5],[4,6],
  ];

  /* travelling dot along an edge */
  const t0 = (tick % 120) / 120;
  const t1 = ((tick + 40) % 120) / 120;

  function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

  return (
    <svg ref={canvasRef} viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"
      style={{ width:"100%", height:"100%", display:"block" }}>
      <rect width="400" height="300" fill={C.vibrantPurple}/>

      {/* edges */}
      {edges.map(([a,b], i) => {
        const na = nodes[a], nb = nodes[b];
        const hot = na.hot || nb.hot;
        return (
          <line key={i}
            x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke={hot ? C.orange : C.white}
            strokeWidth={hot ? 1.5 : 1}
            opacity={hot ? 0.7 : 0.4}
          />
        );
      })}

      {/* travelling dots */}
      {[
        { edge:[0,3], t: t0, color: C.orange },
        { edge:[0,4], t: t1, color: C.orange },
        { edge:[0,1], t: t0, color: C.white  },
      ].map(({ edge:[a,b], t, color }, i) => {
        const na = nodes[a], nb = nodes[b];
        return (
          <circle key={i}
            cx={lerp(na.x, nb.x, t)} cy={lerp(na.y, nb.y, t)}
            r={3} fill={color} opacity={0.9}
          />
        );
      })}

      {/* nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          {n.main && (
            <circle cx={n.x} cy={n.y} r={n.r + 8}
              fill="none" stroke={C.white} strokeWidth={1} opacity={0.2 + 0.1 * Math.sin(tick * 0.08)}/>
          )}
          <circle cx={n.x} cy={n.y} r={n.r}
            fill={n.main ? C.royalPurple : n.hot ? C.orange : C.royalPurple}
            stroke={C.white} strokeWidth={n.main ? 2 : 1.5}
          />
          {n.main && (
            <text x={n.x} y={n.y + 4} textAnchor="middle"
              fontSize="10" fontWeight="800" fill={C.white}>KAT</text>
          )}
        </g>
      ))}
    </svg>
  );
}

/* ─── HERO ──────────────────────────────────────────────────── */
export default function Hero() {
  const { ref: heroRef, visible } = useInView(0.05);

  const fadeUp = (delay = 0): React.CSSProperties => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  const stats = [
    { k: 120, suffix: "+", v: "Projects delivered" },
    { k: 50,  suffix: "+", v: "Happy clients"      },
    { k: 9,   suffix: "",  v: "Service lines"       },
  ];

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        background: C.white,
        padding: "80px 48px 64px",
        fontFamily: "'DM Sans', 'Inter', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* decorative corner accent */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 320, height: 320,
        background: C.royalPurple,
        clipPath: "polygon(100% 0, 0 0, 100% 100%)",
        opacity: 0.06,
        pointerEvents: "none",
      }}/>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 56,
        alignItems: "center",
        maxWidth: 1100,
        margin: "0 auto",
      }}>

        {/* ── LEFT COLUMN ── */}
        <div>
          {/* badge */}
          <div style={{
            ...fadeUp(0),
            display: "inline-flex", alignItems: "center", gap: 7,
            background: C.royalPurple, color: C.white,
            borderRadius: 999, padding: "6px 15px",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
            marginBottom: 24,
          }}>
            <Sparkles size={12}/>
            Engineered in Africa, built for the world
          </div>

          {/* headline */}
          <h1 style={{
            ...fadeUp(0.1),
            fontSize: 46, fontWeight: 900,
            lineHeight: 1.05, letterSpacing: "-0.025em",
            color: C.black, marginBottom: 18,
          }}>
            Digital solutions that{" "}
            <span style={{
              color: C.royalPurple,
              borderBottom: `4px solid ${C.orange}`,
              paddingBottom: 2,
            }}>
              move Africa forward
            </span>
            .
          </h1>

          {/* body */}
          <p style={{
            ...fadeUp(0.18),
            fontSize: 15, color: "#555", lineHeight: 1.75,
            maxWidth: 430, marginBottom: 32,
          }}>
            Kraftrix Africa Technologies designs, builds and scales modern
            websites, software, networks and brands for ambitious organizations
            across the continent.
          </p>

          {/* CTA buttons */}
          <div style={{ ...fadeUp(0.26), display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 44 }}>
            <a href="#quote" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: C.orange, color: C.white,
              borderRadius: 8, padding: "13px 24px",
              fontSize: 14, fontWeight: 700, textDecoration: "none",
              border: "none", cursor: "pointer",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 20px ${C.orange}55`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}>
              Request a Quote <ArrowRight size={15}/>
            </a>

            <a href="#services" style={{
              display: "inline-flex", alignItems: "center",
              background: C.white, color: C.royalPurple,
              border: `2px solid ${C.royalPurple}`,
              borderRadius: 8, padding: "13px 24px",
              fontSize: 14, fontWeight: 700, textDecoration: "none",
              cursor: "pointer",
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = C.royalPurple;
              (e.currentTarget as HTMLElement).style.color = C.white;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = C.white;
              (e.currentTarget as HTMLElement).style.color = C.royalPurple;
            }}>
              Explore Services
            </a>
          </div>

          {/* stats */}
          <div style={{
            ...fadeUp(0.34),
            display: "grid", gridTemplateColumns: "repeat(3,1fr)",
            gap: 16, maxWidth: 360,
            borderTop: `1px solid #e8e6e0`,
            paddingTop: 24,
          }}>
            {stats.map(s => (
              <div key={s.v}>
                <div style={{
                  fontSize: 30, fontWeight: 900, color: C.royalPurple,
                  lineHeight: 1,
                }}>
                  <Counter target={s.k} suffix={s.suffix}/>
                </div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 5 }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ ...fadeUp(0.2), position: "relative" }}>
          {/* "Live Projects" chip */}
          <div style={{
            position: "absolute", top: -14, right: 16, zIndex: 10,
            background: C.orange, color: C.white,
            borderRadius: 999, padding: "5px 14px",
            fontSize: 11, fontWeight: 700,
            animation: "chipPop 0.5s 0.6s both cubic-bezier(0.34,1.56,0.64,1)",
          }}>
            Live Projects
          </div>

          {/* image frame */}
          <div style={{
            background: C.royalPurple,
            borderRadius: 24,
            overflow: "hidden",
            aspectRatio: "4/3",
            border: `3px solid ${C.royalPurple}`,
            animation: "frameDrop 0.7s 0.3s both cubic-bezier(0.34,1.56,0.64,1)",
          }}>
            <NetworkCanvas/>
          </div>

          {/* uptime badge */}
          <div style={{
            position: "absolute", bottom: -18, left: -18,
            background: C.white,
            border: `1px solid #e0ddd8`,
            borderRadius: 14, padding: "11px 16px",
            display: "flex", alignItems: "center", gap: 10,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            animation: "slideUp 0.5s 0.9s both ease-out",
          }}>
            <div style={{
              width: 40, height: 40,
              background: C.royalPurple,
              borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 900, color: C.white, flexShrink: 0,
            }}>99%</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.black }}>Uptime SLA</div>
              <div style={{ fontSize: 11, color: "#888" }}>Enterprise-grade hosting</div>
            </div>
          </div>

          {/* accent dot */}
          <div style={{
            position: "absolute", top: "40%", right: -12,
            width: 14, height: 14,
            background: C.orange,
            borderRadius: "50%",
            animation: "pulse 2s 1s infinite ease-in-out",
          }}/>
        </div>
      </div>

      {/* keyframes injected once */}
      <style>{`
        @keyframes chipPop {
          from { opacity:0; transform: scale(0.6) translateY(-6px); }
          to   { opacity:1; transform: scale(1) translateY(0); }
        }
        @keyframes frameDrop {
          from { opacity:0; transform: translateY(24px) scale(0.97); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
        @keyframes slideUp {
          from { opacity:0; transform: translateY(12px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%,100% { transform: scale(1);   opacity:1;   }
          50%      { transform: scale(1.6); opacity:0.5; }
        }
      `}</style>
    </section>
  );
}