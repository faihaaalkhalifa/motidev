const Participant = require('../models/participantModel');
const User = require('../models/userModel');
const Challenges = require('../models/challengesModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const { settingPoint } = require('../utils/enum');
const Notification = require('../models/notificationModel');
const fs = require('fs');
const path = require('path');

exports.getParticipant = handlerFactory.getOne(Participant, {
  path: 'userId',
  select: 'name photo level -_id',
});

exports.createParticipant = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('يرجى رفع ملف', 400));
  }

  const newParticipant = await Participant.create({
    comment: req.body.comment,
    file: {
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: `uploads/${req.file.filename}`,
      fileType: req.file.mimetype,
      fileSize: req.file.size
    },
    challengesId: req.body.challengesId,
    userId: req.user._id
  });

  const seniorUsers = await User.find({ level: 'Senior' });
  
  const notifications = seniorUsers.map(user => ({
    user: user._id,
    title: 'حل جديد تم مشاركته',
    message: `${req.user.name} قام بمشاركة حل جديد على التحدي`,
    type: 'new_solution',
    data: {
      participantId: newParticipant._id,
      challengeId: req.body.challengesId
    }
  }));

  await Notification.insertMany(notifications);

  res.status(201).json({
    status: 'success',
    data: {
      doc: newParticipant
    }
  });
});

exports.downloadFile = catchAsync(async (req, res, next) => {
  const participant = await Participant.findById(req.params.id);
  
  if (!participant || !participant.file) {
    return next(new AppError('الملف غير موجود', 404));
  }

  const filePath = path.join(__dirname, '..', participant.file.filePath);
  
  if (!fs.existsSync(filePath)) {
    return next(new AppError('الملف غير موجود على الخادم', 404));
  }

  res.setHeader('Content-Disposition', `attachment; filename="${participant.file.originalName}"`);
  res.setHeader('Content-Type', participant.file.fileType);
  
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

exports.updateParticipant = handlerFactory.updateOne(Participant);
exports.deleteParticipant = handlerFactory.deleteOne(Participant);
exports.getAllParticipant = handlerFactory.getAllpop1(Participant, {
  path: 'userId',
  select: 'name photo level -_id',
}); //Admin

exports.getAllParticipantByChallengeId = catchAsync(async (req, res) => {
  const doc = await Participant.find({
    challengesId: req.params.id,
    status:true
  });
  res.status(200).json({
    status: 'success',
    doc,
  });
});

exports.LikeToSol = catchAsync(async (req, res, next) => {
  const doc = await Participant.findById(req.params.id);
  if (!doc) {
    return next(new AppError('الحل غير موجود', 404));
  }

  if (req.user._id.equals(doc.userId)) {
    return next(new AppError('لا يمكنك الإعجاب بحلك الخاص', 403));
  }

  const thisChallenge = await Challenges.findById(doc.challengesId);
  if (!thisChallenge) {
    return next(new AppError('التحدي غير موجود', 404));
  }
  const hasAlreadyLiked = doc.accepter.some((id) => id.equals(req.user._id));
  if (hasAlreadyLiked) {
    doc.accepter = doc.accepter.filter((id) => !id.equals(req.user._id));
    doc.accepted = Math.max(0, doc.accepted - 1); // التأكد من عدم وجود قيم سالبة
  } else {
    doc.accepter.push(req.user._id);
    doc.accepted += 1;
  }
  await doc.save();
  if (!hasAlreadyLiked) {
    await Notification.create({
      user: doc.userId,
      title: 'إعجاب جديد بحلك',
      message: `أعجب ${req.user.name} بحلك على التحدي`,

    });
  }

  res.status(200).json({ 
    status: 'success', 
    message: hasAlreadyLiked ? 'تم إزالة الإعجاب' : 'تم الإعجاب بالحل',
    data: {
      likesCount: doc.accepted,
      hasLiked: !hasAlreadyLiked
    }
  });
});

exports.acceptSol = catchAsync(async (req, res, next) => {
  const Sol = await Participant.findById(req.params.id);
  if (!Sol) return next(new AppError('الحل غير موجود', 404));
  
  Sol.status = true;
  await Sol.save();
  await Notification.create({
    user: Sol.userId,
    title: 'تم قبول حلك',
    message: `مبروك! تم قبول حلك على التحدي بنجاح`,
  });

  const thisChallenge = await Challenges.findById(Sol.challengesId);
  if (!thisChallenge) return next(new AppError('التحدي غير موجود', 404));

  const pointsToAdd = Number(thisChallenge.pointOfthisChallenge) || 0;
  if (isNaN(pointsToAdd)) {
    return next(new AppError('قيمة النقاط غير صحيحة', 400));
  }

  const thisUser = await User.findById(Sol.userId);
  if (!thisUser) return next(new AppError('المستخدم غير موجود', 404));

  const currentPoints = Number(thisUser.point) || 0;
  thisUser.point = currentPoints + pointsToAdd;


  if (typeof settingPoint !== 'object') {
    return next(new AppError('إعدادات النقاط غير صحيحة', 500));
  }


  const { Junior = 0, MidLevel = 0, Senior = 0 } = settingPoint;
  
  if (thisUser.point >= Number(Senior) || 0) {
    thisUser.level = 'Senior';
  } else if (thisUser.point >= Number(MidLevel) || 0) {
    thisUser.level = 'Mid-Level';
  } else if (thisUser.point >= Number(Junior) || 0) {
    thisUser.level = 'Junior';
  } else {
    thisUser.level = thisUser.level || 'Beginner';
  }

  await thisUser.save();
  res.status(200).json({ 
    status: 'success',
    message: 'تم قبول الحل وتحديث النقاط والمستوى بنجاح',
    data: {
      user: thisUser.name,
      pointsAdded: pointsToAdd,
      totalPoints: thisUser.point,
      newLevel: thisUser.level
    }
  });
});

exports.rejectSol = catchAsync(async (req, res, next) => {
  const Sol = await Participant.findById(req.params.id);
  if (!Sol) return next(new AppError('الحل غير موجود', 404));
  
  Sol.status = false;
  await Sol.save();

  await Notification.create({
    user: Sol.userId,
    title: 'تم رفض حلك',
    message: `نأسف، تم رفض حلك على التحدي. يمكنك المحاولة مرة أخرى!`,
  });

  res.status(200).json({ 
    status: 'success',
    message: 'تم رفض الحل بنجاح'
  });
});