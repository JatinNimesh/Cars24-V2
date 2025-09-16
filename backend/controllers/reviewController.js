const Review = require('../models/Review');

// Create
const createReview = async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read (all reviews)
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('createdBy').populate('roadTrip');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
const updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createReview, getReviews, updateReview, deleteReview };
