const express = require("express");
const { followVacation, unfollowVacation, getUserFollows } = require("../controllers/followerController");
const { verifyUser } = require("../middleware/auth");

const router = express.Router();
router.post("/:vacationId", verifyUser, followVacation);
router.delete("/:vacationId", verifyUser, unfollowVacation);
router.get("/:userId", verifyUser, getUserFollows);

module.exports = router;
