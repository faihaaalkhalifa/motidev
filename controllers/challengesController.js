const Challenges = require('../models/challengesModel');
const User=require('../models/userModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
exports.getChallenges = handlerFactory.getOne(Challenges );
exports.getChallengesByUserLevel = catchAsync(async (req, res) => {
const challenge=await Challenges.find({level:req.user.level});
if(!challenge){
  return next(new AppError('there are no challenges for this level'))
}
res.status(200).json({
    status: 'success',
    doc: challenge,
  });
});
exports.createChallenges = handlerFactory.createOne(Challenges);
exports.updateChallenges = handlerFactory.updateOne(Challenges);
exports.deleteChallenges = handlerFactory.deleteOne(Challenges);
exports.getAllChallenges = handlerFactory.getAll(Challenges);
