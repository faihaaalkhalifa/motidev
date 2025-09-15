const participantController = require('../controllers/participantController');
const { protect, restrictTo } = require('./../middlewares/authMiddlewers');
const { addVarBody, addQuery } = require('./../middlewares/dynamicMiddleware');
const { RoleCode } = require('./../utils/enum');
const { USER, ADMIN } = RoleCode;
const express = require('express');
const router = express.Router();

const upload = require('../middlewares/uploadMiddleware'); // تأكد من إنشاء هذا الملف

router.use(protect);

router.get('/:id/download', restrictTo(USER, ADMIN), participantController.downloadFile);

router
  .route('/LikeToSol/:id')
  .patch(restrictTo(USER, ADMIN), participantController.LikeToSol);
  
router
  .route('/acceptSol/:id')
  .patch(restrictTo(USER, ADMIN), participantController.acceptSol);
  
router
  .route('/rejectSol/:id')
  .patch(restrictTo(USER, ADMIN), participantController.rejectSol);

router
  .route('/:id/getAllParticipantByChallengeId')
  .get(
    restrictTo(USER, ADMIN),
    participantController.getAllParticipantByChallengeId,
  );

router
  .route('/')
  .get(restrictTo(ADMIN), participantController.getAllParticipant)
  .post(
    restrictTo(ADMIN, USER),
    upload.single('file'), // إضافة middleware رفع الملف
    addVarBody('userId', 'userId'),
    participantController.createParticipant,
  );

router
  .route('/:id')
  .get(restrictTo(USER, ADMIN), participantController.getParticipant)
  .patch(restrictTo(USER, ADMIN), participantController.updateParticipant)
  .delete(restrictTo(USER, ADMIN), participantController.deleteParticipant);

module.exports = router;