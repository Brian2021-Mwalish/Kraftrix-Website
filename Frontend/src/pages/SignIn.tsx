import { useState } from "react";
import { Lock, ArrowRight, Mail, Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

const C = {
  royalPurple:   "#413584",
  vibrantPurple: "#5644AE",
  orange:        "#F8492D",
  white:         "#FBFAF9",
  black:         "#000000",
  muted:         "#555555",
  border:        "#e8e6e0",
};

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'DM Sans','Inter',sans-serif" }}>
      <Navbar />

      <main style={{ paddingTop: 100, paddingBottom: 80 }}>
        <div style={{ maxWidth: 420, margin: "0 auto", padding: "0 24px" }}>

          {/* header */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{
              width: 56, height: 56,
              borderRadius: 14,
              background: C.royalPurple,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <Lock size={24} color={C.white} />
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: C.black, marginBottom: 8 }}>
              Welcome back
            </h1>
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6 }}>
              Sign in to your Kraftrix account to manage projects and collaborate with the team.
            </p>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* email */}
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.black, marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Email address
              </label>
              <div style={{
                position: "relative",
                borderRadius: 10,
                border: `1.5px solid ${focusedField === "email" ? C.royalPurple : C.border}`,
                background: C.white,
                transition: "border-color 0.2s",
              }}>
                <Mail size={16} color={C.muted} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@company.com"
                  required
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 42px",
                    fontSize: 14,
                    color: C.black,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    borderRadius: 10,
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>

            {/* password */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: C.black, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Password
                </label>
                <a href="#" style={{ fontSize: 12, fontWeight: 600, color: C.royalPurple, textDecoration: "none" }}>
                  Forgot?
                </a>
              </div>
              <div style={{
                position: "relative",
                borderRadius: 10,
                border: `1.5px solid ${focusedField === "password" ? C.royalPurple : C.border}`,
                background: C.white,
                transition: "border-color 0.2s",
              }}>
                <Lock size={16} color={C.muted} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: "100%",
                    padding: "12px 42px 12px 42px",
                    fontSize: 14,
                    color: C.black,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    borderRadius: 10,
                    fontFamily: "inherit",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {showPassword ? <EyeOff size={16} color={C.muted} /> : <Eye size={16} color={C.muted} />}
                </button>
              </div>
            </div>

            {/* submit */}
            <button
              type="submit"
              style={{
                marginTop: 6,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "14px 24px",
                fontSize: 14,
                fontWeight: 700,
                color: C.white,
                background: C.orange,
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
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
              Sign In <ArrowRight size={16} />
            </button>
          </form>

          {/* divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "32px 0" }}>
            <div style={{ flex: 1, height: 1, background: C.border }}/>
            <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>OR</span>
            <div style={{ flex: 1, height: 1, background: C.border }}/>
          </div>

          {/* secondary action */}
          <p style={{ textAlign: "center", fontSize: 13, color: C.muted }}>
            Don&apos;t have an account?{" "}
            <a href="#" style={{ color: C.royalPurple, fontWeight: 700, textDecoration: "none" }}>
              Get in touch
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignIn;

