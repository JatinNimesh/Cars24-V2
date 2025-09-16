const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  roadTrip: { type: mongoose.Schema.Types.ObjectId, ref: 'RoadTrip' },
  date: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
