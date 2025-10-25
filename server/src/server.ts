import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;
// ===== CORS =====
// מאפשר ל־frontend ב־http://localhost:5173 לבצע בקשות
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));

// ===== JSON parsing =====
app.use(express.json());

// ===== Routes =====
app.use("/api", authRoutes);

// ===== Start server =====
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
