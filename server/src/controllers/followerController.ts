import type { Request, Response } from "express";
const db = require("../config/db");

interface AuthRequest extends Request {
  user?: any;
}

async function toggleStar(req: AuthRequest, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const userId = req.user.id;
    const vacationId = req.params.id;

    const [rows]: any = await db.query(
      "SELECT * FROM followers WHERE user_id=? AND vacation_id=?",
      [userId, vacationId]
    );

    if (rows.length > 0) {
      await db.query("DELETE FROM followers WHERE user_id=? AND vacation_id=?", [userId, vacationId]);
      return res.json({ starred: false });
    }

    await db.query("INSERT INTO followers (user_id, vacation_id) VALUES (?, ?)", [userId, vacationId]);
    res.json({ starred: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { toggleStar };
