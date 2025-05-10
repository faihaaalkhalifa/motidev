const mongoose = require('mongoose');
const { RoleCode, levelEnum } = require('../utils/enum');
const educationalSchema = new mongoose.Schema(
  {
    // <creating-property-schema />
    userId: {
      required: [true, 'Please enter owner'],
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    viewers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    count_viewers: {
      type: Number,
      default: 0,
    },
    level: {
      required: [true, 'Please enter level'],
      type: String,
      enum: Object.values(levelEnum),
    },
    link: {
      type: String,
      required: [true, 'Please enter name  link'],
    },
    title: {
      type: String,
      required: [true, 'Please enter name  title'],
    },
  },
  { timestamps: true, versionKey: false },
);
// <creating-function-schema />
const Educational = mongoose.model('Educational', educationalSchema);
module.exports = Educational;
