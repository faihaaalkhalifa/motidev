const Participant = require('./participantModel');
const { RoleCode, levelEnum } = require('../utils/enum');
const mongoose = require('mongoose');
const AppError=require('../utils/appError')
const challengesSchema = new mongoose.Schema(
  {
    // <creating-property-schema />
    acceptedOfThisChallenge: {
      type: Number,
    },
    level: {
      type: String,
      enum: Object.values(levelEnum),
    },
    photo: {
      type: String,
      default: 'link defualt photo',
    },
    description: {
      type: String,
    },
    title: {
      type: String,
      required: [true, 'Please enter name  titile'],
    },
    pointOfthisChallenge: {
      type: Number,
    },
  },
  { timestamps: true, versionKey: false },
);
// <creating-function-schema />


const Challenges = mongoose.model('Challenges', challengesSchema);
module.exports = Challenges;
