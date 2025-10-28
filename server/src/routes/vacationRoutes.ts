import express from "express"
import {
  getVacations,
  addVacation,
  updateVacation,
  deleteVacation,
} from "../controllers/vacationController"
import { verifyAdmin, verifyUser } from "../middleware/auth"

const router = express.Router()

router.get("/", getVacations)

router.post("/", verifyAdmin, addVacation)
router.put("/:id", verifyAdmin, updateVacation)
router.delete("/:id", verifyAdmin, deleteVacation)

export default router
