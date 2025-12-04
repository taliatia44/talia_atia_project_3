import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000

app.use(express.json())

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));

app.options("*", cors())

app.use("/api", authRoutes)

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`)
})


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`)
})
