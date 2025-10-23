import { Link } from "react-router-dom";
import React from "react";


export default function Navbar() {
  return (
    <nav className="bg-indigo-700 text-white p-4 shadow-md flex justify-between items-center">
      <div className="font-bold text-xl">VacationApp</div>
      <div className="flex gap-6">
        <Link to="/" className="hover:text-yellow-300 transition-colors">Home</Link>
        <Link to="/data" className="hover:text-yellow-300 transition-colors">Vacations</Link>
        <Link to="/login" className="hover:text-yellow-300 transition-colors">Login</Link>
        <Link to="/register" className="hover:text-yellow-300 transition-colors">Register</Link>
      </div>
    </nav>
  );
}
