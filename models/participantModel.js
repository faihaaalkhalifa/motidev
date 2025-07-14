const { RoleCode, levelEnum } = require('../utils/enum');
const mongoose = require('mongoose');
const participantSchema = new mongoose.Schema(
  {
    // <creating-property-schema />
    accepter: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    accepted: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
    },
    file: {
      type: String,
    },
    challengesId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Challenges',
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true, versionKey: false },
);
// <creating-function-schema />

participantSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    try {
      await Review.deleteMany({ participantId: doc._id });
    } catch (error) {
      return next(new AppError('error deleting reviewss', 500));
    }
  }
});
const Participant = mongoose.model('Participant', participantSchema);
module.exports = Participant;
