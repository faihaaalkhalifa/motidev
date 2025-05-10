const Project = require('../models/projectModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
exports.getProject = handlerFactory.getOne(Project);
exports.createProject = catchAsync(async (req, res, next) => {
  req.body.ownerId = req.user._id;
  req.body.memberIds = [req.user._id];
  const doc = await Project.create(req.body);
  res.status(201).json({
    status: 'success',
    doc,
  });
});
exports.updateProject = handlerFactory.updateOne(Project);
exports.deleteProject = handlerFactory.deleteOne(Project);
exports.getAllProject = handlerFactory.getAll(Project);
exports.getAllMineProject = catchAsync(async (req, res, next) => {
    const doc = await Project.find({memberIds:{$in:req.user._id}});
    res.status(200).json({
      status: 'success',
      results: doc.length,
      doc,
    });
  });
exports.addMember = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  // console.log(project.ownerId._id.toString(), req.user._id.toString());
  if (project.ownerId._id.toString() != req.user._id.toString())
    return next(new AppError('you are not owner', 403));
  project.memberIds.push(req.body.member);
  await project.save();
  res.status(201).json({
    status: 'success',
    doc: project,
  });
});
