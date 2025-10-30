import express from "express";
import cors from "cors";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Βασική διαδρομή για έλεγχο
app.get("/", (req, res) => {
  res.send("🏫 Student Housing Web App API is running...");
});

// Ρουτς για φοιτητές
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
