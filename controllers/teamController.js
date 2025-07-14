const Team = require('../models/teamModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');

exports.getAllMine = catchAsync(async (req, res) => {
  const doc = await Team.find({ owner: { $eq: req.user._id } });
  res.status(200).json({
    status: 'success',
    doc,
  });
});
exports.joinTeam = catchAsync(async (req, res,next) => {
  const team = await Team.findById(req.params.id);
  if (!team) return next(new AppError('team not found', 404));
  if (team.joinRequests.includes(req.user._id))
    return next(new AppError('you already req join', 400));
  team.joinRequests.push(req.user._id);
  await team.save();
  res.status(200).json({ message: 'send request seccess' });
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

  // ✅ احذف الطلب من joinRequests
  team.joinRequests = team.joinRequests.filter(id => id.toString() !== userId);

  // ✅ أضف العضو
  team.members.push({ user: userId, role: req.body.role || '' });

  await team.save();

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


exports.rejectRequest = catchAsync(async (req, res, next) => {
  const team = await Team.findById(req.params.teamId);
  if (!team) return next(new AppError('team not found', 404));

  // تأكد أن المستخدم هو المالك
  if (!team.owner.equals(req.user._id)) {
    return next(new AppError('you are not the owner', 403));
  }

  const userId = req.params.userId;

  // تحقق أن المستخدم فعلاً قدم طلب انضمام
  const requestIndex = team.joinRequests.findIndex(id => id.toString() === userId);
  if (requestIndex === -1) {
    return next(new AppError('this user did not request to join', 400));
  }

  // احذف الطلب
  team.joinRequests.splice(requestIndex, 1);
  await team.save();

  res.status(200).json({ status: 'success', message: 'request rejected' });
});

exports.getTeam = handlerFactory.getOne(Team);
exports.updateTeam = handlerFactory.updateOne(Team);
exports.deleteTeam = handlerFactory.deleteOne(Team);
exports.getAllTeam = handlerFactory.getAll(Team);
