import type { Request, Response } from "express";
const db = require("../config/db");

async function getVacations(req: Request, res: Response) {
  const [rows] = await db.query("SELECT * FROM vacations");
  res.json(rows);
}

async function addVacation(req: Request, res: Response) {
  const { v_destinition, v_description, v_from_date, v_to_date, v_price, v_picture_url } = req.body;
  await db.query(
    "INSERT INTO vacations (v_destinition, v_description, v_from_date, v_to_date, v_price, v_picture_url) VALUES (?, ?, ?, ?, ?, ?)",
    [v_destinition, v_description, v_from_date, v_to_date, v_price, v_picture_url]
  );
  res.json({ message: "Vacation added" });
}

async function updateVacation(req: Request, res: Response) {
  const { id } = req.params;
  const { v_destinition, v_description, v_from_date, v_to_date, v_price, v_picture_url } = req.body;
  await db.query(
    "UPDATE vacations SET v_destinition=?, v_description=?, v_from_date=?, v_to_date=?, v_price=?, v_picture_url=? WHERE id=?",
    [v_destinition, v_description, v_from_date, v_to_date, v_price, v_picture_url, id]
  );
  res.json({ message: "Vacation updated" });
}

async function deleteVacation(req: Request, res: Response) {
  const { id } = req.params;
  await db.query("DELETE FROM vacations WHERE id=?", [id]);
  res.json({ message: "Vacation deleted" });
}

module.exports = { getVacations, addVacation, updateVacation, deleteVacation };
