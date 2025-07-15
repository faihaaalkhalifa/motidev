const express = require('express');
const notificationController = require('../controllers/notificationController');
const { protect, restrictTo } = require('./../middlewares/authMiddlewers');
const { RoleCode } = require('./../utils/enum');
const { USER, ADMIN } = RoleCode;

const router = express.Router();
router.use(protect);

router
  .route('/:id/read')
  .patch(restrictTo(USER, ADMIN), notificationController.markAsRead);
router
  .route('/:id')
  .delete(restrictTo(USER, ADMIN), notificationController.deleteNotification);

router
  .route('/')
  .get(restrictTo(USER, ADMIN), notificationController.getMyNotifications);

router
  .route('/')
  .post(restrictTo(USER, ADMIN), notificationController.createNotification);

module.exports = router;
