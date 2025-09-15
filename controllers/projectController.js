const Project = require('../models/projectModel');
const Team = require('../models/teamModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
// exports.getProject = handlerFactory.getOne(
//   Project,
//   {
//     path: 'memberIds',
//     select: 'name level -_id',
//   },
//   {
//     path: 'ownerId',
//     select: 'name level ',
//   },

// );

exports.getProject = handlerFactory.getOne(
  Project,
  {
    path: 'ownerId',
    select: 'name email',
  },
  {
    path: 'team',
    populate: { path: 'members.user', select: 'name email role' },
  },
);


exports.createProject = catchAsync(async (req, res, next) => {
  req.body.owner = req.user._id;
  req.body.memberIds = [req.user._id];

  // تأكد أن المستخدم مالك الفريق
  const team = await Team.findById(req.body.team);
  if (!team) return next(new AppError('الفريق غير موجود', 404));
  if (!team.equals(req.user._id))
    return next(new AppError('لست مالك هذا الفريق', 403));

  const doc = await Project.create(req.body);
  res.status(201).json({
    status: 'success',
    doc,
  });
});

exports.updateProject = catchAsync(async (req, res, next) => {
  if ('ownerId' in req.body) {
    delete req.body.ownerId;
  }

  // ✅ تحقق أولاً من وجود المشروع
  const project = await Project.findById(req.params.id);
  if (!project) {
    return next(new AppError('المشروع غير موجود', 404));
  }

  // ✅ تحقق من أنك المالك
  if (!project.ownerId.equals(req.user._id)) {
    return next(new AppError('غير مصرح لك بتعديل هذا المشروع', 403));
  }

  // ✅ ثم حدث المشروع
  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    status: 'success',
    doc: updatedProject,
  });
});

exports.deleteProject = handlerFactory.deleteOne(Project);
exports.getAllProject = handlerFactory.getAllpop1(
  Project,
  {
    path: 'memberIds',
    select: 'name level -_id',
  },
  {
    path: 'ownerId',
    select: 'name level ',
  },
);
exports.getAllMineProject = catchAsync(async (req, res, next) => {
  const doc = await Project.find({ ownerId: { $eq: req.user._id } }).populate({
    path: 'ownerId',
    select: 'level name email',
  });
  res.status(200).json({
    status: 'success',
    doc,
  });
});


exports.getCountMineProject = catchAsync(async (req, res, next) => {
  const doc = await Project.countDocuments({ ownerId: { $eq: req.user._id } })
  res.status(200).json({
    status: 'success',
    doc,
  });
});
// exports.addMember = catchAsync(async (req, res, next) => {
//   const project = await Project.findById(req.params.id);
//   // console.log(project.ownerId._id.toString(), req.user._id.toString());
//   if (project.ownerId._id.toString() != req.user._id.toString())
//     return next(new AppError('you are not ownerfgh', 403));
//   project.memberIds.push(req.body.member);
//   await project.save();
//   res.status(201).json({
//     status: 'success',
//     doc: project,
//   });
// });

exports.searchProjectByName = catchAsync(async (req, res) => {
  const { name } = req.query;
  if (!name) {
    res.status(400).json({
      status: 'fail',
      message: 'please provide project name to search',
    });
  }
  const doc = await Project.find({ name: { $eq: name } });
  res.status(200).json({
    status: 'success',
    doc,
  });
});

exports.searchProjectByStatus = catchAsync(async (req, res) => {
  const { status } = req.query;
  if (!status) {
    res.status(400).json({
      status: 'fail',
      message: 'please provide project status to search',
    });
  }
  const doc = await Project.find({ status: { $eq: status } });
  res.status(200).json({
    status: 'success',
    doc,
  });
});
