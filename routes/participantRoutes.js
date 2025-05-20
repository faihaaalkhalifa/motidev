const participantController = require('../controllers/participantController');
const { protect, restrictTo } = require('./../middlewares/authMiddlewers');
const { RoleCode } = require('./../utils/enum');
const { USER, ADMIN } = RoleCode;
const express = require('express');
const router = express.Router();
router.use(protect);
router
  .route('/:id/getAllParticipantByChallengeId')
  .get(restrictTo(USER, ADMIN), participantController.getAllParticipantByChallengeId)
router
  .route('/')
  .get(restrictTo(ADMIN), participantController.getAllParticipant)
  .post(restrictTo(USER, ADMIN), participantController.createParticipant);
router
  .route('/:id')
  .get(restrictTo(USER, ADMIN), participantController.getParticipant)
  .patch(restrictTo(), participantController.updateParticipant)
  .delete(restrictTo(ADMIN), participantController.deleteParticipant);
module.exports = router;
