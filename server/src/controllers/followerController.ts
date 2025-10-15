import type { Request, Response } from "express";
const db = require("../config/db");

async function followVacation(req: Request, res: Response) {
  const { vacationId } = req.params;
  const userId = (req as any).user.id;
  await db.query("INSERT INTO followers (user_id, vacation_id) VALUES (?, ?)", [userId, vacationId]);
  res.json({ message: "Vacation followed" });
}

async function unfollowVacation(req: Request, res: Response) {
  const { vacationId } = req.params;
  const userId = (req as any).user.id;
  await db.query("DELETE FROM followers WHERE user_id=? AND vacation_id=?", [userId, vacationId]);
  res.json({ message: "Vacation unfollowed" });
}

async function getUserFollows(req: Request, res: Response) {
  const { userId } = req.params;
  const [rows] = await db.query(
    "SELECT v.* FROM vacations v JOIN followers f ON v.id=f.vacation_id WHERE f.user_id=?",
    [userId]
  );
  res.json(rows);
}

module.exports = { followVacation, unfollowVacation, getUserFollows };
