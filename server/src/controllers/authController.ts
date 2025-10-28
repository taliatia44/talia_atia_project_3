import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import db from "../config/db"
import dotenv from "dotenv"

dotenv.config()

export const register = async (req: Request, res: Response) => {
  try {
    const { f_name, l_name, email, user_password } = req.body

    if (!email || !user_password || !f_name || !l_name ) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const [existingUsers] = await db.execute("SELECT * FROM users WHERE email = ?", [email])
    const usersArray = existingUsers as any[]
    if (usersArray.length > 0) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(user_password, 10)

    await db.execute(
      "INSERT INTO users (f_name, l_name, email, user_password, user_role) VALUES (?, ?, ?, ?, ?)",
      [f_name, l_name, email, hashedPassword, "user"]
    )

    res.status(201).json({ message: "Registration successful" })
  } catch (err) {
    console.error("Registration error:", err)
    res.status(500).json({ message: "Registration failed" })
  }
}


export const login = async (req: Request, res: Response) => {
  try {
    const { email, user_password } = req.body

    if (!email || !user_password) {
      return res.status(400).json({ message: "Email and password required" })
    }

    const [userRows] = await db.execute("SELECT * FROM users WHERE email = ?", [email])
    const users = userRows as any[]

    if (users.length === 0) {
      return res.status(401).json({ message: "Login failed" })
    }

    const user = users[0]

    const isMatch = await bcrypt.compare(user_password, user.user_password)
    if (!isMatch) {
      return res.status(401).json({ message: "Login failed" })
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        f_name: user.f_name,
        l_name: user.l_name,
        email: user.email,
        user_role: user.user_role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" })
  }
};
