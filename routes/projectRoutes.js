const projectController = require('../controllers/projectController');
const { protect, restrictTo } = require('./../middlewares/authMiddlewers');
const { RoleCode } = require('./../utils/enum');
const { USER, ADMIN } = RoleCode;
const express = require('express');
const router = express.Router();
router.use(protect);
router
  .route('/')
  .get(restrictTo(USER, ADMIN), projectController.getAllProject)
  .post(restrictTo(USER), projectController.createProject);
router
  .route('/:id')
  .get(restrictTo(USER, ADMIN), projectController.getProject)
  .patch(restrictTo(USER), projectController.updateProject)
  .delete(restrictTo(USER, ADMIN), projectController.deleteProject);
module.exports = router;
