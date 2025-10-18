// routes/followerRoutes.ts
const express = require("express");
const { toggleStar } = require("../controllers/followerController");
const { verifyToken, verifyUser } = require("../middleware/auth");

const router = express.Router();

router.post("/:id/toggle", verifyToken, verifyUser, toggleStar);

module.exports = router;

