const express = require("express");
import type { Request, Response } from "express";

const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const followerRoutes = require("./routes/followerRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/followers", followerRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
