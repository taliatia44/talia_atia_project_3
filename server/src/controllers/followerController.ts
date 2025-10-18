// controllers/followerController.ts
const db = require("../config/db");
const jwt = require("jsonwebtoken");

import type { AuthRequest } from "../types"; 
import type { Response } from "express";



async function toggleStar(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
  return res.status(401).json({ message: "Unauthorized" });
}


    const userId = req.user.id;
    const vacationId = req.params.id;

    // בדיקה אם כבר מסומן
    const [rows] = await db.query(
      "SELECT * FROM followers WHERE user_id=? AND vacation_id=?",
      [userId, vacationId]
    );

    if (rows.length > 0) {
      // הסרה אם קיים
      await db.query(
        "DELETE FROM followers WHERE user_id=? AND vacation_id=?",
        [userId, vacationId]
      );
      return res.json({ starred: false });
    }

    // אחרת מוסיפים
    await db.query(
      "INSERT INTO followers (user_id, vacation_id) VALUES (?, ?)",
      [userId, vacationId]
    );
    res.json({ starred: true });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

module.exports = { toggleStar };

