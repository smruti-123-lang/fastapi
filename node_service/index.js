import express from "express";
import mongoose from "mongoose";
import fetch from "node-fetch";
import cors from "cors";
import Prediction from "./models/Prediction.js";

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Node service is running!" });
});

// Predict route
app.post("/api/predict", async (req, res) => {
  try {
    // Forward to Python ML service
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    // Save in MongoDB
    const prediction = new Prediction({
      ...req.body,
      predictedYield: data.predicted_yield
    });

    await prediction.save();
    res.json(prediction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// History route
app.get("/api/history", async (req, res) => {
  const history = await Prediction.find().sort({ createdAt: -1 });
  res.json(history);
});

// Start server
mongoose.connect("mongodb://127.0.0.1:27017/cropdb")
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(8000, () => console.log("🚀 Node server running on port 8000"));
  })
  .catch(err => console.error(err));
