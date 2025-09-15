const { RoleCode, levelEnum } = require('../utils/enum');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const participantSchema = new mongoose.Schema(
  {
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
    status:{
      type:Boolean,
      default: false,
    },
    comment: {
      type: String,
    },
    file: {
      originalName: {
        type: String,
      },
      fileName: {
        type: String,
      },
      filePath: {
        type: String,
      },
      fileType: {
        type: String,
      },
      fileSize: {
        type: Number,
      }
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
participantSchema.post('findOneAndDelete', async function (doc) {
  if (doc && doc.file && doc.file.filePath) {
    try {
      const fullPath = path.join(__dirname, '..', doc.file.filePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
      await Review.deleteMany({ participantId: doc._id });
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  } else if (doc) {
    try {
      await Review.deleteMany({ participantId: doc._id });
    } catch (error) {
      return next(new AppError('error deleting reviews', 500));
    }
  }
});

const Participant = mongoose.model('Participant', participantSchema);
module.exports = Participant;