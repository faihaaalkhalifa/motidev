const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema(
  {
    // <creating-property-schema />
    User: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    rate: {
      type: Number,
      max: 5,
      min: 1,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
);
// <creating-function-schema />

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
