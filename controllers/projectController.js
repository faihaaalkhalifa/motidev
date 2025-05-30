const Project = require('../models/projectModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
exports.getProject = handlerFactory.getOne(Project,{
  path: 'memberIds',
  select: 'name level -_id',
},{
  path: 'ownerId',
  select: 'name level ',
});
exports.createProject = catchAsync(async (req, res, next) => {
  req.body.ownerId = req.user._id; //
  req.body.memberIds = [req.user._id]; //
  const doc = await Project.create(req.body);
  res.status(201).json({
    status: 'success',
    doc,
  });
});
exports.updateProject = handlerFactory.updateOne(Project);
exports.deleteProject = handlerFactory.deleteOne(Project);
exports.getAllProject = handlerFactory.getAllpop1(Project,{
  path: 'memberIds',
  select: 'name level -_id',
},{
  path: 'ownerId',
  select: 'name level ',
});
exports.getAllMineProject = catchAsync(async (req, res, next) => {
  const doc = await Project.find({ memberIds: { $in: req.user._id } })
  .populate({
    path:'memberIds',
    select:'level name email'
  });
  res.status(200).json({
    status: 'success',
    doc,
  });
});
exports.addMember = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  // console.log(project.ownerId._id.toString(), req.user._id.toString());
  if (project.ownerId._id.toString() != req.user._id.toString())
    return next(new AppError('you are not ownerfgh', 403));
  project.memberIds.push(req.body.member);
  await project.save();
  res.status(201).json({
    status: 'success',
    doc: project,
  });
});

  exports.searchProjectByName = catchAsync(async (req, res) => {
        const {name} = req.query;
        if(!name){
            res.status(400).json({
          status: "fail",
          message:"please provide project name to search"
          });
        }
        const doc =await Project.find({name:{$eq:name}});
        res.status(200).json({
          status: "success",
          doc,
          });
        });

        exports.searchProjectByStatus = catchAsync(async (req, res) => {
        const {status} = req.query;
        if(!status){
            res.status(400).json({
          status: "fail",
          message:"please provide project status to search"
          });
        }
        const doc =await Project.find({status:{$eq:status}});
        res.status(200).json({
          status: "success",
          doc,
          });
        });
