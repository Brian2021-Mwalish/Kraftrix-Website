import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const links = [
  { href: "#home",      label: "Home"      },
  { href: "#about",     label: "About"     },
  { href: "#services",  label: "Services"  },
  { href: "#solutions", label: "Solutions" },
  { href: "#blog",      label: "Blog"      },
  { href: "#contact",   label: "Contact"   },
];

const Navbar = () => {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map(l => document.querySelector(l.href))
      .filter(Boolean) as Element[];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive("#" + e.target.id); }),
      { threshold: 0.4 }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = active === href;
    return (
      <a
        href={href}
        onClick={() => setOpen(false)}
        className={[
          "relative px-[14px] py-[6px] text-[13px] rounded-md transition-all duration-200 no-underline whitespace-nowrap",
          isActive
            ? "font-bold text-[#413584]"
            : "font-medium text-[#555] hover:text-[#413584] hover:bg-[#f0eefb]",
        ].join(" ")}
      >
        {label}
        <span
          className={[
            "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-[60%] bg-[#F8492D] rounded-full transition-transform duration-300",
            isActive ? "scale-x-100" : "scale-x-0",
          ].join(" ")}
        />
      </a>
    );
  };

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 bg-[#FBFAF9]",
        "transition-all duration-300",
        scrolled
          ? "border-b border-[#e8e6e0] shadow-[0_2px_16px_rgba(65,53,132,0.08)]"
          : "border-b border-transparent shadow-none",
      ].join(" ")}
    >
      {/* top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#413584]" />

      <div
        className={[
          "max-w-[1200px] mx-auto px-6 flex items-center justify-between transition-all duration-300",
          scrolled ? "h-14" : "h-[68px]",
        ].join(" ")}
      >
        {/* ── Logo ── */}
        <a href="#home" className="flex items-center flex-shrink-0">
          <img src="/Logo.png" alt="Kraftrix Logo" className="h-9 w-auto" />
        </a>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-1 flex-1 mx-6">
          {links.map(l => <NavLink key={l.href} href={l.href} label={l.label} />)}
        </nav>

        {/* ── Get a Quote CTA ── */}
        <a
          href="#quote"
          className="hidden md:flex items-center gap-1.5 px-[18px] py-2 text-[13px] font-bold text-[#FBFAF9] bg-[#F8492D] rounded-[7px] no-underline transition-all duration-150 hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(248,73,45,0.35)] whitespace-nowrap"
        >
          Get a Quote <ArrowRight size={13} />
        </a>

        {/* ── Hamburger ── */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="md:hidden p-2 rounded-md text-[#413584] bg-transparent border-none cursor-pointer hover:bg-[#f0eefb] transition-colors duration-150"
        >
          <div className={`transition-transform duration-[250ms] ${open ? "rotate-90" : "rotate-0"}`}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </div>
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      <div
        className={[
          "md:hidden bg-[#FBFAF9] overflow-hidden transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          open ? "max-h-[520px] border-t border-[#e8e6e0]" : "max-h-0",
        ].join(" ")}
      >
        <div className="px-6 pt-3 pb-6 flex flex-col gap-1">
          {links.map((l, i) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  transitionDelay: open ? `${i * 40}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(-12px)",
                }}
                className={[
                  "px-3 py-[11px] text-sm rounded-lg no-underline transition-all duration-150 border-l-[3px]",
                  isActive
                    ? "font-bold text-[#413584] bg-[#f0eefb] border-[#F8492D]"
                    : "font-medium text-black bg-transparent border-transparent hover:bg-[#f0eefb] hover:text-[#413584] hover:border-[#413584]",
                ].join(" ")}
              >
                {l.label}
              </a>
            );
          })}

          {/* Get a Quote */}
          <a
            href="#quote"
            onClick={() => setOpen(false)}
            style={{
              transitionDelay: open ? `${links.length * 40 + 40}ms` : "0ms",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(8px)",
            }}
            className="flex items-center justify-center gap-2 mt-3 px-5 py-[13px] text-sm font-bold text-[#FBFAF9] bg-[#F8492D] rounded-lg no-underline transition-all duration-300"
          >
            Get a Quote <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;