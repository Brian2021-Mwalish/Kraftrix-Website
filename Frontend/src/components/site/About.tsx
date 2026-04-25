import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Users, Globe2, Headphones, Code2 } from "lucide-react";

const C = {
  royalPurple:   "#413584",
  vibrantPurple: "#5644AE",
  orange:        "#F8492D",
  white:         "#FBFAF9",
  black:         "#000000",
  pageBg:        "#F4F2F0",
  cardBg:        "#FBFAF9",
  muted:         "#6b6b6b",
  border:        "#E2DFD9",
};

const values = [
  {
    t: "Excellence",
    d: "We hold every pixel and every line of code to a premium standard.",
    accent: C.royalPurple,
  },
  {
    t: "Integrity",
    d: "Transparent pricing, honest timelines, and code we're proud to ship.",
    accent: C.orange,
  },
  {
    t: "Innovation",
    d: "We pair African insight with global engineering best practices.",
    accent: C.vibrantPurple,
  },
  {
    t: "Partnership",
    d: "Your success is our long-term scoreboard, not just a deliverable.",
    accent: C.orange,
  },
];

const bullets = [
  { icon: Code2,       label: "Senior engineers"        },
  { icon: Users,       label: "Award-winning designers" },
  { icon: Globe2,      label: "Pan-African delivery"    },
  { icon: Headphones,  label: "24/7 client support"     },
];

/* ── useInView hook ─────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
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

/* ── value card ─────────────────────────────────────────────── */
function ValueCard({ v, delay, offset }: { v: typeof values[0]; delay: number; offset: boolean }) {
  const { ref, visible } = useInView();
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:   hov ? C.royalPurple : C.cardBg,
        border:       `1px solid ${hov ? C.royalPurple : C.border}`,
        borderRadius: 20,
        padding:      "28px 26px",
        marginTop:    offset ? 32 : 0,
        cursor:       "default",
        transition:   "background 0.25s, border-color 0.25s, transform 0.25s, box-shadow 0.25s",
        transform:    visible
          ? hov ? "translateY(-4px)" : "translateY(0)"
          : "translateY(28px)",
        opacity:      visible ? 1 : 0,
        transitionDelay: `${delay}ms`,
        boxShadow:    hov ? `0 12px 32px ${C.royalPurple}33` : "none",
      }}
    >
      {/* top accent bar */}
      <div style={{
        height:       3,
        width:        hov ? 56 : 36,
        background:   hov ? C.orange : v.accent,
        borderRadius: 999,
        marginBottom: 18,
        transition:   "width 0.3s ease, background 0.25s",
      }}/>

      <h3 style={{
        fontSize:   17,
        fontWeight: 700,
        color:      hov ? C.white : C.black,
        marginBottom: 8,
        transition: "color 0.25s",
      }}>
        {v.t}
      </h3>
      <p style={{
        fontSize:   13,
        lineHeight: 1.7,
        color:      hov ? "rgba(251,250,249,0.75)" : C.muted,
        transition: "color 0.25s",
      }}>
        {v.d}
      </p>
    </div>
  );
}

