const RoadTrip = require('../models/RoadTrip');

// Create
const createRoadTrip = async (req, res) => {
  try {
    const newTrip = await RoadTrip.create(req.body);
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read (all trips)
const getRoadTrips = async (req, res) => {
  try {
    const trips = await RoadTrip.find().populate('createdBy').populate('reviews');
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
const updateRoadTrip = async (req, res) => {
  try {
    const updatedTrip = await RoadTrip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
const deleteRoadTrip = async (req, res) => {
  try {
    await RoadTrip.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createRoadTrip, getRoadTrips, updateRoadTrip, deleteRoadTrip };
