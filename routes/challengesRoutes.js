const challengesController = require('../controllers/challengesController');
const { protect, restrictTo } = require('./../middlewares/authMiddlewers');
const { RoleCode } = require('./../utils/enum');
const { USER, ADMIN } = RoleCode;
const express = require('express');
const router = express.Router();
router.use(protect);
router
  .route('/:ByLevel')
  .get(restrictTo(USER, ADMIN), challengesController.getChallengesByUserLevel);
router
  .route('/')
  .get(restrictTo(ADMIN), challengesController.getAllChallenges) //اليوزر والادمن؟؟؟؟
  .post(restrictTo(ADMIN), challengesController.createChallenges);
router
  .route('/:id')
  .get(restrictTo(USER, ADMIN), challengesController.getChallenges)
  .patch(restrictTo(ADMIN), challengesController.updateChallenges)
  .delete(restrictTo(ADMIN), challengesController.deleteChallenges);
module.exports = router;
