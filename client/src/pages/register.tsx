import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Auth.css"; // 👈 אותו קובץ
import AuthLayout from "../components/AuthLayout";

export default function Register() {
  const [f_name, setFName] = useState("");
  const [l_name, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          f_name,
          l_name,
          email,
          user_password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form-container">
        <h1>Register</h1>
        <p>Create a new account</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="First Name"
            value={f_name}
            onChange={(e) => setFName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Last Name"
            value={l_name}
            onChange={(e) => setLName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
