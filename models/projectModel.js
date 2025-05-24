const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema(
  {
    // <creating-property-schema />

    memberIds: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    ownerId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please enter owner'],
    },

    link: {
      type: String,
      required: [true, 'Please enter name  link'],
    },
    photo: {
      type: String,
      required: [true, 'Please enter name  photo'],
    },
    description: {
      type: String,
      required: [true, 'Please enter name  description'],
    },
    name: {
      type: String,
      required: [true, 'Please enter name '],
    },
  },
  { timestamps: true, versionKey: false },
);
// <creating-function-schema />

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
