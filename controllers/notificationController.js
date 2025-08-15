const Notification = require('../models/notificationModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createNotification = catchAsync(async (req, res, next) => {
  const notification = await Notification.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      notification,
    },
  });
});

exports.getMyNotifications = catchAsync(async (req, res, next) => {
  const notifications = await Notification.find({ user: req.user._id }).sort(
    '-createdAt',
  );

  res.status(200).json({
    status: 'success',
    results: notifications.length,
    data: {
      notifications,
    },
  });
});

exports.markAsRead = catchAsync(async (req, res, next) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { read: true },
    { new: true },
  );

  if (!notification) return next(new AppError('Notification not found', 404));

  res.status(200).json({
    status: 'success',
    data: {
      notification,
    },
  });
});

exports.deleteNotification = catchAsync(async (req, res, next) => {
  const notification = await Notification.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!notification) return next(new AppError('Notification not found', 404));

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
