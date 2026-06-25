import { useState } from "react";
import { Eye, EyeOff, ShieldCheck, AlertCircle, Loader } from "lucide-react";

const mockAuth = async (email, password) => {
  await new Promise((r) => setTimeout(r, 1200));
  if (password.length < 6) throw "Password must be at least 6 characters.";
  const accounts = {
    "manasij@srmist.edu.in": { name: "Manasij", regNo: "RA2211003010001", hostelBlock: "Block A", verified: true },
    "alex@srmist.edu.in": { name: "Alex Student", regNo: "RA2211003010042", hostelBlock: "Block C", verified: false },
  };
  const found = accounts[email.toLowerCase()];
  if (found) return { email: email.toLowerCase(), ...found };
  const name = email.split("@")[0];
  return { email: email.toLowerCase(), name: name.charAt(0).toUpperCase() + name.slice(1), regNo: "", hostelBlock: "", verified: false };
};

const validateEmail = (email) => {
  if (!email) return "Email is required.";
  if (!email.includes("@")) return "Enter a valid email address.";
  const domain = email.split("@")[1]?.toLowerCase();
  if (domain !== "srmist.edu.in") return "Only @srmist.edu.in emails are allowed.";
  return null;
};

const validatePassword = (pw) => {
  if (!pw) return "Password is required.";
  if (pw.length < 6) return "Password must be at least 6 characters.";
  return null;
};

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [pwFocused, setPwFocused] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [pwError, setPwError] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const showDomainHint = email.length > 0 && !email.toLowerCase().endsWith("@srmist.edu.in");
  const emailIsValid = email.toLowerCase().endsWith("@srmist.edu.in");

  const handleEmailBlur = () => { setTouched((t) => ({ ...t, email: true })); setEmailError(validateEmail(email)); };
  const handlePwBlur = () => { setTouched((t) => ({ ...t, password: true })); setPwError(validatePassword(password)); };

  const handleSubmit = async () => {
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    setEmailError(eErr);
    setPwError(pErr);
    setTouched({ email: true, password: true });
    if (eErr || pErr) return;
    setLoading(true);
    setServerError(null);
    try {
      const user = await mockAuth(email, password);
      onLogin(user);
    } catch (err) {
      setServerError(typeof err === "string" ? err : "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <div style={{
      minHeight: "100vh",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 20px 48px",
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      WebkitFontSmoothing: "antialiased",
      overflow: "hidden",
    }}>

      {/* ── BACKGROUND IMAGE ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "url('/srm.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}/>

      {/* ── DARK OVERLAY ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(160deg, rgba(4,8,16,0.92) 0%, rgba(7,15,26,0.88) 50%, rgba(4,8,16,0.95) 100%)",
        backdropFilter: "blur(2px)",
      }}/>

      {/* ── GOLD GLOW TOP LEFT ── */}
      <div style={{
        position: "absolute", top: -100, left: -100, zIndex: 1,
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(247,201,72,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }}/>

      {/* ── GOLD GLOW BOTTOM RIGHT ── */}
      <div style={{
        position: "absolute", bottom: -100, right: -100, zIndex: 1,
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(102,126,234,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }}/>

      {/* ── CONTENT ── */}
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* ── LOGO ── */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 76, height: 76, borderRadius: 24,
            background: "linear-gradient(135deg, rgba(13,27,42,0.9), rgba(20,34,54,0.9))",
            border: "1.5px solid rgba(247,201,72,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 18px",
            boxShadow: "0 8px 32px rgba(247,201,72,0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}>
            <ShieldCheck size={34} color="#f7c948" strokeWidth={1.6}/>
          </div>

          <h1 style={{
            fontSize: 32, fontWeight: 900, color: "#fff",
            margin: "0 0 6px", letterSpacing: "-0.8px", lineHeight: 1,
          }}>
            Campus<span style={{ color: "#f7c948" }}>Market</span>
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0, letterSpacing: "0.02em" }}>
            SRM Institute of Science &amp; Technology
          </p>

          {/* Live badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            marginTop: 12, padding: "5px 12px", borderRadius: 20,
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.25)",
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 6px rgba(34,197,94,0.8)",
              animation: "pulse 2s infinite",
            }}/>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", letterSpacing: "0.05em" }}>
              CAMPUS MARKETPLACE LIVE
            </span>
          </div>
        </div>

        {/* ── CARD ── */}
        <div style={{
          width: "100%",
          background: "rgba(13,27,42,0.85)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 28,
          padding: "32px 28px 28px",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>
            Welcome back 👋
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", margin: "0 0 28px" }}>
            Sign in with your SRM institutional email
          </p>

          {/* EMAIL */}
          <div style={{ marginBottom: 18 }}>
            <label style={{
              display: "block", fontSize: 11, fontWeight: 700,
              color: touched.email && emailError ? "#f87171" : "rgba(255,255,255,0.4)",
              marginBottom: 8, letterSpacing: "0.06em",
            }}>
              UNIVERSITY EMAIL
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setServerError(null); if (touched.email) setEmailError(validateEmail(e.target.value)); }}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => { setEmailFocused(false); handleEmailBlur(); }}
                onKeyDown={handleKeyDown}
                placeholder="yourname@srmist.edu.in"
                autoCapitalize="none"
                autoCorrect="off"
                style={{
                  width: "100%", background: "rgba(255,255,255,0.05)",
                  border: `1.5px solid ${touched.email && emailError ? "rgba(239,68,68,0.6)" : emailFocused ? "rgba(247,201,72,0.5)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 14, padding: "13px 44px 13px 16px",
                  fontSize: 14, color: "#fff", outline: "none",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box",
                  fontFamily: "'DM Sans', -apple-system, sans-serif",
                }}
              />
              {emailIsValid && (
                <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }}>
                  <ShieldCheck size={16} color="#22c55e"/>
                </div>
              )}
            </div>
            {showDomainHint && !emailError && (
              <p style={{ fontSize: 11, color: "#f7c948", margin: "6px 0 0", display: "flex", alignItems: "center", gap: 5 }}>
                <AlertCircle size={11}/> Only @srmist.edu.in addresses are accepted
              </p>
            )}
            {touched.email && emailError && (
              <p style={{ fontSize: 11, color: "#f87171", margin: "6px 0 0", display: "flex", alignItems: "center", gap: 5 }}>
                <AlertCircle size={11}/> {emailError}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: "block", fontSize: 11, fontWeight: 700,
              color: touched.password && pwError ? "#f87171" : "rgba(255,255,255,0.4)",
              marginBottom: 8, letterSpacing: "0.06em",
            }}>
              PASSWORD
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setServerError(null); if (touched.password) setPwError(validatePassword(e.target.value)); }}
                onFocus={() => setPwFocused(true)}
                onBlur={() => { setPwFocused(false); handlePwBlur(); }}
                onKeyDown={handleKeyDown}
                placeholder="Enter your password"
                style={{
                  width: "100%", background: "rgba(255,255,255,0.05)",
                  border: `1.5px solid ${touched.password && pwError ? "rgba(239,68,68,0.6)" : pwFocused ? "rgba(247,201,72,0.5)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 14, padding: "13px 48px 13px 16px",
                  fontSize: 14, color: "#fff", outline: "none",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box",
                  fontFamily: "'DM Sans', -apple-system, sans-serif",
                }}
              />
              <button onClick={() => setShowPw((v) => !v)} style={{
                position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center",
              }}>
                {showPw ? <EyeOff size={16} color="rgba(255,255,255,0.4)"/> : <Eye size={16} color="rgba(255,255,255,0.4)"/>}
              </button>
            </div>
            {touched.password && pwError && (
              <p style={{ fontSize: 11, color: "#f87171", margin: "6px 0 0", display: "flex", alignItems: "center", gap: 5 }}>
                <AlertCircle size={11}/> {pwError}
              </p>
            )}
          </div>

          {/* SERVER ERROR */}
          {serverError && (
            <div style={{
              background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: 12, padding: "10px 14px", marginBottom: 18,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <AlertCircle size={14} color="#f87171" style={{ flexShrink: 0 }}/>
              <p style={{ fontSize: 12, color: "#f87171", margin: 0 }}>{serverError}</p>
            </div>
          )}

          {/* SIGN IN BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%", padding: "15px",
              borderRadius: 16,
              background: loading ? "rgba(247,201,72,0.5)" : "linear-gradient(135deg, #f7c948, #f0a500)",
              border: "none", fontSize: 15, fontWeight: 800,
              color: "#070f1a", cursor: loading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              letterSpacing: "0.01em",
              boxShadow: loading ? "none" : "0 8px 24px rgba(247,201,72,0.3)",
              transition: "all 0.2s",
              fontFamily: "'DM Sans', -apple-system, sans-serif",
            }}
          >
            {loading ? (
              <>
                <Loader size={16} color="#070f1a" style={{ animation: "spin 1s linear infinite" }}/>
                Signing in...
              </>
            ) : "Sign In →"}
          </button>

          {/* FORGOT */}
          <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.3)", margin: "16px 0 0" }}>
            Forgot password?{" "}
            <span
              style={{ color: "#f7c948", cursor: "pointer", fontWeight: 600 }}
              onClick={() => alert("Contact SRM IT helpdesk: helpdesk@srmist.edu.in")}
            >
              Contact IT Helpdesk
            </span>
          </p>
        </div>

        {/* ── DOMAIN LOCK NOTICE ── */}
        <div style={{
          marginTop: 16, display: "flex", alignItems: "center", gap: 8,
          padding: "10px 16px",
          background: "rgba(247,201,72,0.05)",
          border: "1px solid rgba(247,201,72,0.1)",
          borderRadius: 14, width: "100%", boxSizing: "border-box",
        }}>
          <ShieldCheck size={14} color="#f7c948" style={{ flexShrink: 0 }}/>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0, lineHeight: 1.5 }}>
            Exclusively for{" "}
            <span style={{ color: "#f7c948", fontWeight: 700 }}>SRM students</span>.
            Only @srmist.edu.in addresses can sign in.
          </p>
        </div>

        {/* ── CATEGORY PILLS ── */}
        <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap", justifyContent: "center" }}>
          {["📚 Books", "💻 Electronics", "🛏️ Hostel", "🚲 Bikes", "👕 Clothes"].map(item => (
            <span key={item} style={{
              fontSize: 11, padding: "5px 12px", borderRadius: 20,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.4)",
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── ANIMATIONS ── */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        input::placeholder { color: rgba(255,255,255,0.25) !important; }
        input { caret-color: #f7c948; }
      `}</style>
    </div>
  );
}