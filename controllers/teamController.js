const Team = require('../models/teamModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const Notification = require('../models/notificationModel');

exports.getAllMine = catchAsync(async (req, res) => {
  const doc = await Team.find({ owner: { $eq: req.user._id } });
  res.status(200).json({
    status: 'success',
    doc,
  });
});

exports.joinTeam = catchAsync(async (req, res, next) => {
  const team = await Team.findById(req.params.id);
  if (!team) return next(new AppError('team not found', 404));
  
if (team.owner.toString() === req.user._id.toString()) {
  return next(new AppError('Owner cannot join their own team', 400));
}

  // التحقق إذا أرسل الرابط
  const { portfolioLink } = req.body;
  if (!portfolioLink) {
    return next(new AppError('Portfolio link is required', 400));
  }

  // التحقق إذا سبق أن أرسل طلب
  if (team.joinRequests.some(reqItem => reqItem.user.toString() === req.user._id.toString())) {
    return next(new AppError('you already requested to join', 400));
  }

  // إضافة الطلب مع رابط البورتفوليو
  team.joinRequests.push({
    user: req.user._id,
    portfolioLink
  });

  await team.save();

  // إرسال إشعار لصاحب الفريق
  await Notification.create({
    user: team.owner,
    title: 'طلب انضمام جديد',
    message: `${team.name}طلب الانضمام إلى فريقك "${req.user.name}`,
  });

  res.status(200).json({ message: 'send request success' });
});

exports.acceptRequest = catchAsync(async (req, res, next) => {
  const team = await Team.findById(req.params.teamId);
  if (!team) return next(new AppError('team not found', 404));

  if (!team.owner.equals(req.user._id)) {
    return next(new AppError('you are not the owner', 403));
  }

  const userId = req.params.userId;

  const alreadyMember = team.members.some((m) => m.user.toString() === userId);
  if (alreadyMember) {
    return next(new AppError('this member already exists', 400));
  }


  team.joinRequests = team.joinRequests.filter(
    (id) => id.toString() !== userId,
  );

  // ✅ إضافة العضو
  team.members.push({ user: userId, role: req.body.role || '' });
  await team.save();

  // ✅ إرسال إشعار للمستخدم المقبول
  await Notification.create({
    user: userId, // الشخص الذي تم قبوله
    title: 'تم قبول طلبك',
    message: `تم قبول انضمامك إلى فريق "${team.name}"`,
  });

  res.status(200).json({ status: 'success' });
});

exports.createTeam = catchAsync(async (req, res, next) => {
  req.body.owner = req.user._id; // تعيين المالك

  const team = await Team.create(req.body); // يحتوي على name من الـ body

  res.status(201).json({
    status: 'success',
    data: team,
  });
});

exports.getTeamLeader = catchAsync(async (req, res, next) => {
  const team = await Team.findById(req.params.id).populate({
    path: 'owner',
    select: 'name photo telegram_username level'
  });

  if (!team) {
    return next(new AppError('Team not found', 404));
  }

  if (!team.owner) {
    return next(new AppError('This team has no leader assigned', 404));
  }

  res.status(200).json({
    status: 'success',
    leader: team.owner
  });
});

exports.rejectRequest = catchAsync(async (req, res, next) => {
  const team = await Team.findById(req.params.teamId);
  if (!team) return next(new AppError('team not found', 404));

  // تأكد أن المستخدم هو المالك
  if (!team.owner.equals(req.user._id)) {
    return next(new AppError('you are not the owner', 403));
  }

  const userId = req.params.userId;

  // تحقق أن المستخدم فعلاً قدم طلب انضمام
  const requestIndex = team.joinRequests.findIndex(
    (id) => id.toString() === userId,
  );
  if (requestIndex === -1) {
    return next(new AppError('this user did not request to join', 400));
  }

  // احذف الطلب
  team.joinRequests.splice(requestIndex, 1);
  await team.save();

  // ✅ أرسل إشعار بالرفض
  await Notification.create({
    user: userId,
    title: 'تم رفض طلبك',
    message: `تم رفض طلب انضمامك إلى فريق "${team.name}"`,
  });

  res.status(200).json({ status: 'success', message: 'request rejected' });
});

exports.getTeam = handlerFactory.getOne(Team);
exports.updateTeam = handlerFactory.updateOne(Team);
exports.deleteTeam = handlerFactory.deleteOne(Team);
exports.getAllTeam = handlerFactory.getAll(Team);
