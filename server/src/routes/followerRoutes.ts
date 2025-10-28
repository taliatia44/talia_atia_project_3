import express, { Router } from "express"
import { toggleStar } from "../controllers/followerController"
import { verifyUser } from "../middleware/auth"

const router: Router = express.Router()

router.post("/:id/toggle", verifyUser, toggleStar)

export default router
