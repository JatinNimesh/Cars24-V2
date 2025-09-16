const userRoutes = require("./routes/userRoutes");
const roadTripRoutes = require("./routes/roadTripRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/roadtrips", roadTripRoutes);
app.use("/api/reviews", reviewRoutes);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// MongoDB connection (update your Mongo URI in .env)
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
