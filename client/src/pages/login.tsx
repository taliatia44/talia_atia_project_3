import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../pages/Auth.css"
import AuthLayout from "../components/AuthLayout"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, user_password: password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Login failed")
        return
      }

      localStorage.setItem("token", data.token || "dummy")
      navigate("/data")
    } catch (err) {
      console.error(err)
      setError("Login failed")
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-form-container">
        <h1>Login</h1>
        <p>Enter your credentials</p>

        <form onSubmit={handleLogin}>
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

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}
