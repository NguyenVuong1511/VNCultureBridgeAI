import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import NorthernVietnam from "./pages/NorthernVietnam";
import CentralVietnam from "./pages/CentralVietnam";
import SouthernVietnam from "./pages/SouthernVietnam";
import NorthernVietnamDetail from "./pages/NorthernVietnamDetail";
import CentralVietnamDetail from "./pages/CentralVietnamDetail";
import SouthernVietnamDetail from "./pages/SouthernVietnamDetail";
import Search from "./pages/Search";
import ChatBot from "./components/containerHome/ChatBot";
// Import initRegions to make it available globally
import "./utils/initRegions";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/places-to-go/northern-vietnam" element={<NorthernVietnam />} />
        <Route path="/places-to-go/central-vietnam" element={<CentralVietnam />} />
        <Route path="/places-to-go/southern-vietnam" element={<SouthernVietnam />} />
        <Route path="/places-to-go/northern-vietnam/:category/:id" element={<NorthernVietnamDetail />} />
        <Route path="/places-to-go/central-vietnam/:category/:id" element={<CentralVietnamDetail />} />
        <Route path="/places-to-go/southern-vietnam/:category/:id" element={<SouthernVietnamDetail />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <ChatBot />
    </BrowserRouter>
  );
}
