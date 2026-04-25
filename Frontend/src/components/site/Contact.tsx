import { useState, useEffect, useRef } from "react";
import { Mail, MapPin, Phone, MessageCircle, Send, CheckCircle } from "lucide-react";

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
  inputBg:       "#F8F7F4",
};

const contactItems = [
  { Icon: Mail,          label: "Email",    value: "hello@kraftrix.africa",            href: "mailto:hello@kraftrix.africa" },
  { Icon: Phone,         label: "Phone",    value: "+254 707728143",                 href: "tel:+254700000000" },
  { Icon: MessageCircle, label: "WhatsApp", value: "Chat with us instantly",           href: "https://wa.me/254700000000" },
  { Icon: MapPin,        label: "HQ",       value: "Nairobi, Kenya — serving Africa",  href: "#" },
];

const services = [
  "Website Development", "Software Development", "IT Support",
  "Networking", "CCTV Installation", "Branding", "SEO & Marketing", "Cloud Solutions",
];

const budgets = [
  "Under $1,000", "$1,000 – $5,000", "$5,000 – $20,000", "$20,000+",
];

/* ── useInView ──────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
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

/* ── contact card ───────────────────────────────────────────── */
function ContactCard({ item, delay, visible }: { item: typeof contactItems[0]; delay: number; visible: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={item.href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:      "flex",
        alignItems:   "center",
        gap:          14,
        textDecoration: "none",
        background:   hov ? C.royalPurple : C.cardBg,
        border:       `1px solid ${hov ? C.royalPurple : C.border}`,
        borderRadius: 14,
        padding:      "14px 18px",
        opacity:      visible ? 1 : 0,
        transform:    visible ? "translateX(0)" : "translateX(-20px)",
        transition:   `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, background 0.2s, border-color 0.2s`,
        cursor:       "pointer",
      }}
    >
      <div style={{
        width:          42, height: 42, flexShrink: 0,
        background:     hov ? C.orange : "#EEEcf8",
        borderRadius:   11,
        display:        "flex", alignItems: "center", justifyContent: "center",
        transition:     "background 0.2s",
      }}>
        <item.Icon size={18} color={hov ? C.white : C.royalPurple} style={{ transition: "color 0.2s" }}/>
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: hov ? "rgba(251,250,249,0.55)" : C.muted, marginBottom: 2 }}>
          {item.label}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: hov ? C.white : C.black, transition: "color 0.2s" }}>
          {item.value}
        </div>
      </div>
    </a>
  );
}

/* ── styled input ───────────────────────────────────────────── */
function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.black, marginBottom: 6, letterSpacing: "0.03em" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  background: C.inputBg, border: `1.5px solid ${C.border}`,
  borderRadius: 8, padding: "10px 14px",
  fontSize: 13, color: C.black, fontFamily: "inherit",
  outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
};

function StyledInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [foc, setFoc] = useState(false);
  return (
    <input
      {...props}
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
      style={{ ...inputStyle, borderColor: foc ? C.royalPurple : C.border, boxShadow: foc ? `0 0 0 3px ${C.royalPurple}18` : "none" }}
    />
  );
}

function StyledSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [foc, setFoc] = useState(false);
  return (
    <select
      {...props}
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
      style={{ ...inputStyle, height: 40, appearance: "none", cursor: "pointer", borderColor: foc ? C.royalPurple : C.border, boxShadow: foc ? `0 0 0 3px ${C.royalPurple}18` : "none" }}
    />
  );
}

function StyledTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [foc, setFoc] = useState(false);
  return (
    <textarea
      {...props}
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
      style={{ ...inputStyle, resize: "vertical", minHeight: 110, borderColor: foc ? C.royalPurple : C.border, boxShadow: foc ? `0 0 0 3px ${C.royalPurple}18` : "none" }}
    />
  );
}

