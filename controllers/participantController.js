const Participant = require('../models/participantModel');
const User=require('../models/userModel');
const Challenges=require('../models/challengesModel');
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
exports.getAllParticipant = handlerFactory.getAll(Participant);//Admin


exports.getAllParticipantByChallengeId = catchAsync(async (req, res) => {
  const doc = await Participant.find({
    challengesId:req.params.id,
  });
  res.status(200).json({
    status: 'success',
    doc,
  });
});


