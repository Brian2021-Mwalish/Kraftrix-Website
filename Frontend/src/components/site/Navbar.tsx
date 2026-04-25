import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const C = {
  royalPurple:   "#413584",
  vibrantPurple: "#5644AE",
  orange:        "#F8492D",
  white:         "#FBFAF9",
  black:         "#000000",
};

const links = [
  { href: "#home",      label: "Home"      },
  { href: "#about",     label: "About"     },
  { href: "#services",  label: "Services"  },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#blog",      label: "Blog"      },
  { href: "#contact",   label: "Contact"   },
];

const Navbar = () => {
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState("#home");
  const [hovered,   setHovered]   = useState<string | null>(null);

  /* shrink navbar on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* highlight active link via IntersectionObserver */
  useEffect(() => {
    const sections = links.map(l => document.querySelector(l.href)).filter(Boolean) as Element[];
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive("#" + e.target.id); });
      },
      { threshold: 0.4 }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const headerBg    = scrolled ? C.white  : C.white;
  const headerBorder= scrolled ? `1px solid #e8e6e0` : `1px solid transparent`;
  const headerShadow= scrolled ? "0 2px 16px rgba(65,53,132,0.08)" : "none";
  const headerHeight= scrolled ? "56px" : "68px";

  return (
    <header style={{
      position:   "fixed",
      top:        0,
      left:       0,
      right:      0,
      zIndex:     50,
      background: headerBg,
      borderBottom: headerBorder,
      boxShadow:  headerShadow,
      transition: "height 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
      fontFamily: "'DM Sans','Inter',sans-serif",
    }}>

      {/* top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 3,
        background: C.royalPurple,
      }}/>

      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 32px",
        height: headerHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "height 0.3s ease",
      }}>

        {/* logo */}
        <a href="#home" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
          <img src="/Logo.png" alt="Kraftrix Logo" style={{ height: 36, width: "auto" }}/>
        </a>

        {/* desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden-mobile">
          {links.map(l => {
            const isActive  = active  === l.href;
            const isHovered = hovered === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                onMouseEnter={() => setHovered(l.href)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position:   "relative",
                  padding:    "6px 14px",
                  fontSize:   13,
                  fontWeight: isActive ? 700 : 500,
                  color:      isActive ? C.royalPurple : isHovered ? C.royalPurple : "#555",
                  textDecoration: "none",
                  borderRadius: 6,
                  background: isHovered && !isActive ? "#f0eefb" : "transparent",
                  transition: "color 0.2s, background 0.2s",
                }}
              >
                {l.label}
                {/* active underline pill */}
                <span style={{
                  position:   "absolute",
                  bottom:     0,
                  left:       "50%",
                  transform:  isActive ? "translateX(-50%) scaleX(1)" : "translateX(-50%) scaleX(0)",
                  transformOrigin: "center",
                  width:      "60%",
                  height:     2,
                  background: C.orange,
                  borderRadius: 999,
                  transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                }}/>
              </a>
            );
          })}
        </nav>

        {/* desktop CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="hidden-mobile">
          <a href="#contact" style={{
            padding:    "8px 16px",
            fontSize:   13,
            fontWeight: 600,
            color:      C.royalPurple,
            border:     `1.5px solid ${C.royalPurple}`,
            borderRadius: 7,
            textDecoration: "none",
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = C.royalPurple;
            (e.currentTarget as HTMLElement).style.color = C.white;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = C.royalPurple;
          }}>
            Sign in
          </a>

          <a href="#quote" style={{
            display:    "inline-flex",
            alignItems: "center",
            gap:        6,
            padding:    "8px 18px",
            fontSize:   13,
            fontWeight: 700,
            color:      C.white,
            background: C.orange,
            border:     "none",
            borderRadius: 7,
            textDecoration: "none",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 14px ${C.orange}55`;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}>
            Get a Quote <ArrowRight size={13}/>
          </a>
        </div>

        {/* hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{
            display:    "none",
            background: "none",
            border:     "none",
            padding:    8,
            cursor:     "pointer",
            color:      C.royalPurple,
            borderRadius: 6,
            transition: "background 0.15s",
          }}
          className="show-mobile"
        >
          <div style={{
            transform:  open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}>
            {open ? <X size={22}/> : <Menu size={22}/>}
          </div>
        </button>
      </div>

      {/* mobile drawer */}
      <div style={{
        maxHeight:  open ? 480 : 0,
        overflow:   "hidden",
        transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
        background: C.white,
        borderTop:  open ? `1px solid #e8e6e0` : "none",
      }}>
        <div style={{ padding: "12px 24px 24px", display: "flex", flexDirection: "column", gap: 2 }}>
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                padding:    "11px 12px",
                fontSize:   14,
                fontWeight: active === l.href ? 700 : 500,
                color:      active === l.href ? C.royalPurple : C.black,
                textDecoration: "none",
                borderRadius: 7,
                background: active === l.href ? "#f0eefb" : "transparent",
                borderLeft: active === l.href ? `3px solid ${C.orange}` : "3px solid transparent",
                transition: "all 0.15s",
                /* stagger in */
                opacity:    open ? 1 : 0,
                transform:  open ? "translateX(0)" : "translateX(-12px)",
                transitionDelay: open ? `${i * 40}ms` : "0ms",
              }}
            >
              {l.label}
            </a>
          ))}

          <a
            href="#quote"
            onClick={() => setOpen(false)}
            style={{
              display:    "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap:        7,
              marginTop:  12,
              padding:    "13px 20px",
              fontSize:   14,
              fontWeight: 700,
              color:      C.white,
              background: C.orange,
              borderRadius: 8,
              textDecoration: "none",
              opacity:    open ? 1 : 0,
              transform:  open ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 0.3s ease ${links.length * 40 + 40}ms, transform 0.3s ease ${links.length * 40 + 40}ms`,
            }}
          >
            Get a Quote <ArrowRight size={14}/>
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile   { display: none  !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none  !important; }
          .show-mobile   { display: flex  !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;