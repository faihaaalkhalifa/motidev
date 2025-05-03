const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema(
  {
    // <creating-property-schema />
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
