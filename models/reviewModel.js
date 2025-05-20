const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema(
  {
    // <creating-property-schema />

    User: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    Project: {
      type: mongoose.Schema.ObjectId,
      ref: 'Project',
    },
    Educational: {
      type: mongoose.Schema.ObjectId,
      ref: 'Educational',
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
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'participantId',
    select: '-_id',
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
