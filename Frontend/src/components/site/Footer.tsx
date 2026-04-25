import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, ArrowUpRight, Send, Lock } from "lucide-react";

const C = {
  royalPurple:   "#413584",
  vibrantPurple: "#5644AE",
  orange:        "#F8492D",
  white:         "#FBFAF9",
  black:         "#000000",
  footerBg:      "#0E0C1E",
  footerSurface: "#1A1730",
  footerBorder:  "rgba(255,255,255,0.08)",
  muted:         "rgba(255,255,255,0.5)",
  mutedHover:    "rgba(255,255,255,0.85)",
};

const companyLinks = [
  { href: "#about",     label: "About"     },
  { href: "#services",  label: "Services"  },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#blog",      label: "Blog"      },
  { href: "#contact",   label: "Contact"   },
];

const legalLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Cookie Policy" },
];

const socials = [
  { Icon: Twitter,   label: "Twitter",   href: "#" },
  { Icon: Linkedin,  label: "LinkedIn",  href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Facebook,  label: "Facebook",  href: "#" },
];

const contact = [
  { Icon: Mail,    text: "hello@kraftrix.africa" },
  { Icon: Phone,   text: "+254 700 000 000"       },
  { Icon: MapPin,  text: "Nairobi, Kenya"          },
];

/* ── useInView ──────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
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

/* ── newsletter input ───────────────────────────────────────── */
function Newsletter() {
  const [val, setVal] = useState("");
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (!val.includes("@")) return;
    setSent(true);
    setVal("");
  };

  return (
    <div style={{ marginTop: 28 }}>
      <p style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>
        Stay in the loop
      </p>
      {sent ? (
        <div style={{
          background: "rgba(248,73,45,0.12)", border: `1px solid ${C.orange}44`,
          borderRadius: 10, padding: "10px 16px",
          fontSize: 13, color: C.orange, fontWeight: 600,
          transition: "all 0.3s",
        }}>
          ✓ You're subscribed!
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="email"
            placeholder="your@email.com"
            value={val}
            onChange={e => setVal(e.target.value)}
            onKeyDown={e => e.key === "Enter" && submit()}
            style={{
              flex: 1, background: C.footerSurface,
              border: `1px solid ${C.footerBorder}`,
              borderRadius: 8, padding: "9px 14px",
              fontSize: 13, color: C.white,
              outline: "none",
              fontFamily: "inherit",
            }}
          />
          <button
            onClick={submit}
            style={{
              background: C.orange, border: "none",
              borderRadius: 8, padding: "9px 14px",
              cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 14px ${C.orange}55`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <Send size={14} color={C.white}/>
          </button>
        </div>
      )}
    </div>
  );
}

/* ── animated link ──────────────────────────────────────────── */
function FootLink({ href, label, delay, visible }: { href: string; label: string; delay: number; visible: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <li style={{
      opacity:   visible ? 1 : 0,
      transform: visible ? "translateX(0)" : "translateX(-12px)",
      transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
    }}>
      <a
        href={href}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display:    "inline-flex", alignItems: "center", gap: 5,
          fontSize:   13, color: hov ? C.white : C.muted,
          textDecoration: "none",
          transition: "color 0.18s",
        }}
      >
        {label}
        <ArrowUpRight
          size={11}
          style={{
            opacity:   hov ? 1 : 0,
            transform: hov ? "translate(1px,-1px)" : "translate(0,0)",
            transition:"opacity 0.18s, transform 0.18s",
          }}
        />
      </a>
    </li>
  );
}

/* ── FOOTER ─────────────────────────────────────────────────── */
const Footer = () => {
  const navigate = useNavigate();
  const { ref, visible } = useInView(0.05);

  const fadeUp = (delay = 0): React.CSSProperties => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  });

  return (
    <footer
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        background: C.footerBg,
        fontFamily: "'DM Sans','Inter',sans-serif",
      }}
    >
      {/* top orange bar */}
      <div style={{ height: 3, background: C.orange }}/>

      {/* main content */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 48px 56px", position: "relative" }}>
        <button
          onClick={() => navigate("/signin")}
          aria-label="Sign in"
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            background: "transparent",
            border: `1px solid ${C.footerBorder}`,
            borderRadius: 8,
            padding: "8px 10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s, border-color 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = C.footerSurface;
            (e.currentTarget as HTMLElement).style.borderColor = C.royalPurple;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.borderColor = C.footerBorder;
          }}
        >
          <Lock size={16} color={C.muted} />
        </button>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.8fr 1fr 1.2fr",
          gap: 56,
          alignItems: "start",
        }}>

          {/* ── col 1: brand ── */}
          <div style={fadeUp(0)}>
            {/* logo */}
            <a href="#home" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 20 }}>
              <div style={{
                width: 38, height: 38,
                background: C.royalPurple,
                borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, fontWeight: 900, color: C.white,
              }}>K</div>
              <span style={{ fontSize: 18, fontWeight: 800, color: C.white }}>
                Kraftrix<span style={{ color: C.orange }}>.</span>
              </span>
            </a>

            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.75, maxWidth: 300, marginBottom: 0 }}>
              Pan-African technology studio crafting websites, software, networks
              and brands of global standard — engineered for the continent.
            </p>

            {/* social icons */}
            <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
              {socials.map(({ Icon, label, href }) => (
                <SocialIcon key={label} Icon={Icon} label={label} href={href}/>
              ))}
            </div>

            <Newsletter/>
          </div>

          {/* ── col 2: company links ── */}
          <div style={fadeUp(80)}>
            <h4 style={{
              fontSize: 11, fontWeight: 800, letterSpacing: "0.15em",
              textTransform: "uppercase", color: C.white,
              marginBottom: 20,
            }}>Company</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {companyLinks.map((l, i) => (
                <FootLink key={l.href} href={l.href} label={l.label} delay={100 + i * 50} visible={visible}/>
              ))}
            </ul>
          </div>

          {/* ── col 3: contact ── */}
          <div style={fadeUp(160)}>
            <h4 style={{
              fontSize: 11, fontWeight: 800, letterSpacing: "0.15em",
              textTransform: "uppercase", color: C.white,
              marginBottom: 20,
            }}>Get in touch</h4>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {contact.map(({ Icon, text }) => (
                <ContactRow key={text} Icon={Icon} text={text} visible={visible}/>
              ))}
            </ul>

            {/* CTA button */}
            <a
              href="#quote"
              style={{
                ...fadeUp(260),
                display: "inline-flex", alignItems: "center", gap: 7,
                marginTop: 28,
                background: C.orange, color: C.white,
                borderRadius: 8, padding: "11px 20px",
                fontSize: 13, fontWeight: 700, textDecoration: "none",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 20px ${C.orange}55`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              Get a Quote <ArrowUpRight size={14}/>
            </a>
          </div>
        </div>

        {/* divider */}
        <div style={{
          ...fadeUp(300),
          height: 1, background: C.footerBorder, margin: "52px 0 28px",
        }}/>

        {/* bottom bar */}
        <div style={{
          ...fadeUp(340),
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between", gap: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Lock size={12} color={C.muted} />
            <p style={{ fontSize: 12, color: C.muted }}>
              © {new Date().getFullYear()} Kraftrix Africa Technologies. All rights reserved.
            </p>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {legalLinks.map(({ href, label }) => (
              <LegalLink key={label} href={href} label={label}/>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          footer > div:last-child > div:first-child {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
          footer > div:last-child > div:first-child > div:first-child {
            grid-column: 1 / -1;
          }
          footer { padding: 0 !important; }
          footer > div { padding: 56px 24px 40px !important; }
        }
        @media (max-width: 540px) {
          footer > div:last-child > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
        input::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>
    </footer>
  );
};

/* ── social icon ────────────────────────────────────────────── */
function SocialIcon({ Icon, label, href }: { Icon: React.ElementType; label: string; href: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 36, height: 36,
        borderRadius: 9,
        background:   hov ? C.royalPurple : C.footerSurface,
        border:       `1px solid ${hov ? C.royalPurple : C.footerBorder}`,
        display:      "flex", alignItems: "center", justifyContent: "center",
        textDecoration: "none",
        transition:   "background 0.2s, border-color 0.2s, transform 0.2s",
        transform:    hov ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <Icon size={14} color={hov ? C.white : C.muted} style={{ transition: "color 0.2s" }}/>
    </a>
  );
}

/* ── contact row ────────────────────────────────────────────── */
function ContactRow({ Icon, text, visible }: { Icon: React.ElementType; text: string; visible: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <li
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        opacity:   visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div style={{
        width: 30, height: 30, borderRadius: 7, flexShrink: 0,
        background:  hov ? C.orange : "rgba(248,73,45,0.12)",
        display:     "flex", alignItems: "center", justifyContent: "center",
        transition:  "background 0.2s",
      }}>
        <Icon size={13} color={hov ? C.white : C.orange} style={{ transition: "color 0.2s" }}/>
      </div>
      <span style={{ fontSize: 13, color: hov ? C.white : C.muted, transition: "color 0.2s" }}>
        {text}
      </span>
    </li>
  );
}

/* ── legal link ─────────────────────────────────────────────── */
function LegalLink({ href, label }: { href: string; label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontSize: 12, color: hov ? C.white : C.muted,
        textDecoration: "none", transition: "color 0.18s",
      }}
    >
      {label}
    </a>
  );
}

export default Footer;