import type { Request, Response } from "express";
const db = require("../config/db");
const jwt = require("jsonwebtoken");

async function register(req: Request, res: Response) {
  try {
    const { f_name, l_name, email, password } = req.body;
    if (!f_name || !l_name || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const [existingUsers]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUsers.length > 0) return res.status(400).json({ error: "User already exists" });

    await db.query(
      "INSERT INTO users (f_name, l_name, email, user_password, user_role) VALUES (?, ?, ?, ?, ?)",
      [f_name, l_name, email, password, "user"]
    );

    res.json({ message: "User registered successfully" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(401).json({ error: "User not found" });

    const user = rows[0];
    if (password !== user.user_password) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, f_name: user.f_name, role: user.user_role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, f_name: user.f_name, role: user.user_role },
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { register, login };
