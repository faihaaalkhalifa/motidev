const Participant = require('../models/participantModel');
const User = require('../models/userModel');
const Challenges = require('../models/challengesModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const { settingPoint } = require('../utils/enum');
exports.getParticipant = handlerFactory.getOne(Participant, {
  path: 'userId',
  select: 'name photo level -_id',
});
//بدي تابع يجلب الملف الشخصي للمستخدم بالاحرى بدي لما ينضغط على اسم المستخدم يطلع الملف الشخصي
exports.createParticipant = handlerFactory.createOne(Participant);
exports.updateParticipant = handlerFactory.updateOne(Participant);
exports.deleteParticipant = handlerFactory.deleteOne(Participant);
exports.getAllParticipant = handlerFactory.getAllpop1(Participant, {
  path: 'userId',
  select: 'name photo level -_id',
}); //Admin

exports.getAllParticipantByChallengeId = catchAsync(async (req, res) => {
  const doc = await Participant.find({
    challengesId: req.params.id,
  });
  res.status(200).json({
    status: 'success',
    doc,
  });
});
exports.incPointAndChekUserLevel = catchAsync(async (req, res, next) => {
  const doc = await Participant.findById(req.params.id);
  if (!doc) {
    return next(new AppError('Participant Not Found', 404));
  }

  if (req.user._id.equals(doc.userId)) {
    return next(new AppError('this is your Participantion ', 403));
  }

  // تحقق من وجود التحدي
  const thisChallenge = await Challenges.findById(doc.challengesId);
  if (!thisChallenge) {
    return next(new AppError('This challenge not found', 404));
  }

  // تحديث القائمة accepter
  const userIndex = doc.accepter.findIndex((id) => id.equals(req.user._id));
  if (userIndex !== -1) {
    doc.accepter.splice(userIndex, 1);
    doc.accepted--;
  } else {
    doc.accepter.push(req.user._id);
    doc.accepted++;
  }

  await doc.save();

  // تحديث نقاط المستخدم إذا تم تحقيق الشرط
  const thisUser = await User.findById(doc.userId);
  if (doc.accepted === thisChallenge.acceptedOfThisChallenge) {
    thisUser.point += thisChallenge.pointOfthisChallenge;
  }

  // تحديث مستوى المستخدم
  if (thisUser.point >= settingPoint.Junior) {
    thisUser.level =
      thisUser.point >= settingPoint.Senior
        ? 'Senior'
        : thisUser.point >= settingPoint.MidLevel
          ? 'Mid-Level'
          : 'Junior';
  }

  await thisUser.save();
  res.status(200).json({ status: 'success', message: 'success' });
});
