import { Request, Response } from "express";
import db from "../config/db"; // Pool
import dotenv from "dotenv";

dotenv.config();

interface AuthRequest extends Request {
  user?: {
    id: number;
    [key: string]: any;
  };
}

export async function toggleStar(req: AuthRequest, res: Response): Promise<Response> {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;
    const vacationId = req.params.id;

    // משתמשים ישירות ב-Pool, אין צורך ב-getConnection
    const [rows]: any = await db.query(
      "SELECT * FROM followers WHERE user_id = ? AND vacation_id = ?",
      [userId, vacationId]
    );

    if (rows.length > 0) {
      await db.query(
        "DELETE FROM followers WHERE user_id = ? AND vacation_id = ?",
        [userId, vacationId]
      );
      return res.json({ starred: false });
    }

    await db.query(
      "INSERT INTO followers (user_id, vacation_id) VALUES (?, ?)",
      [userId, vacationId]
    );

    return res.json({ starred: true });
  } catch (error: any) {
    console.error("Error toggling star:", error);
    return res.status(500).json({ error: error.message });
  }
}
