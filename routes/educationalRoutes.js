const educationalController = require('../controllers/educationalController');
const { protect, restrictTo } = require('./../middlewares/authMiddlewers');
const { addQuery } = require('./../middlewares/dynamicMiddleware');
const { RoleCode } = require('./../utils/enum');
const { USER, ADMIN } = RoleCode;
const express = require('express');
const router = express.Router();
router.use(protect);
router
  .route('/:id/Watching')
  .patch(restrictTo(USER), educationalController.getNumOfWatching);
router
  .route('/mine')
  .get(
    restrictTo(USER),
    addQuery('userId', 'userId'),
    educationalController.getAllEducational,
  );
router
  .route('/')
  .get(restrictTo(USER, ADMIN), educationalController.getAllEducational)
  .post(restrictTo(USER), educationalController.createEducational);
router
  .route('/:id')
  .get(restrictTo(USER, ADMIN), educationalController.getEducational)
  .patch(restrictTo(USER), educationalController.updateEducational)
  .delete(restrictTo(USER, ADMIN), educationalController.deleteEducational);
module.exports = router;
