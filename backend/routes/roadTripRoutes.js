const express = require("express");
const RoadTrip = require("../models/RoadTrip");
const User = require("../models/User");

const router = express.Router();

// Create a new RoadTrip
router.post("/", async (req, res) => {
  try {
    const { name, description, locations, createdBy } = req.body;

    // Create the roadtrip
    const newTrip = new RoadTrip({ name, description, locations, createdBy });
    await newTrip.save();

    // Push into user's roadTrips array
    await User.findByIdAndUpdate(createdBy, { $push: { roadTrips: newTrip._id } });

    res.status(201).json(newTrip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all RoadTrips
router.get("/", async (req, res) => {
  try {
    const trips = await RoadTrip.find()
      .populate("createdBy", "username email") // show creator info
      .populate("reviews"); // show reviews
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single RoadTrip by ID
router.get("/:id", async (req, res) => {
  try {
    const trip = await RoadTrip.findById(req.params.id)
      .populate("createdBy", "username email")
      .populate("reviews");

    if (!trip) return res.status(404).json({ error: "RoadTrip not found" });

    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update RoadTrip
router.put("/:id", async (req, res) => {
  try {
    const updatedTrip = await RoadTrip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTrip) return res.status(404).json({ error: "RoadTrip not found" });

    res.json(updatedTrip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete RoadTrip
router.delete("/:id", async (req, res) => {
  try {
    const deletedTrip = await RoadTrip.findByIdAndDelete(req.params.id);

    if (!deletedTrip) return res.status(404).json({ error: "RoadTrip not found" });

    // Also remove reference from User
    await User.findByIdAndUpdate(deletedTrip.createdBy, {
      $pull: { roadTrips: deletedTrip._id }
    });

    res.json({ message: "RoadTrip deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
