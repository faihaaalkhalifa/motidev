const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema(
  {
    // <creating-property-schema />
    
    memberIds:[ {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    }],
    ownerId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please enter name  owner'],
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
      required: [true, 'Please enter name  name'],
    },
  },
  { timestamps: true, versionKey: false },
);
// <creating-function-schema />
projectSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'memberIds',
    select: 'name level -_id',
  });
  next();
});
projectSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'ownerId',
    select: 'name level ',
  });
  next();
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
