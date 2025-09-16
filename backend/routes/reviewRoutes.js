const express = require("express");
const Review = require("../models/Review");
const User = require("../models/User");
const RoadTrip = require("../models/RoadTrip");
const auth = require("../middleware/auth"); // Import auth middleware

const router = express.Router();

// Create a new Review (protected route)
router.post("/", auth, async (req, res) => {
  try {
    const { rating, comment, roadTrip } = req.body;

    // Use req.user from the token as createdBy
    const newReview = new Review({
      rating,
      comment,
      createdBy: req.user.id,
      roadTrip
    });

    await newReview.save();

    // Push review into User + RoadTrip
    await User.findByIdAndUpdate(req.user.id, { $push: { reviews: newReview._id } });
    await RoadTrip.findByIdAndUpdate(roadTrip, { $push: { reviews: newReview._id } });

    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
