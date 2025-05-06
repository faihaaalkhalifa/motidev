<<<<<<< HEAD
const { levelEnum } = require('../utils/enum');

const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema(
  {
    // <creating-property-schema />
    level: {
      type: String,
      enum: Object.values(levelEnum),
    },
    answer: {
      type: String,
      required: [true, 'Please enter name  answer'],
    },
    c: {
      type: String,
      required: [true, 'Please enter name  c'],
    },
    d: {
      type: String,
      required: [true, 'Please enter name  d'],
    },
    b: {
      type: String,
      required: [true, 'Please enter name  b'],
    },
    a: {
      type: String,
      required: [true, 'Please enter name  a'],
    },
    question: {
      type: String,
      required: [true, 'Please enter name  question'],
      unique: true,
    },
  },
  { timestamps: true, versionKey: false },
);
// <creating-function-schema />

const Question = mongoose.model('Question', questionSchema);
=======
const {levelEnum } = require('../utils/enum');

const mongoose = require("mongoose"); 
const questionSchema = new mongoose.Schema({ 
  // <creating-property-schema />
  level: {
      type: String,
      enum: Object.values(levelEnum),
 }
,
    answer:  {
                        type: String,
                   required: [true, 'Please enter name  answer'],
 }
 ,
    c: {
                        type: String,
                   required: [true, 'Please enter name  c'],
 }
,
    d: {
                        type: String,
                   required: [true, 'Please enter name  d'],
 }
,
    b: {
                        type: String,
                   required: [true, 'Please enter name  b'],
 }
,
    a: {
                        type: String,
                   required: [true, 'Please enter name  a'],
 }
,
    question: {
                        type: String,
                   required: [true, 'Please enter name  question'],
      unique: true,
}
,
},
{ timestamps: true, versionKey: false });
// <creating-function-schema />







const Question = mongoose.model("Question",questionSchema); 
>>>>>>> 70b13b397ab76889ad3b7bfb30e2ae2f9028f268
module.exports = Question;
