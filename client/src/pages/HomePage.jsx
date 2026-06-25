import { useState } from "react";
import {
  Home, Search, Grid, MessageCircle, User,
  Bookmark, Plus, Bell, SlidersHorizontal,
  ChevronRight, ShieldCheck, MapPin, BookOpen,
  TrendingUp, Clock, X,
} from "lucide-react";

const HOSTEL_BLOCKS = [
  "All Locations",
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

const SEMESTERS = ["Sem 1","Sem 2","Sem 3","Sem 4","Sem 5","Sem 6","Sem 7","Sem 8"];
const CATEGORIES = ["All","Books","Electronics","Hostel","Bikes","Clothes"];
const AVATAR_COLORS = ["#5c6bc0","#f7c948","#26a69a","#ef5350","#42a5f5","#ab47bc"];

const LISTINGS = [
  { id:1, title:"Calculus: Early Transcendentals (Sem 3)", price:3600, category:"Books", semester:"Sem 3", hostelBlock:"Paari Block", seller:{name:"Alex",initial:"A",verified:true}, condition:"Good", time:"2h ago", img:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80" },
  { id:2, title:"Mountain Bike – 21 Speed", price:9600, category:"Bikes", semester:null, hostelBlock:"Adhiyaman Block", seller:{name:"Jordan",initial:"J",verified:false}, condition:"Like New", time:"5h ago", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { id:3, title:"Wireless Headphones", price:6800, category:"Electronics", semester:null, hostelBlock:"Thamarai Block", seller:{name:"Sarah",initial:"S",verified:true}, condition:"Good", time:"1d ago", img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
  { id:4, title:"Mini Fridge – Perfect Condition", price:4800, category:"Hostel", semester:null, hostelBlock:"Nelson Mandela Block", seller:{name:"Mike",initial:"M",verified:false}, condition:"Like New", time:"2d ago", img:"https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80" },
  { id:5, title:"Engineering Physics – Sem 2 Notes", price:850, category:"Books", semester:"Sem 2", hostelBlock:"Malligai Block", seller:{name:"Priya",initial:"P",verified:true}, condition:"Good", time:"30m ago", img:"https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80" },
  { id:6, title:"Sony WH-1000XM4", price:12000, category:"Electronics", semester:null, hostelBlock:"Kalpana Chawla Block", seller:{name:"Sam",initial:"S",verified:true}, condition:"New", time:"1h ago", img:"https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80" },
  { id:7, title:"Data Structures & Algorithms – Sem 4", price:1200, category:"Books", semester:"Sem 4", hostelBlock:"Agasthiyar Block", seller:{name:"Rahul",initial:"R",verified:false}, condition:"Fair", time:"3h ago", img:"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&q=80" },
  { id:8, title:"Road Bike – Like New", price:36000, category:"Bikes", semester:null, hostelBlock:"Green Pearl", seller:{name:"Chris",initial:"C",verified:false}, condition:"Like New", time:"3h ago", img:"https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80" },
];

const FEATURED = [
  { id:1, title:"Sony WH-1000XM4", price:12000, tag:"PREMIUM", hostelBlock:"Kalpana Chawla Block", seller:{name:"Sam",initial:"S",verified:true}, img:"https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80" },
  { id:2, title:"Road Bike – Like New", price:36000, tag:"HOT DEAL", hostelBlock:"Green Pearl", seller:{name:"Chris",initial:"C",verified:false}, img:"https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80" },
  { id:3, title:"iPhone 13 – 128GB", price:45000, tag:"VERIFIED", hostelBlock:"Sister Nivedita Block", seller:{name:"Priya",initial:"P",verified:true}, img:"https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&q=80" },
];

function VerifiedBadge() {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:3, padding:"2px 6px", borderRadius:6, background:"rgba(59,130,246,0.15)", border:"1px solid rgba(59,130,246,0.3)", fontSize:8, fontWeight:700, color:"#60a5fa", letterSpacing:"0.03em", whiteSpace:"nowrap" }}>
      <ShieldCheck size={8} strokeWidth={2.5}/>SRM Verified
    </span>
  );
}

function SemTag({ semester }) {
  if (!semester) return null;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:3, padding:"2px 6px", borderRadius:6, background:"rgba(168,85,247,0.15)", border:"1px solid rgba(168,85,247,0.3)", fontSize:8, fontWeight:700, color:"#c084fc", letterSpacing:"0.03em", whiteSpace:"nowrap" }}>
      <BookOpen size={8} strokeWidth={2.5}/>{semester}
    </span>
  );
}

