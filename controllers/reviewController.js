const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
exports.getReview = handlerFactory.getOne(Review);
exports.createReview = handlerFactory.createOne(Review);
exports.updateReview = handlerFactory.updateOne(Review);
exports.deleteReview = handlerFactory.deleteOne(Review);
exports.getAllReview = handlerFactory.getAll(Review); //بدي الرفيو لشي مخصص

exports.getAllReviewByEducationalId = catchAsync(async (req, res) => {
  const doc = await Review.find({
    Educational: req.params.id,
  });
  res.status(200).json({
    status: 'success',
    doc,
  });
});

exports.getAllReviewByProjectId = catchAsync(async (req, res) => {
  const doc = await Review.find({
    Project: req.params.id,
  });
  res.status(200).json({
    status: 'success',
    doc,
  });
});
