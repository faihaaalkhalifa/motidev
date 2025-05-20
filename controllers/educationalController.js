const Educational = require('../models/educationalModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
exports.getNumOfWatching = catchAsync(async (req, res, next) => {
  const thisEducational = await Educational.findById(req.params.id);
  if (!thisEducational) {
    return next(new AppError('No educational record found with that ID', 404));
  }
  if (thisEducational.user.id.toString() !== req.user._id.toString()) {
    if (!thisEducational.viewers.includes(req.user._id)) {
      thisEducational.viewers.push(req.user._id);
    }
    thisEducational.count_viewers++;
  }
  await thisEducational.save();
  res.status(200).json({
    status: 'success',
    doc: thisEducational,
  });
});
exports.createEducational = catchAsync(async (req, res, next) => {
  if (req.user.level == 'Fresher') {
    return next(
      new AppError('Fresher level can not ctreate Educational content ', 403),
    );
  }
  if (
    (req.user.level =
      'Jonior' && (req.body.level == 'Senior' || req.body.level == 'Mid_level'))
  ) {
    return next(
      new AppError(
        `Jonior level can not ctreate Educational content for ${req.body.level}`,
        403,
      ),
    );
  }
  req.body.userId = req.user._id;
  const doc = await Educational.create(req.body);
  res.status(201).json({
    status: 'success',
    doc,
  });
});
exports.getEducational = handlerFactory.getOne(Educational, {
  path: 'userId', // هل المتغير ده محجوز
  select: 'name photo -_id',
});
exports.createEducational = handlerFactory.createOne(Educational);
exports.updateEducational = handlerFactory.updateOne(Educational);
exports.deleteEducational = handlerFactory.deleteOne(Educational);
exports.getAllEducational = handlerFactory.getAll(Educational);