function HostelPill({ block }) {
  if (!block) return null;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:3, fontSize:9, color:"#4a6a8a" }}>
      <MapPin size={9} strokeWidth={2}/>{block}
    </span>
  );
}

function conditionColor(c) {
  return c==="New" ? "#22c55e" : c==="Like New" ? "#f7c948" : c==="Good" ? "#60a5fa" : "#9ca3af";
}

export default function HomePage({ user, setPage, onLogout }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState([]);
  const [hostelFilter, setHostelFilter] = useState("All Locations");
  const [semFilter, setSemFilter] = useState("All");
  const [showHostelSheet, setShowHostelSheet] = useState(false);
  const [showSemSheet, setShowSemSheet] = useState(false);
  const [activePage, setActivePage] = useState("home");

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning 👋" : hour < 17 ? "Good afternoon ☀️" : "Good evening 🌙";

  const filtered = LISTINGS.filter((l) => {
    if (activeCategory !== "All" && l.category !== activeCategory) return false;
    if (search && !l.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (hostelFilter !== "All Locations" && l.hostelBlock !== hostelFilter) return false;
    if (activeCategory === "Books" && semFilter !== "All" && l.semester !== semFilter) return false;
    return true;
  });

  const toggleSave = (e, id) => {
    e.stopPropagation();
    setSaved((p) => (p.includes(id) ? p.filter((i) => i !== id) : [...p, id]));
  };

  const isFiltered = hostelFilter !== "All Locations" || (activeCategory === "Books" && semFilter !== "All");

  // ✅ KEY FIX — updates both local active tab AND navigates to page
  const handleNav = (id) => {
    setActivePage(id);
    setPage(id);
  };

  return (
    <div style={{ background:"#070f1a", minHeight:"100vh", paddingBottom:88, fontFamily:"'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", WebkitFontSmoothing:"antialiased" }}>

      {/* ══ HEADER ══ */}
      <div style={{ position:"sticky", top:0, zIndex:20, background:"rgba(7,15,26,0.97)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"14px 16px 12px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ position:"relative", flexShrink:0 }}>
              <div style={{ width:40, height:40, borderRadius:13, background:"linear-gradient(135deg,#667eea,#764ba2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, fontWeight:900, color:"#fff", border:"2px solid rgba(247,201,72,0.3)" }}>
                {user?.name?.[0]?.toUpperCase() ?? "U"}
              </div>
              <div style={{ position:"absolute", bottom:-2, right:-2, width:11, height:11, borderRadius:"50%", background:"#22c55e", border:"2.5px solid #070f1a", boxShadow:"0 0 8px rgba(34,197,94,0.6)" }}/>
            </div>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                <p style={{ fontSize:14, fontWeight:800, color:"#fff", margin:0 }}>{user?.name ?? "Student"}</p>
                {user?.verified && <VerifiedBadge/>}
                <span style={{ fontSize:9, fontWeight:700, color:"#22c55e", background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.25)", padding:"1px 6px", borderRadius:20 }}>● ACTIVE</span>
              </div>
              <p style={{ fontSize:11, color:"#3a5a7a", margin:0 }}>{greeting}</p>
            </div>
          </div>
          <button style={{ width:38, height:38, borderRadius:13, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", position:"relative" }}>
            <Bell size={16} color="#8899aa"/>
            <span style={{ position:"absolute", top:8, right:8, width:7, height:7, borderRadius:"50%", background:"#f7c948", border:"1.5px solid #070f1a" }}/>
          </button>
        </div>

        <h1 style={{ fontSize:24, fontWeight:900, color:"#fff", margin:"0 0 12px", letterSpacing:"-0.5px", lineHeight:1 }}>
          Campus<span style={{ color:"#f7c948" }}>Market</span>
        </h1>

        <div style={{ display:"flex", alignItems:"center", gap:10, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:"10px 12px", marginBottom:12 }}>
          <Search size={14} color="#3a5a7a" strokeWidth={2.5}/>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Find books, bikes, dorm essentials..."
            style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:13, color:"#fff", caretColor:"#f7c948", fontFamily:"inherit" }}/>
          {search && (
            <button onClick={() => setSearch("")} style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex" }}>
              <X size={13} color="#4a6a8a"/>
            </button>
          )}
          <div style={{ width:28, height:28, borderRadius:9, background:"rgba(247,201,72,0.1)", border:"1px solid rgba(247,201,72,0.15)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 }}>
            <SlidersHorizontal size={12} color="#f7c948" strokeWidth={2.5}/>
          </div>
        </div>

        <div style={{ display:"flex", gap:7, overflowX:"auto", scrollbarWidth:"none", WebkitOverflowScrolling:"touch" }}>
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button key={cat} onClick={() => { setActiveCategory(cat); setSemFilter("All"); }}
                style={{ padding:"5px 13px", borderRadius:20, fontSize:11, fontWeight:700, whiteSpace:"nowrap", cursor:"pointer", background:active?"#f7c948":"rgba(255,255,255,0.04)", color:active?"#070f1a":"#4a6a8a", border:active?"1.5px solid #f7c948":"1px solid rgba(255,255,255,0.08)", outline:"none", transition:"all 0.15s" }}>
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ══ SMART FILTER BAR ══ */}
      <div style={{ display:"flex", gap:8, padding:"12px 16px 0", overflowX:"auto", scrollbarWidth:"none" }}>
        <button onClick={() => setShowHostelSheet(true)}
          style={{ display:"flex", alignItems:"center", gap:5, padding:"6px 11px", borderRadius:11, background:hostelFilter!=="All Locations"?"rgba(247,201,72,0.1)":"rgba(255,255,255,0.03)", border:hostelFilter!=="All Locations"?"1px solid rgba(247,201,72,0.3)":"1px solid rgba(255,255,255,0.07)", cursor:"pointer", whiteSpace:"nowrap" }}>
          <MapPin size={11} color={hostelFilter!=="All Locations"?"#f7c948":"#4a6a8a"}/>
          <span style={{ fontSize:11, fontWeight:600, color:hostelFilter!=="All Locations"?"#f7c948":"#4a6a8a" }}>
            {hostelFilter==="All Locations" ? "Near me" : hostelFilter}
          </span>
        </button>

        {activeCategory === "Books" && (
          <button onClick={() => setShowSemSheet(true)}
            style={{ display:"flex", alignItems:"center", gap:5, padding:"6px 11px", borderRadius:11, background:semFilter!=="All"?"rgba(168,85,247,0.1)":"rgba(255,255,255,0.03)", border:semFilter!=="All"?"1px solid rgba(168,85,247,0.3)":"1px solid rgba(255,255,255,0.07)", cursor:"pointer", whiteSpace:"nowrap" }}>
            <BookOpen size={11} color={semFilter!=="All"?"#c084fc":"#4a6a8a"}/>
            <span style={{ fontSize:11, fontWeight:600, color:semFilter!=="All"?"#c084fc":"#4a6a8a" }}>
              {semFilter==="All" ? "Semester" : semFilter}
            </span>
          </button>
        )}

        {isFiltered && (
          <button onClick={() => { setHostelFilter("All Locations"); setSemFilter("All"); }}
            style={{ display:"flex", alignItems:"center", gap:4, padding:"6px 10px", borderRadius:11, background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", cursor:"pointer" }}>
            <X size={10} color="#f87171"/>
            <span style={{ fontSize:11, fontWeight:600, color:"#f87171" }}>Clear</span>
          </button>
        )}
      </div>

      {/* ══ STATS BAR ══ */}
      <div style={{ display:"flex", gap:8, padding:"10px 16px 0" }}>
        {[
          { icon:<TrendingUp size={11} color="#f7c948"/>, label:`${LISTINGS.length} listings` },
          { icon:<Clock size={11} color="#22c55e"/>, label:"12 new today" },
          { icon:<ShieldCheck size={11} color="#60a5fa"/>, label:"SRM Only" },
        ].map(({ icon, label }) => (
          <div key={label} style={{ display:"flex", alignItems:"center", gap:5, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:9, padding:"5px 9px", flex:1 }}>
            {icon}
            <span style={{ fontSize:10, color:"#4a6a8a", fontWeight:600, whiteSpace:"nowrap" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* ══ FEATURED DEALS ══ */}
      <div style={{ padding:"18px 16px 0" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:10 }}>
          <div>
            <p style={{ fontSize:10, fontWeight:700, color:"#f7c948", letterSpacing:"0.1em", margin:"0 0 2px" }}>CURATED FOR YOU</p>
            <h2 style={{ fontSize:17, fontWeight:800, color:"#fff", margin:0 }}>Featured Deals</h2>
          </div>
          <button style={{ display:"flex", alignItems:"center", gap:3, color:"#f7c948", fontSize:12, fontWeight:700, cursor:"pointer", background:"none", border:"none", outline:"none" }}>
            View All <ChevronRight size={13} strokeWidth={2.5}/>
          </button>
        </div>

        <div style={{ display:"flex", gap:12, overflowX:"auto", paddingBottom:4, scrollbarWidth:"none" }}>
          {FEATURED.map((item) => (
            <div key={item.id} style={{ flexShrink:0, width:170, borderRadius:18, overflow:"hidden", background:"#0d1b2a", border:"1px solid rgba(255,255,255,0.07)", cursor:"pointer" }}>
              <div style={{ position:"relative", width:"100%", height:110, overflow:"hidden" }}>
                <img src={item.img} alt={item.title} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", display:"block" }}/>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(7,15,26,0.8) 0%, transparent 55%)", pointerEvents:"none" }}/>
                <div style={{ position:"absolute", top:8, left:8, padding:"3px 7px", borderRadius:7, background:"rgba(0,0,0,0.6)", fontSize:8, fontWeight:800, color:"#f7c948", letterSpacing:"0.06em" }}>
                  {item.tag}
                </div>
                {item.seller.verified && (
                  <div style={{ position:"absolute", top:8, right:8 }}>
                    <ShieldCheck size={14} color="#60a5fa" strokeWidth={2.5}/>
                  </div>
                )}
              </div>
              <div style={{ padding:"10px 11px 12px" }}>
                <p style={{ fontSize:12, fontWeight:700, color:"#fff", lineHeight:1.35, margin:"0 0 3px" }}>{item.title}</p>
                <HostelPill block={item.hostelBlock}/>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:7 }}>
                  <p style={{ fontSize:16, fontWeight:900, color:"#f7c948", margin:0 }}>₹{item.price.toLocaleString("en-IN")}</p>
                  <div style={{ width:28, height:28, borderRadius:9, background:"#f7c948", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                    <Plus size={14} color="#070f1a" strokeWidth={3}/>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ RECENT LISTINGS ══ */}
      <div style={{ padding:"20px 16px 0" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <h2 style={{ fontSize:17, fontWeight:800, color:"#fff", margin:0 }}>
            Recent Listings
            {isFiltered && <span style={{ fontSize:11, fontWeight:500, color:"#4a6a8a", marginLeft:6 }}>· filtered</span>}
          </h2>
          <span style={{ fontSize:11, color:"#4a6a8a" }}>{filtered.length} items</span>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"48px 0" }}>
            <Search size={32} color="#1e3a5a" style={{ margin:"0 auto 12px", display:"block" }}/>
            <p style={{ color:"#3a5a7a", fontSize:14, fontWeight:600, margin:"0 0 4px" }}>No listings found</p>
            <p style={{ color:"#1e3a5a", fontSize:12, margin:0 }}>Try adjusting your filters</p>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2, minmax(0,1fr))", gap:10 }}>
            {filtered.map((item, i) => (
              <div key={item.id} style={{ borderRadius:18, overflow:"hidden", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", cursor:"pointer", display:"flex", flexDirection:"column" }}>
                <div style={{ position:"relative", width:"100%", aspectRatio:"16/9", overflow:"hidden" }}>
                  <img src={item.img} alt={item.title} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", display:"block" }}/>
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(7,15,26,0.75) 0%, transparent 50%)", pointerEvents:"none" }}/>
                  <button onClick={(e) => toggleSave(e, item.id)}
                    style={{ position:"absolute", top:7, right:7, width:27, height:27, borderRadius:8, background:"rgba(0,0,0,0.5)", border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                    <Bookmark size={12} fill={saved.includes(item.id)?"#f7c948":"none"} color={saved.includes(item.id)?"#f7c948":"#fff"} strokeWidth={2}/>
                  </button>
                  {item.seller.verified && (
                    <div style={{ position:"absolute", bottom:7, left:7 }}>
                      <ShieldCheck size={13} color="#60a5fa" strokeWidth={2.5}/>
                    </div>
                  )}
                  <div style={{ position:"absolute", bottom:7, right:7, fontSize:8, fontWeight:800, color:conditionColor(item.condition), background:"rgba(0,0,0,0.55)", padding:"2px 5px", borderRadius:5, letterSpacing:"0.04em" }}>
                    {item.condition.toUpperCase()}
                  </div>
                </div>
                <div style={{ padding:"9px 10px 11px", flex:1, display:"flex", flexDirection:"column", gap:4 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:3, flexWrap:"wrap" }}>
                    <span style={{ fontSize:8, fontWeight:800, letterSpacing:"0.06em", color:"#f7c948", background:"rgba(247,201,72,0.1)", border:"1px solid rgba(247,201,72,0.15)", padding:"2px 5px", borderRadius:5 }}>
                      {item.category.toUpperCase()}
                    </span>
                    <SemTag semester={item.semester}/>
                  </div>
                  <p style={{ fontSize:12, fontWeight:700, color:"#e8edf2", margin:0, lineHeight:1.35, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize:15, fontWeight:900, color:"#f7c948", margin:0 }}>
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                  <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                    <div style={{ width:18, height:18, borderRadius:"50%", background:AVATAR_COLORS[i%AVATAR_COLORS.length], display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:800, color:"#fff", flexShrink:0 }}>
                      {item.seller.initial}
                    </div>
                    <span style={{ fontSize:10, color:"#3a5a7a", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                      {item.seller.name} · {item.time}
                    </span>
                  </div>
                  <HostelPill block={item.hostelBlock}/>
                  {item.seller.verified && <VerifiedBadge/>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ══ FAB ══ */}
      <button onClick={() => setPage("post")}
        style={{ position:"fixed", bottom:90, right:16, width:50, height:50, borderRadius:15, background:"#f7c948", boxShadow:"0 8px 28px rgba(247,201,72,0.4)", border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", zIndex:30 }}>
        <Plus size={22} color="#070f1a" strokeWidth={3}/>
      </button>

      {/* ══ BOTTOM NAV ══ */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0, background:"rgba(7,15,26,0.97)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", borderTop:"1px solid rgba(255,255,255,0.05)", padding:"10px 20px 18px", zIndex:20 }}>
        <div style={{ display:"flex", justifyContent:"space-around", alignItems:"center" }}>
          {[
            { icon:Home,          label:"Home",    id:"home" },
            { icon:Grid,          label:"Browse",  id:"browse" },
            { icon:MessageCircle, label:"Chats",   id:"chats" },
            { icon:User,          label:"Account", id:"account" },
          ].map(({ icon:Icon, label, id }) => {
            const active = activePage === id;
            return (
              <button key={id} onClick={() => handleNav(id)}
                style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, background:"none", border:"none", cursor:"pointer", padding:"4px 8px", outline:"none" }}>
                <div style={{ position:"relative" }}>
                  <Icon size={20} color={active?"#f7c948":"#1e3a5a"} strokeWidth={active?2.5:2}/>
                  {active && <div style={{ position:"absolute", bottom:-5, left:"50%", transform:"translateX(-50%)", width:4, height:4, borderRadius:"50%", background:"#f7c948" }}/>}
                </div>
                <span style={{ fontSize:10, fontWeight:active?700:500, color:active?"#f7c948":"#1e3a5a", marginTop:5 }}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ══ HOSTEL BOTTOM SHEET ══ */}
      {showHostelSheet && (
        <div style={{ position:"fixed", inset:0, zIndex:50, background:"rgba(0,0,0,0.75)", display:"flex", alignItems:"flex-end" }} onClick={() => setShowHostelSheet(false)}>
          <div style={{ width:"100%", background:"#0d1b2a", borderRadius:"22px 22px 0 0", border:"1px solid rgba(255,255,255,0.08)", padding:"20px 16px 40px", maxHeight:"80vh", overflowY:"auto" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <h3 style={{ fontSize:16, fontWeight:800, color:"#fff", margin:0 }}>Filter by Hostel Block</h3>
              <button onClick={() => setShowHostelSheet(false)} style={{ background:"none", border:"none", cursor:"pointer" }}>
                <X size={20} color="#4a6a8a"/>
              </button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
              {HOSTEL_BLOCKS.map((block) => {
                const active = hostelFilter === block;
                return (
                  <button key={block} onClick={() => { setHostelFilter(block); setShowHostelSheet(false); }}
                    style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"11px 14px", borderRadius:13, background:active?"rgba(247,201,72,0.1)":"rgba(255,255,255,0.03)", border:active?"1.5px solid rgba(247,201,72,0.4)":"1px solid rgba(255,255,255,0.06)", cursor:"pointer" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                      <MapPin size={14} color={active?"#f7c948":"#4a6a8a"}/>
                      <span style={{ fontSize:13, fontWeight:600, color:active?"#f7c948":"#e8edf2" }}>{block}</span>
                    </div>
                    {active && <div style={{ width:7, height:7, borderRadius:"50%", background:"#f7c948" }}/>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ══ SEMESTER BOTTOM SHEET ══ */}
      {showSemSheet && (
        <div style={{ position:"fixed", inset:0, zIndex:50, background:"rgba(0,0,0,0.75)", display:"flex", alignItems:"flex-end" }} onClick={() => setShowSemSheet(false)}>
          <div style={{ width:"100%", background:"#0d1b2a", borderRadius:"22px 22px 0 0", border:"1px solid rgba(255,255,255,0.08)", padding:"20px 16px 40px" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
              <h3 style={{ fontSize:16, fontWeight:800, color:"#fff", margin:0 }}>Filter Books by Semester</h3>
              <button onClick={() => setShowSemSheet(false)} style={{ background:"none", border:"none", cursor:"pointer" }}>
                <X size={20} color="#4a6a8a"/>
              </button>
            </div>
            <p style={{ fontSize:12, color:"#3a5a7a", margin:"0 0 14px" }}>Find textbooks for your current semester</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4, minmax(0,1fr))", gap:8, marginBottom:10 }}>
              {SEMESTERS.map((sem) => {
                const active = semFilter === sem;
                return (
                  <button key={sem} onClick={() => { setSemFilter(sem); setShowSemSheet(false); }}
                    style={{ padding:"10px 4px", borderRadius:11, textAlign:"center", background:active?"rgba(168,85,247,0.15)":"rgba(255,255,255,0.03)", border:active?"1.5px solid rgba(168,85,247,0.4)":"1px solid rgba(255,255,255,0.06)", cursor:"pointer", fontSize:13, fontWeight:700, color:active?"#c084fc":"#e8edf2" }}>
                    {sem}
                  </button>
                );
              })}
            </div>
            <button onClick={() => { setSemFilter("All"); setShowSemSheet(false); }}
              style={{ width:"100%", padding:"12px", borderRadius:13, background:semFilter==="All"?"rgba(247,201,72,0.1)":"rgba(255,255,255,0.03)", border:semFilter==="All"?"1.5px solid rgba(247,201,72,0.3)":"1px solid rgba(255,255,255,0.06)", cursor:"pointer", fontSize:13, fontWeight:700, color:semFilter==="All"?"#f7c948":"#4a6a8a" }}>
              Show All Semesters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}