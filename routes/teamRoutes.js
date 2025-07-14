const teamController = require('../controllers/teamController');
const { protect, restrictTo } = require('./../middlewares/authMiddlewers');
const { RoleCode } = require('./../utils/enum');
const { USER, ADMIN } = RoleCode;
const express = require('express');
const router = express.Router();
router.use(protect);

router.route('/mine').get(restrictTo(USER, ADMIN), teamController.getAllMine);
router
  .route('/:id/join')
  .patch(restrictTo(USER, ADMIN), teamController.joinTeam);
router
  .route('/:teamId/accept/:userId')
  .patch(restrictTo(USER, ADMIN), teamController.acceptRequest);
router
  .route('/:teamId/reject/:userId')
  .patch(restrictTo(USER, ADMIN), teamController.rejectRequest);
router
  .route('/mine')
  .get(restrictTo(USER,ADMIN), teamController.getAllMine);
router
  .route('/')
  .get(restrictTo(ADMIN,USER), teamController.getAllTeam)
  .post(restrictTo(ADMIN,USER), teamController.createTeam);
router
  .route('/:id')
  .get(restrictTo(USER, ADMIN), teamController.getTeam)
  .patch(restrictTo(ADMIN, USER), teamController.updateTeam)
  .delete(restrictTo(ADMIN, USER), teamController.deleteTeam);
module.exports = router;
