const express = require("express");
const authRoutes = require("./routes/authRoutes");
const vacationRoutes = require("./routes/vacationRoutes");
const followerRoutes = require("./routes/followerRoutes");

import type { Request, Response } from "express";

const app = express();
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.send("Server is running 🚀");
});

app.use("/auth", authRoutes);
app.use("/vacations", vacationRoutes);
app.use("/followers", followerRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

