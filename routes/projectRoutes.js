const projectController = require('../controllers/projectController');
const { addQuery } = require('../middlewares/dynamicMiddleware');
const { checkOwner } = require('../middlewares/checkMiddleware');
const { protect, restrictTo } = require('./../middlewares/authMiddlewers');
const { RoleCode } = require('./../utils/enum');
const { USER, ADMIN } = RoleCode;
const express = require('express');
const Project = require('../models/projectModel');
const router = express.Router();
router.use(protect);
router
  .route('/searchName')
  .get(restrictTo(USER, ADMIN), projectController.searchProjectByName);
router
  .route('/searchStatus')
  .get(restrictTo(USER, ADMIN), projectController.searchProjectByStatus);
// router
//   .route('/:id/addMember')
//   .patch(restrictTo(USER), projectController.addMember);
router
  .route('/mine')
  .get(restrictTo(USER), projectController.getAllMineProject);
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
