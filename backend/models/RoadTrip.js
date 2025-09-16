const mongoose = require('mongoose');

const RoadTripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  date: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

const RoadTrip = mongoose.model('RoadTrip', RoadTripSchema);

module.exports = RoadTrip;
