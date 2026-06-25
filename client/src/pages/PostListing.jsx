import { useState, useRef } from "react";
import {
  ArrowLeft, Camera, X, Tag, DollarSign,
  AlignLeft, CheckCircle, ChevronDown, MapPin, BookOpen
} from "lucide-react";

const CATEGORIES = ["Books", "Electronics", "Hostel", "Bikes", "Clothes", "Other"];
const CONDITIONS = ["New", "Like New", "Good", "Fair"];
const HOSTEL_BLOCKS = [
  "Paari Block","Kaari Block","Oori Block","Adhiyaman Block",
  "Agasthiyar Block","Nelson Mandela Block","Sannasi A Block",
  "N Block","JA Block","Green Pearl","Thamarai Block",
  "Malligai Block","Mullai Block","Sannasi C Block",
  "Manoranjitham Block","Senbagam Block","Kalpana Chawla Block",
  "Meenakshi Block","Sister Nivedita Block","ENQ-A Block","ENQ-B Block",
];
const SEMESTERS = ["Sem 1","Sem 2","Sem 3","Sem 4","Sem 5","Sem 6","Sem 7","Sem 8"];

export default function PostListing({ setPage, user }) {
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [negotiable, setNegotiable] = useState(false);
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [hostelBlock, setHostelBlock] = useState("");
  const [semester, setSemester] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const fileRef = useRef();

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((f) => URL.createObjectURL(f));
    setPhotos((p) => [...p, ...urls].slice(0, 6));
  };

  const removePhoto = (i) => setPhotos((p) => p.filter((_, idx) => idx !== i));

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Title is required";
    if (!price || isNaN(price) || Number(price) <= 0) e.price = "Enter a valid price";
    if (!category) e.category = "Select a category";
    if (!condition) e.condition = "Select condition";
    if (!description.trim()) e.description = "Description is required";
    if (!hostelBlock) e.hostelBlock = "Select your hostel block";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  // ── SUCCESS SCREEN ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div style={{ background:"#070f1a", minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px", fontFamily:"'DM Sans',-apple-system,sans-serif" }}>
        <div style={{ width:80, height:80, borderRadius:24, background:"rgba(34,197,94,0.1)", border:"2px solid rgba(34,197,94,0.3)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24 }}>
          <CheckCircle size={40} color="#22c55e" strokeWidth={1.5}/>
        </div>
        <h2 style={{ fontSize:24, fontWeight:900, color:"#fff", margin:"0 0 8px", textAlign:"center" }}>Listing Posted! 🎉</h2>
        <p style={{ fontSize:14, color:"#4a6a8a", textAlign:"center", margin:"0 0 32px", lineHeight:1.6 }}>
          Your listing is now live on CampusMarket. Other SRM students can now see and contact you!
        </p>
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:"16px 20px", width:"100%", maxWidth:340, marginBottom:24 }}>
          <p style={{ fontSize:13, fontWeight:700, color:"#fff", margin:"0 0 4px" }}>{title}</p>
          <p style={{ fontSize:20, fontWeight:900, color:"#f7c948", margin:"0 0 8px" }}>₹{Number(price).toLocaleString("en-IN")}</p>
          <div style={{ display:"flex", gap:8 }}>
            <span style={{ fontSize:10, fontWeight:700, color:"#f7c948", background:"rgba(247,201,72,0.1)", padding:"2px 8px", borderRadius:6 }}>{category}</span>
            <span style={{ fontSize:10, fontWeight:700, color:"#22c55e", background:"rgba(34,197,94,0.1)", padding:"2px 8px", borderRadius:6 }}>{condition}</span>
          </div>
        </div>
        <button onClick={() => setPage("home")}
          style={{ width:"100%", maxWidth:340, padding:"15px", borderRadius:16, background:"linear-gradient(135deg,#f7c948,#f0a500)", border:"none", fontSize:15, fontWeight:800, color:"#070f1a", cursor:"pointer" }}>
          Back to Home
        </button>
        <button onClick={() => { setSubmitted(false); setTitle(""); setPrice(""); setCategory(""); setCondition(""); setDescription(""); setPhotos([]); setHostelBlock(""); setSemester(""); }}
          style={{ marginTop:12, background:"none", border:"none", fontSize:13, color:"#4a6a8a", cursor:"pointer", fontWeight:600 }}>
          Post Another Listing
        </button>
      </div>
    );
  }

  // ── FORM ───────────────────────────────────────────────────────────────────
  return (
    <div style={{ background:"#070f1a", minHeight:"100vh", paddingBottom:100, fontFamily:"'DM Sans',-apple-system,sans-serif", WebkitFontSmoothing:"antialiased" }}>

      {/* Header */}
      <div style={{ position:"sticky", top:0, zIndex:20, background:"rgba(7,15,26,0.97)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"14px 16px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={() => setPage("home")}
            style={{ width:36, height:36, borderRadius:12, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <ArrowLeft size={18} color="#fff"/>
          </button>
          <div>
            <h1 style={{ fontSize:18, fontWeight:900, color:"#fff", margin:0 }}>Post a Listing</h1>
            <p style={{ fontSize:11, color:"#4a6a8a", margin:0 }}>Sell to SRM students</p>
          </div>
        </div>
      </div>

      <div style={{ padding:"20px 16px" }}>

        {/* ── PHOTO UPLOAD ── */}
        <div style={{ marginBottom:24 }}>
          <label style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.5)", letterSpacing:"0.06em", display:"block", marginBottom:10 }}>
            PHOTOS ({photos.length}/6)
          </label>
          <div style={{ display:"flex", gap:10, overflowX:"auto", scrollbarWidth:"none", paddingBottom:4 }}>
            {/* Add photo button */}
            {photos.length < 6 && (
              <button onClick={() => fileRef.current.click()}
                style={{ flexShrink:0, width:90, height:90, borderRadius:16, background:"rgba(255,255,255,0.03)", border:"2px dashed rgba(255,255,255,0.1)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6, cursor:"pointer" }}>
                <Camera size={22} color="#4a6a8a"/>
                <span style={{ fontSize:10, color:"#4a6a8a", fontWeight:600 }}>Add Photo</span>
              </button>
            )}
            {/* Photo previews */}
            {photos.map((url, i) => (
              <div key={i} style={{ flexShrink:0, width:90, height:90, borderRadius:16, overflow:"hidden", position:"relative", border:"1px solid rgba(255,255,255,0.08)" }}>
                <img src={url} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                {i === 0 && (
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"rgba(247,201,72,0.9)", padding:"2px 0", textAlign:"center", fontSize:9, fontWeight:800, color:"#070f1a" }}>
                    COVER
                  </div>
                )}
                <button onClick={() => removePhoto(i)}
                  style={{ position:"absolute", top:4, right:4, width:20, height:20, borderRadius:"50%", background:"rgba(0,0,0,0.7)", border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                  <X size={11} color="#fff"/>
                </button>
              </div>
            ))}
          </div>
          <input ref={fileRef} type="file" accept="image/*" multiple style={{ display:"none" }} onChange={handlePhotos}/>
          <p style={{ fontSize:11, color:"#3a5a7a", margin:"8px 0 0" }}>First photo will be the cover image. Add up to 6 photos.</p>
        </div>

        {/* ── ITEM NAME ── */}
        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.5)", letterSpacing:"0.06em", display:"block", marginBottom:8 }}>
            ITEM NAME *
          </label>
          <div style={{ position:"relative" }}>
            <Tag size={15} color="#4a6a8a" style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)" }}/>
            <input
              value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="What are you selling?"
              style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:`1.5px solid ${errors.title ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.08)"}`, borderRadius:14, padding:"13px 16px 13px 42px", fontSize:14, color:"#fff", outline:"none", boxSizing:"border-box", fontFamily:"inherit" }}
            />
          </div>
          {errors.title && <p style={{ fontSize:11, color:"#f87171", margin:"5px 0 0" }}>⚠ {errors.title}</p>}
        </div>

        {/* ── PRICE ── */}
        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.5)", letterSpacing:"0.06em", display:"block", marginBottom:8 }}>
            PRICE *
          </label>
          <div style={{ position:"relative" }}>
            <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:16, fontWeight:700, color:"#f7c948" }}>₹</span>
            <input
              value={price} onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00" type="number" min="0"
              style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:`1.5px solid ${errors.price ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.08)"}`, borderRadius:14, padding:"13px 16px 13px 36px", fontSize:14, color:"#fff", outline:"none", boxSizing:"border-box", fontFamily:"inherit" }}
            />
          </div>
          {errors.price && <p style={{ fontSize:11, color:"#f87171", margin:"5px 0 0" }}>⚠ {errors.price}</p>}

          {/* Negotiable toggle */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:10, padding:"10px 14px", background:"rgba(255,255,255,0.03)", borderRadius:12, border:"1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <p style={{ fontSize:13, fontWeight:600, color:"#fff", margin:0 }}>Negotiable</p>
              <p style={{ fontSize:11, color:"#4a6a8a", margin:0 }}>Willing to discuss the price</p>
            </div>
            <button onClick={() => setNegotiable((v) => !v)}
              style={{ width:44, height:24, borderRadius:12, background:negotiable?"#f7c948":"rgba(255,255,255,0.1)", border:"none", cursor:"pointer", position:"relative", transition:"background 0.2s" }}>
              <div style={{ width:18, height:18, borderRadius:"50%", background:"#fff", position:"absolute", top:3, left:negotiable?23:3, transition:"left 0.2s" }}/>
            </button>
          </div>
        </div>

        {/* ── CATEGORY ── */}
        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.5)", letterSpacing:"0.06em", display:"block", marginBottom:8 }}>
            CATEGORY *
          </label>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)}
                style={{ padding:"8px 16px", borderRadius:20, fontSize:12, fontWeight:700, cursor:"pointer", background:category===cat?"#f7c948":"rgba(255,255,255,0.04)", color:category===cat?"#070f1a":"#4a6a8a", border:category===cat?"1.5px solid #f7c948":"1px solid rgba(255,255,255,0.08)", transition:"all 0.15s" }}>
                {cat}
              </button>
            ))}
          </div>
          {errors.category && <p style={{ fontSize:11, color:"#f87171", margin:"5px 0 0" }}>⚠ {errors.category}</p>}
        </div>

        {/* ── SEMESTER (only for Books) ── */}
        {category === "Books" && (
          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.5)", letterSpacing:"0.06em", display:"block", marginBottom:8 }}>
              SEMESTER
            </label>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {SEMESTERS.map((sem) => (
                <button key={sem} onClick={() => setSemester(sem)}
                  style={{ padding:"7px 14px", borderRadius:20, fontSize:12, fontWeight:700, cursor:"pointer", background:semester===sem?"rgba(168,85,247,0.2)":"rgba(255,255,255,0.04)", color:semester===sem?"#c084fc":"#4a6a8a", border:semester===sem?"1.5px solid rgba(168,85,247,0.5)":"1px solid rgba(255,255,255,0.08)" }}>
                  {sem}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── CONDITION ── */}
        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.5)", letterSpacing:"0.06em", display:"block", marginBottom:8 }}>
            CONDITION *
          </label>
          <div style={{ display:"flex", gap:8 }}>
            {CONDITIONS.map((c) => {
              const colors = { New:"#22c55e", "Like New":"#f7c948", Good:"#60a5fa", Fair:"#9ca3af" };
              const active = condition === c;
              return (
                <button key={c} onClick={() => setCondition(c)}
                  style={{ flex:1, padding:"10px 4px", borderRadius:12, fontSize:11, fontWeight:700, cursor:"pointer", background:active?`rgba(${c==="New"?"34,197,94":c==="Like New"?"247,201,72":c==="Good"?"96,165,250":"156,163,175"},0.15)`:"rgba(255,255,255,0.03)", color:active?colors[c]:"#4a6a8a", border:active?`1.5px solid ${colors[c]}40`:"1px solid rgba(255,255,255,0.06)", textAlign:"center" }}>
                  {c}
                </button>
              );
            })}
          </div>
          {errors.condition && <p style={{ fontSize:11, color:"#f87171", margin:"5px 0 0" }}>⚠ {errors.condition}</p>}
        </div>

        {/* ── DESCRIPTION ── */}
        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.5)", letterSpacing:"0.06em", display:"block", marginBottom:8 }}>
            DESCRIPTION *
          </label>
          <textarea
            value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your item — condition details, reason for selling, usage history..."
            rows={4}
            style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:`1.5px solid ${errors.description ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.08)"}`, borderRadius:14, padding:"13px 16px", fontSize:14, color:"#fff", outline:"none", boxSizing:"border-box", fontFamily:"inherit", resize:"none", lineHeight:1.6 }}
          />
          <p style={{ fontSize:11, color:"#3a5a7a", margin:"4px 0 0", textAlign:"right" }}>{description.length}/500</p>
          {errors.description && <p style={{ fontSize:11, color:"#f87171", margin:"2px 0 0" }}>⚠ {errors.description}</p>}
        </div>

        {/* ── HOSTEL BLOCK ── */}
        <div style={{ marginBottom:24 }}>
          <label style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.5)", letterSpacing:"0.06em", display:"block", marginBottom:8 }}>
            YOUR HOSTEL BLOCK *
          </label>
          <div style={{ position:"relative" }}>
            <MapPin size={15} color="#4a6a8a" style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", zIndex:1 }}/>
            <select
              value={hostelBlock} onChange={(e) => setHostelBlock(e.target.value)}
              style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:`1.5px solid ${errors.hostelBlock ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.08)"}`, borderRadius:14, padding:"13px 40px 13px 42px", fontSize:14, color:hostelBlock?"#fff":"#4a6a8a", outline:"none", boxSizing:"border-box", fontFamily:"inherit", appearance:"none", cursor:"pointer" }}>
              <option value="" style={{ background:"#0d1b2a" }}>Select your hostel block</option>
              {HOSTEL_BLOCKS.map((b) => (
                <option key={b} value={b} style={{ background:"#0d1b2a" }}>{b}</option>
              ))}
            </select>
            <ChevronDown size={15} color="#4a6a8a" style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}/>
          </div>
          {errors.hostelBlock && <p style={{ fontSize:11, color:"#f87171", margin:"5px 0 0" }}>⚠ {errors.hostelBlock}</p>}
        </div>

        {/* ── SAFETY TIP ── */}
        <div style={{ background:"rgba(247,201,72,0.05)", border:"1px solid rgba(247,201,72,0.12)", borderRadius:14, padding:"12px 14px", marginBottom:24, display:"flex", gap:10 }}>
          <span style={{ fontSize:16 }}>⚠️</span>
          <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)", margin:0, lineHeight:1.6 }}>
            Always meet in public campus locations like the Library or Student Union for trades. Never share personal banking details.
          </p>
        </div>

        {/* ── SUBMIT ── */}
        <button onClick={handleSubmit} disabled={loading}
          style={{ width:"100%", padding:"16px", borderRadius:16, background:loading?"rgba(247,201,72,0.5)":"linear-gradient(135deg,#f7c948,#f0a500)", border:"none", fontSize:16, fontWeight:800, color:"#070f1a", cursor:loading?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow:loading?"none":"0 8px 24px rgba(247,201,72,0.3)", fontFamily:"inherit" }}>
          {loading ? (
            <>
              <div style={{ width:18, height:18, borderRadius:"50%", border:"2.5px solid rgba(7,15,26,0.3)", borderTop:"2.5px solid #070f1a", animation:"spin 1s linear infinite" }}/>
              Publishing...
            </>
          ) : "🚀 Publish Listing"}
        </button>
      </div>

      <style>{`
        @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        textarea::placeholder, input::placeholder { color: rgba(255,255,255,0.25) !important; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance:none; }
        select option { background: #0d1b2a; color: #fff; }
      `}</style>
    </div>
  );
}