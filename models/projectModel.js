const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema(
  {
    Review: {
      type: mongoose.Schema.ObjectId,
      ref: 'Reviewr',
    },
    // <creating-property-schema />
    emails: [
      {
        type: String,
        required: [true, 'Please enter name  emails'],
      },
    ],
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
      required: [true, 'Please enter name  name'],
    },
  },
  { timestamps: true, versionKey: false },
);
// <creating-function-schema />

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
