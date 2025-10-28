import { Request, Response } from "express"
import db from "../config/db"
import dotenv from "dotenv"

dotenv.config()

export const getVacations = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.execute("SELECT * FROM vacations")
    return res.json({ data: rows })
  } catch (error) {
    console.error("Error fetching vacations:", error)
    return res.status(500).json({ message: "Failed to fetch vacations" })
  }
}

export const addVacation = async (req: Request, res: Response) => {
  try {
    const { v_destinition, v_description, v_from_date, v_to_date, v_price, v_picture_url } = req.body

    if (!v_destinition || !v_description || !v_from_date || !v_to_date || !v_price) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    await db.execute(
      `INSERT INTO vacations (v_destinition, v_description, v_from_date, v_to_date, v_price, v_picture_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [v_destinition, v_description, v_from_date, v_to_date, v_price, v_picture_url]
    )

    return res.status(201).json({ message: "Vacation added successfully" })
  } catch (error) {
    console.error("Error adding vacation:", error)
    return res.status(500).json({ message: "Failed to add vacation" })
  }
}

export const updateVacation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { v_destinition, v_description, v_from_date, v_to_date, v_price, v_picture_url } = req.body

    await db.execute(
      `UPDATE vacations
       SET v_destinition=?, v_description=?, v_from_date=?, v_to_date=?, v_price=?, v_picture_url=?
       WHERE id=?`,
      [v_destinition, v_description, v_from_date, v_to_date, v_price, v_picture_url, id]
    );

    return res.json({ message: "Vacation updated successfully" })
  } catch (error) {
    console.error("Error updating vacation:", error);
    return res.status(500).json({ message: "Failed to update vacation" })
  }
};

export const deleteVacation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM vacations WHERE id=?", [id])
    return res.json({ message: "Vacation deleted successfully" })
  } catch (error) {
    console.error("Error deleting vacation:", error)
    return res.status(500).json({ message: "Failed to delete vacation" })
  }
}