/* ── ABOUT ──────────────────────────────────────────────────── */
const About = () => {
  const { ref: secRef, visible } = useInView(0.08);

  const fadeUp = (delay = 0): React.CSSProperties => ({
    opacity:         visible ? 1 : 0,
    transform:       visible ? "translateY(0)" : "translateY(28px)",
    transition:      `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  return (
    <section
      id="about"
      ref={secRef}
      style={{
        background: C.pageBg,
        padding:    "100px 48px 112px",
        fontFamily: "'DM Sans','Inter',sans-serif",
        position:   "relative",
        overflow:   "hidden",
      }}
    >
      {/* background geometric accent */}
      <div style={{
        position:     "absolute",
        top:          -80,
        left:         -80,
        width:        360,
        height:       360,
        background:   C.royalPurple,
        borderRadius: "50%",
        opacity:      0.04,
        pointerEvents:"none",
      }}/>
      <div style={{
        position:     "absolute",
        bottom:       -60,
        right:        -60,
        width:        280,
        height:       280,
        background:   C.orange,
        borderRadius: "50%",
        opacity:      0.05,
        pointerEvents:"none",
      }}/>

      <div style={{
        maxWidth:  1120,
        margin:    "0 auto",
        display:   "grid",
        gridTemplateColumns: "1fr 1fr",
        gap:       64,
        alignItems:"start",
      }}>

        {/* ── LEFT ── */}
        <div>
          {/* eyebrow */}
          <div style={{
            ...fadeUp(0),
            display:      "inline-flex",
            alignItems:   "center",
            gap:          8,
            marginBottom: 20,
          }}>
            <span style={{
              display:      "block",
              width:        24,
              height:       2,
              background:   C.orange,
              borderRadius: 999,
            }}/>
            <span style={{
              fontSize:      11,
              fontWeight:    800,
              letterSpacing: "0.18em",
              color:         C.royalPurple,
              textTransform: "uppercase",
            }}>
              About Kraftrix
            </span>
          </div>

          {/* headline */}
          <h2 style={{
            ...fadeUp(0.08),
            fontSize:   40,
            fontWeight: 900,
            lineHeight: 1.1,
            color:      C.black,
            marginBottom: 22,
            letterSpacing: "-0.02em",
          }}>
            A pan-African tech studio,{" "}
            <span style={{
              color:         C.royalPurple,
              borderBottom:  `3px solid ${C.orange}`,
              paddingBottom: 2,
            }}>
              building the next generation
            </span>{" "}
            of digital companies.
          </h2>

          {/* body */}
          <p style={{
            ...fadeUp(0.15),
            fontSize:   15,
            color:      C.muted,
            lineHeight: 1.8,
            marginBottom: 32,
            maxWidth:   480,
          }}>
            We exist to give African businesses the same caliber of design,
            engineering and infrastructure enjoyed by the world's leading brands —
            without the overhead. Our multidisciplinary team blends strategy,
            creativity and deep technical craft.
          </p>

          {/* bullets */}
          <div style={{
            ...fadeUp(0.22),
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 "12px 24px",
            marginBottom:        44,
          }}>
            {bullets.map(({ icon: Icon, label }, i) => (
              <BulletRow key={label} Icon={Icon} label={label} delay={0.22 + i * 0.06} visible={visible}/>
            ))}
          </div>

          {/* founders strip */}
          <div style={{
            ...fadeUp(0.44),
            background:   C.cardBg,
            border:       `1px solid ${C.border}`,
            borderRadius: 14,
            padding:      "18px 22px",
            display:      "flex",
            alignItems:   "center",
            gap:          16,
          }}>
            {/* avatar stack */}
            <div style={{ display: "flex", flexShrink: 0 }}>
              {[C.royalPurple, C.vibrantPurple, C.orange].map((bg, i) => (
                <div key={i} style={{
                  width:        36,
                  height:       36,
                  borderRadius: "50%",
                  background:   bg,
                  border:       `2px solid ${C.pageBg}`,
                  marginLeft:   i === 0 ? 0 : -10,
                  display:      "flex",
                  alignItems:   "center",
                  justifyContent:"center",
                  fontSize:     11,
                  fontWeight:   800,
                  color:        C.white,
                }}>
                  {["KE","AF","TZ"][i]}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.black }}>
                Team across 3+ countries
              </div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
                Kenya · Tanzania · Uganda · and growing
              </div>
            </div>
            <div style={{
              marginLeft:   "auto",
              background:   C.royalPurple,
              color:        C.white,
              borderRadius: 999,
              padding:      "4px 12px",
              fontSize:     11,
              fontWeight:   700,
              flexShrink:   0,
            }}>
              Est. 2021
            </div>
          </div>
        </div>

        {/* ── RIGHT: value cards ── */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:                 16,
          alignItems:          "start",
        }}>
          {values.map((v, i) => (
            <ValueCard
              key={v.t}
              v={v}
              delay={120 + i * 80}
              offset={i % 2 === 1}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about > div > div { grid-template-columns: 1fr !important; gap: 48px !important; }
          #about { padding: 72px 24px 80px !important; }
        }
      `}</style>
    </section>
  );
};

/* ── bullet row sub-component ───────────────────────────────── */
function BulletRow({ Icon, label, delay, visible }: {
  Icon: React.ElementType; label: string; delay: number; visible: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:     "flex",
        alignItems:  "center",
        gap:         8,
        opacity:     visible ? 1 : 0,
        transform:   visible ? "translateX(0)" : "translateX(-16px)",
        transition:  `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
        cursor:      "default",
      }}
    >
      <div style={{
        width:        28,
        height:       28,
        borderRadius: 7,
        background:   hov ? C.royalPurple : "#EEEcf8",
        display:      "flex",
        alignItems:   "center",
        justifyContent:"center",
        flexShrink:   0,
        transition:   "background 0.2s",
      }}>
        <Icon size={14} color={hov ? C.white : C.royalPurple} style={{ transition: "color 0.2s" }}/>
      </div>
      <span style={{
        fontSize:   13,
        fontWeight: 600,
        color:      hov ? C.royalPurple : C.black,
        transition: "color 0.2s",
      }}>
        {label}
      </span>
    </div>
  );
}

export default About;