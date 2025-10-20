const express = require("express");
const { toggleStar } = require("../controllers/followerController");
const { verifyUser } = require("../middleware/auth");

const router = express.Router();

router.post("/:id/toggle", verifyUser, toggleStar);

module.exports = router;