/* ── CONTACT ────────────────────────────────────────────────── */
const Contact = () => {
  const { ref, visible } = useInView(0.06);
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      formRef.current?.reset();
      setTimeout(() => setSuccess(false), 5000);
    }, 900);
  };

  const fadeUp = (delay = 0): React.CSSProperties => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  });

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: C.pageBg,
        padding:    "100px 48px 112px",
        fontFamily: "'DM Sans','Inter',sans-serif",
        position:   "relative",
        overflow:   "hidden",
      }}
    >
      {/* bg accents */}
      <div style={{ position:"absolute", top:-100, right:-100, width:400, height:400, background:C.royalPurple, borderRadius:"50%", opacity:0.04, pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:-60, left:-60, width:280, height:280, background:C.orange, borderRadius:"50%", opacity:0.05, pointerEvents:"none" }}/>

      <div style={{ maxWidth: 1120, margin: "0 auto" }}>

        {/* section header */}
        <div style={{ textAlign: "center", marginBottom: 56, ...fadeUp(0) }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:16 }}>
            <span style={{ display:"block", width:24, height:2, background:C.orange, borderRadius:999 }}/>
            <span style={{ fontSize:11, fontWeight:800, letterSpacing:"0.18em", color:C.royalPurple, textTransform:"uppercase" }}>
              Get in touch
            </span>
            <span style={{ display:"block", width:24, height:2, background:C.orange, borderRadius:999 }}/>
          </div>
          <h2 style={{ fontSize:42, fontWeight:900, lineHeight:1.08, color:C.black, letterSpacing:"-0.02em", margin:0 }}>
            Let's build{" "}
            <span style={{ color:C.royalPurple, borderBottom:`3px solid ${C.orange}`, paddingBottom:2 }}>
              something legendary
            </span>
            .
          </h2>
          <p style={{ marginTop:14, fontSize:15, color:C.muted, lineHeight:1.7 }}>
            Tell us about your project and we'll get back within one business day.
          </p>
        </div>

        {/* two-column grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:48, alignItems:"start" }}>

          {/* ── LEFT ── */}
          <div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {contactItems.map((item, i) => (
                <ContactCard key={item.label} item={item} delay={80 + i * 70} visible={visible}/>
              ))}
            </div>

            {/* trust strip */}
            <div style={{
              ...fadeUp(400),
              marginTop: 28,
              background: C.royalPurple,
              borderRadius: 16,
              padding: "20px 22px",
              display: "flex", flexDirection: "column", gap: 10,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.white }}>Why choose Kraftrix?</div>
              {["Response within 24 hours", "No-commitment quote", "NDA available on request", "Pan-African delivery team"].map(t => (
                <div key={t} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <CheckCircle size={13} color={C.orange}/>
                  <span style={{ fontSize:12, color:"rgba(251,250,249,0.75)" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <div style={{
            ...fadeUp(120),
            background:   C.cardBg,
            border:       `1px solid ${C.border}`,
            borderRadius: 24,
            padding:      "36px 32px",
            position:     "relative",
            overflow:      "hidden",
          }}>
            {/* top accent */}
            <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:C.orange }}/>

            <h3 style={{ fontSize:22, fontWeight:900, color:C.black, margin:0 }}>Request a quote</h3>
            <p style={{ fontSize:13, color:C.muted, marginTop:4, marginBottom:28 }}>Fill in a few details — no commitment required.</p>

            {/* success banner */}
            <div style={{
              maxHeight: success ? 80 : 0,
              overflow:  "hidden",
              transition:"max-height 0.4s ease",
              marginBottom: success ? 20 : 0,
            }}>
              <div style={{
                background: "#edf7f0", border:"1px solid #6fcf97",
                borderRadius: 10, padding:"12px 16px",
                display:"flex", alignItems:"center", gap:10,
                fontSize:13, fontWeight:600, color:"#1a7a40",
              }}>
                <CheckCircle size={16} color="#1a7a40"/> Quote request received! We'll be in touch within 24h.
              </div>
            </div>

            <form ref={formRef} id="quote" onSubmit={onSubmit}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px 18px" }}>
                <Field id="name" label="Name">
                  <StyledInput id="name" required maxLength={100} placeholder="Your full name"/>
                </Field>
                <Field id="email" label="Email">
                  <StyledInput id="email" type="email" required maxLength={255} placeholder="you@company.com"/>
                </Field>
                <Field id="phone" label="Phone">
                  <StyledInput id="phone" maxLength={30} placeholder="+254..."/>
                </Field>
                <Field id="service" label="Service">
                  <StyledSelect id="service" required>
                    {services.map(s => <option key={s}>{s}</option>)}
                  </StyledSelect>
                </Field>
                <div style={{ gridColumn:"1 / -1" }}>
                  <Field id="budget" label="Budget">
                    <StyledSelect id="budget">
                      {budgets.map(b => <option key={b}>{b}</option>)}
                    </StyledSelect>
                  </Field>
                </div>
                <div style={{ gridColumn:"1 / -1" }}>
                  <Field id="message" label="Message">
                    <StyledTextarea id="message" required maxLength={1000} rows={4} placeholder="Tell us about your project..."/>
                  </Field>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop:      24,
                  width:          "100%",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  gap:            8,
                  background:     loading ? C.vibrantPurple : C.orange,
                  color:          C.white,
                  border:         "none",
                  borderRadius:   10,
                  padding:        "14px 24px",
                  fontSize:       14,
                  fontWeight:     700,
                  cursor:         loading ? "not-allowed" : "pointer",
                  fontFamily:     "inherit",
                  transition:     "background 0.2s, transform 0.15s, box-shadow 0.15s",
                }}
                onMouseEnter={e => {
                  if (!loading) {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 20px ${C.orange}55`;
                  }
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {loading ? (
                  <>
                    <span style={{
                      width:12, height:12, borderRadius:"50%",
                      border:`2px solid rgba(255,255,255,0.3)`,
                      borderTopColor: C.white,
                      display:"inline-block",
                      animation:"spin 0.7s linear infinite",
                    }}/>
                    Sending…
                  </>
                ) : (
                  <> Send request <Send size={15}/> </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 860px) {
          #contact > div > div:last-child { grid-template-columns: 1fr !important; gap: 32px !important; }
          #contact { padding: 72px 24px 80px !important; }
          #contact > div > div:first-child { text-align: center !important; }
        }
        select option { background: #FBFAF9; color: #000; }
        input::placeholder, textarea::placeholder { color: #bbb; }
      `}</style>
    </section>
  );
};

export default Contact;