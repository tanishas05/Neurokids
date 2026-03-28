// components/Navbar.tsx
import { Link } from "react-router";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <Link to="/parent-dashboard" className="hover:text-green-600 font-bold">Dashboard</Link>
        <Link to="/social-coach" className="hover:text-green-600 font-bold">Social Coach</Link>
        <Link to="/dyslexia-games" className="hover:text-green-600 font-bold">Dyslexia Games</Link>
        <Link to="/learning" className="hover:text-green-600 font-bold">Learning Engine</Link>
        <Link to="/explore" className="hover:text-green-600 font-bold">Explore</Link>
      </div>
      <LogoutButton />
    </nav>
  );
}