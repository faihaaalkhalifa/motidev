const Participant = require('../models/participantModel');
const User = require('../models/userModel');
const Challenges = require('../models/challengesModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
exports.getParticipant = handlerFactory.getOne(Participant, {
  path: 'userId',
  select: 'name photo level -_id',
});
// بدي تابع يجلب الملف الشخصي للمستخدم بالاحرى بدي لما ينضغط على اسم المستخدم يطلع الملف الشخصي
exports.createParticipant = handlerFactory.createOne(Participant);
exports.updateParticipant = handlerFactory.updateOne(Participant);
exports.deleteParticipant = handlerFactory.deleteOne(Participant);
exports.getAllParticipant = handlerFactory.getAllpop1(Participant, {
  path: 'userId',
  select: 'name photo level -_id',
}); //Admin

// exports.getAllParticipantByChallengeId = catchAsync(async (req, res) => {
//   const doc = await Participant.find({
//     challengesId:req.params.id,
//   });
//   res.status(200).json({
//     status: 'success',
//     doc,
//   });
// });

exports.incPointAndChekUserLevel = catchAsync(async (req, res) => {
  //cheack user level
  const doc = await Participant.findById(req.params.id);
  if (req.user._id == doc.userId) {
    return next(new AppError('this is your participation',403))
  }
  if (doc.accepter.include(req.user._id)) {
  doc.accepter=doc.accepter.filter(e=>e!==req.user._id);
  doc.accepted--;
  }else{
  if (doc) {
    doc.accepter.push(req.user._id);
    doc.accepted++;
  }} 
  await doc.save();
  const thisUser = await User.findById(doc.userId);
  const thisChallenge = await Challenges.findOne(doc.challengesId);
  if (doc.accepted == thisChallenge.acceptedOfThisChallenge) {
    thisUser.point += thisChallenge.pointOfthisChallenge;
  }

  if (thisUser.point > 1000) {
  }
  await thisUser.save();

  res.status(200).json({ status: 'success', message: 'vvv' });
});
