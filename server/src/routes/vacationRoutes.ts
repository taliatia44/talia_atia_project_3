const express = require("express");
const { getVacations, addVacation, updateVacation, deleteVacation } = require("../controllers/vacationController");
const { verifyAdmin, verifyToken } = require("../middleware/auth");

const router = express.Router();
router.get("/", verifyToken, getVacations);
router.post("/", verifyAdmin, addVacation);
router.put("/:id", verifyAdmin, updateVacation);
router.delete("/:id", verifyAdmin, deleteVacation);

module.exports = router;
