const participantController = require('../controllers/participantController');
const { protect, restrictTo } = require('./../middlewares/authMiddlewers');
const { addVarBody, addQuery } = require('./../middlewares/dynamicMiddleware');
const { RoleCode } = require('./../utils/enum');
const { USER, ADMIN } = RoleCode;
const express = require('express');
const router = express.Router();
router.use(protect);
router
  .route('/:id/incPointAndChekUserLevel')
  .patch(
    restrictTo(ADMIN, USER),
    participantController.incPointAndChekUserLevel,
  );
router
  .route('/:id/getAllParticipantByChallengeId')
  .get(
    restrictTo(USER, ADMIN),
    participantController.getAllParticipantByChallengeId,
  );

// router
//   .route('/:challengesId/getAllParticipantByChallengeId')
//   .get(
//     restrictTo(USER),
//     addQuery('challengesId', 'challengesId'),
//     participantController.getAllParticipant,
//   );
router;
router
  .route('/')
  .get(restrictTo(ADMIN), participantController.getAllParticipant)
  .post(
    restrictTo(ADMIN, USER),
    addVarBody('userId', 'userId'),
    participantController.createParticipant,
  );
router
  .route('/:id')
  .get(restrictTo(USER, ADMIN), participantController.getParticipant)
  .patch(restrictTo(USER, ADMIN), participantController.updateParticipant)
  .delete(restrictTo(USER, ADMIN), participantController.deleteParticipant);
module.exports = router;
