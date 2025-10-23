import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-3 bg-indigo-700 text-white flex justify-between items-center">
      <div className="font-bold text-lg">Vacation App</div>
      <div className="flex gap-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Register</Link>
      </div>
    </nav>
  );
}
