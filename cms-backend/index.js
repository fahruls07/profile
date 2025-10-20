import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes sample (bisa lu extend)
app.get("/", (req, res) => {
  res.json({ message: "CMS Backend is running 🚀" });
});

// DB connect
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/cms";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => console.log(`Backend running at :${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error ❌:", err));
