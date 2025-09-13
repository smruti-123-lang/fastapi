import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
  location: String,
  crop: String,
  rainfall: Number,
  temperature: Number,
  humidity: Number,
  predictedYield: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Prediction", predictionSchema);
