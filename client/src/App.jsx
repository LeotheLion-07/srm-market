import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PostListing from "./pages/PostListing";
import AccountPage from "./pages/AccountPage";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");

  const handleLogin = (userData) => { setUser(userData); setPage("home"); };
  const handleLogout = () => { setUser(null); setPage("home"); };

  if (!user) return <LoginPage onLogin={handleLogin}/>;

  switch (page) {
    case "home":    return <HomePage user={user} setPage={setPage} onLogout={handleLogout}/>;
    case "post":    return <PostListing setPage={setPage} user={user}/>;
    case "account": return <AccountPage user={user} setPage={setPage} onLogout={handleLogout}/>;
    default:        return <HomePage user={user} setPage={setPage} onLogout={handleLogout}/>;
  }
}