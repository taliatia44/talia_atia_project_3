import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-3 bg-gray-800 text-white flex justify-between">
      <div className="font-bold text-lg">My App</div>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}
