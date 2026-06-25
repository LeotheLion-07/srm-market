import { useState, useRef } from "react";
import {
  Home, Grid, Plus, User, ArrowLeft,
  Search, Bell, ShieldCheck, MapPin,
  ChevronDown, Camera,
} from "lucide-react";

const HOSTEL_BLOCKS = [
  "Paari Block", "Kaari Block", "Oori Block",
  "Adhiyaman Block", "Agasthiyar Block",
  "Nelson Mandela Block", "Sannasi A Block",
  "N Block", "JA Block", "Green Pearl",
  "Thamarai Block", "Malligai Block", "Mullai Block",
  "Sannasi C Block", "Manoranjitham Block",
  "Senbagam Block", "Kalpana Chawla Block",
  "Meenakshi Block", "Sister Nivedita Block",
  "ENQ-A Block", "ENQ-B Block",
];

export default function AccountPage({ user, setPage, onLogout }) {
  const [activePage, setActivePage] = useState("account");
  const [fullName, setFullName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState("");
  const [hostelBlock, setHostelBlock] = useState(user?.hostelBlock ?? "");
  const [msgAlerts, setMsgAlerts] = useState(true);
  const [savedUpdates, setSavedUpdates] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);
  const [showMajor, setShowMajor] = useState(true);
  const [profilePic, setProfilePic] = useState(null);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef();

  const handleNav = (id) => {
    setActivePage(id);
    setPage(id);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePic(url);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({ value, onChange }) => (
    <button onClick={() => onChange(!value)}
      style={{ width:48, height:26, borderRadius:13, background:value?"#f7c948":"rgba(255,255,255,0.1)", border:"none", cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
      <div style={{ width:20, height:20, borderRadius:"50%", background:"#fff", position:"absolute", top:3, left:value?25:3, transition:"left 0.2s", boxShadow:"0 1px 4px rgba(0,0,0,0.3)" }}/>
    </button>
  );

  return (
    <div style={{ background:"#0a1628", minHeight:"100vh", paddingBottom:88, fontFamily:"'DM Sans',-apple-system,sans-serif", WebkitFontSmoothing:"antialiased" }}>

      {/* ── HEADER ── */}
      <div style={{ position:"sticky", top:0, zIndex:20, background:"rgba(10,22,40,0.97)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"14px 16px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <button onClick={() => handleNav("home")}
            style={{ width:36, height:36, borderRadius:12, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <ArrowLeft size={18} color="#fff"/>
          </button>
          <h1 style={{ fontSize:17, fontWeight:800, color:"#fff", margin:0 }}>Account Details</h1>
          <button style={{ width:36, height:36, borderRadius:12, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <Search size={16} color="#fff"/>
          </button>
        </div>
      </div>

      <div style={{ padding:"24px 16px 0" }}>

        {/* ── PROFILE PHOTO ── */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:24 }}>
          <div style={{ position:"relative", marginBottom:12 }}>
            <div style={{ width:96, height:96, borderRadius:"50%", overflow:"hidden", border:"3px solid #f7c948", background:"linear-gradient(135deg,#667eea,#764ba2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {profilePic ? (
                <img src={profilePic} alt="Profile" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
              ) : (
                <span style={{ fontSize:36, fontWeight:900, color:"#fff" }}>
                  {(user?.name?.[0] ?? "U").toUpperCase()}
                </span>
              )}
            </div>
            {/* Camera button */}
            <button onClick={() => fileRef.current.click()}
              style={{ position:"absolute", bottom:0, right:0, width:30, height:30, borderRadius:"50%", background:"#f7c948", border:"2.5px solid #0a1628", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
              <Camera size={14} color="#0a1628" strokeWidth={2.5}/>
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handlePhotoChange}/>
          </div>
          <h2 style={{ fontSize:20, fontWeight:900, color:"#fff", margin:"0 0 4px" }}>{user?.name ?? "Student"}</h2>
          <p style={{ fontSize:13, color:"#4a6a8a", margin:0 }}>{user?.email ?? "yourname@srmist.edu.in"}</p>
          {user?.verified && (
            <span style={{ display:"inline-flex", alignItems:"center", gap:4, marginTop:8, padding:"3px 10px", borderRadius:20, background:"rgba(59,130,246,0.15)", border:"1px solid rgba(59,130,246,0.3)", fontSize:10, fontWeight:700, color:"#60a5fa" }}>
              <ShieldCheck size={10}/> SRM Verified Student
            </span>
          )}
        </div>

        {/* ── PERSONAL INFORMATION ── */}
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:"18px 16px", marginBottom:14 }}>
          <p style={{ fontSize:11, fontWeight:800, color:"#f7c948", letterSpacing:"0.1em", margin:"0 0 16px" }}>PERSONAL INFORMATION</p>

          {/* Full Name */}
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:12, color:"#4a6a8a", fontWeight:600, display:"block", marginBottom:7 }}>Full Name</label>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1.5px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"12px 14px", fontSize:14, color:"#fff", outline:"none", boxSizing:"border-box", fontFamily:"inherit" }}/>
          </div>

          {/* University Email */}
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:12, color:"#4a6a8a", fontWeight:600, display:"block", marginBottom:7 }}>University Email</label>
            <input value={user?.email ?? ""} readOnly
              style={{ width:"100%", background:"rgba(255,255,255,0.02)", border:"1.5px solid rgba(255,255,255,0.06)", borderRadius:12, padding:"12px 14px", fontSize:14, color:"#4a6a8a", outline:"none", boxSizing:"border-box", fontFamily:"inherit", cursor:"not-allowed" }}/>
          </div>

          {/* Phone Number */}
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:12, color:"#4a6a8a", fontWeight:600, display:"block", marginBottom:7 }}>Phone Number</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210" type="tel"
              style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1.5px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"12px 14px", fontSize:14, color:"#fff", outline:"none", boxSizing:"border-box", fontFamily:"inherit" }}/>
          </div>

          {/* Campus/Hostel Location */}
          <div>
            <label style={{ fontSize:12, color:"#4a6a8a", fontWeight:600, display:"block", marginBottom:7 }}>Campus / Hostel Location</label>
            <div style={{ position:"relative" }}>
              <MapPin size={14} color="#4a6a8a" style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", zIndex:1 }}/>
              <select value={hostelBlock} onChange={(e) => setHostelBlock(e.target.value)}
                style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1.5px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"12px 40px 12px 36px", fontSize:14, color:hostelBlock?"#fff":"#4a6a8a", outline:"none", boxSizing:"border-box", fontFamily:"inherit", appearance:"none", cursor:"pointer" }}>
                <option value="" style={{ background:"#0d1b2a" }}>Select hostel block</option>
                {HOSTEL_BLOCKS.map((b) => (
                  <option key={b} value={b} style={{ background:"#0d1b2a" }}>{b}</option>
                ))}
              </select>
              <ChevronDown size={14} color="#4a6a8a" style={{ position:"absolute", right:13, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}/>
            </div>
          </div>
        </div>

        {/* ── NOTIFICATION PREFERENCES ── */}
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:"18px 16px", marginBottom:14 }}>
          <p style={{ fontSize:11, fontWeight:800, color:"#f7c948", letterSpacing:"0.1em", margin:"0 0 16px" }}>NOTIFICATION PREFERENCES</p>

          {[
            { label:"New Message Alerts", sub:"Notify when a buyer/seller messages you", value:msgAlerts, onChange:setMsgAlerts },
            { label:"Item Saved Updates", sub:"Notify when a saved item drops in price", value:savedUpdates, onChange:setSavedUpdates },
          ].map(({ label, sub, value, onChange }) => (
            <div key={label} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingBottom:14, marginBottom:14, borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ flex:1, paddingRight:12 }}>
                <p style={{ fontSize:14, fontWeight:600, color:"#fff", margin:"0 0 2px" }}>{label}</p>
                <p style={{ fontSize:11, color:"#4a6a8a", margin:0 }}>{sub}</p>
              </div>
              <Toggle value={value} onChange={onChange}/>
            </div>
          ))}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <p style={{ fontSize:14, fontWeight:600, color:"#fff", margin:"0 0 2px" }}>Price Drop Alerts</p>
              <p style={{ fontSize:11, color:"#4a6a8a", margin:0 }}>Get notified on price reductions</p>
            </div>
            <Toggle value={false} onChange={() => {}}/>
          </div>
        </div>

        {/* ── PRIVACY SETTINGS ── */}
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:"18px 16px", marginBottom:20 }}>
          <p style={{ fontSize:11, fontWeight:800, color:"#f7c948", letterSpacing:"0.1em", margin:"0 0 16px" }}>PRIVACY SETTINGS</p>

          {[
            { label:"Public Profile", sub:"Allow others to see your listings history", value:publicProfile, onChange:setPublicProfile },
            { label:"Show Major & Year", sub:"Display academic info to verified users", value:showMajor, onChange:setShowMajor },
          ].map(({ label, sub, value, onChange }, i, arr) => (
            <div key={label} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingBottom: i < arr.length-1 ? 14 : 0, marginBottom: i < arr.length-1 ? 14 : 0, borderBottom: i < arr.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <div style={{ flex:1, paddingRight:12 }}>
                <p style={{ fontSize:14, fontWeight:600, color:"#fff", margin:"0 0 2px" }}>{label}</p>
                <p style={{ fontSize:11, color:"#4a6a8a", margin:0 }}>{sub}</p>
              </div>
              <Toggle value={value} onChange={onChange}/>
            </div>
          ))}
        </div>

        {/* ── SAVE BUTTON ── */}
        <button onClick={handleSave}
          style={{ width:"100%", padding:"16px", borderRadius:16, background: saved ? "#22c55e" : "linear-gradient(135deg,#f7c948,#f0a500)", border:"none", fontSize:16, fontWeight:900, color:"#0a1628", cursor:"pointer", transition:"background 0.3s", fontFamily:"inherit", boxShadow:"0 8px 24px rgba(247,201,72,0.3)", marginBottom:8 }}>
          {saved ? "✓ Changes Saved!" : "Save Changes"}
        </button>

        <p style={{ textAlign:"center", fontSize:11, color:"#2a4a6a", margin:"0 0 20px" }}>
          Last updated: just now
        </p>

        {/* ── LOGOUT ── */}
        <button onClick={onLogout}
          style={{ width:"100%", padding:"13px", borderRadius:14, background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", fontSize:13, fontWeight:700, color:"#f87171", cursor:"pointer", fontFamily:"inherit", marginBottom:8 }}>
          Sign Out
        </button>
      </div>

      {/* ── BOTTOM NAV ── */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0, background:"rgba(10,22,40,0.97)", backdropFilter:"blur(20px)", borderTop:"1px solid rgba(255,255,255,0.05)", padding:"10px 20px 18px", zIndex:20 }}>
        <div style={{ display:"flex", justifyContent:"space-around", alignItems:"center" }}>
          {[
            { icon:Home,          label:"Home",       id:"home" },
            { icon:Grid,          label:"Categories", id:"browse" },
            { icon:Plus,          label:"Sell",       id:"post" },
            { icon:User,          label:"Profile",    id:"account" },
          ].map(({ icon:Icon, label, id }) => {
            const active = activePage === id;
            return (
              <button key={id} onClick={() => handleNav(id)}
                style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, background: active && id==="account" ? "rgba(247,201,72,0.1)" : "none", border: active && id==="account" ? "1px solid rgba(247,201,72,0.2)" : "none", borderRadius:12, padding:"6px 14px", cursor:"pointer", outline:"none" }}>
                <Icon size={20} color={active?"#f7c948":"#2a4a6a"} strokeWidth={active?2.5:2}/>
                <span style={{ fontSize:10, fontWeight:active?700:500, color:active?"#f7c948":"#2a4a6a" }}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        input::placeholder { color: rgba(255,255,255,0.25) !important; }
        input { caret-color: #f7c948; }
        select option { background: #0d1b2a; color: #fff; }
      `}</style>
    </div>
  );
}