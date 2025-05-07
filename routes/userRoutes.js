// استيراد المكتبات والوحدات
const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const authMiddlewers = require('./../middlewares/authMiddlewers');
const imguserMiddlewers = require('./../middlewares/imguserMiddlewers');
// انشاء الروت
const router = express.Router();
// طرق المصادقة
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.get('/resetPassword/:token', (req, res) => {
  res.render('user/resetPassword4');
});
router.post('/signup', authController.signup);
// عمليات المستخدم على حسابه الخاص
router.patch('/activeMe', authMiddlewers.protect, userController.activeMe);
router.patch(
  '/updateMyPassword',
  authMiddlewers.protect,
  authController.updatePassword,
);
router.get(
  '/me',
  authMiddlewers.protect,
  userController.getMe,
  userController.getUser,
);
router.patch(
  '/updateMeAndUpload',
  authMiddlewers.protect,
  imguserMiddlewers.uploadUserPhoto,
  userController.updateMe,
);
router.patch('/updateMe', authMiddlewers.protect, userController.updateMe);
router.delete('/deleteMe', authMiddlewers.protect, userController.deleteMe);
// طرق ادارة المستخدمين
router
  .route('/')
  .get(
    authMiddlewers.protect,
    authMiddlewers.isactive,
    authMiddlewers.restrictTo('ADMIN'),
    userController.getAllUsers, //,الحصول على جميع المستخدمين
  )
  .post(
    authMiddlewers.protect,
    authMiddlewers.isactive,
    authMiddlewers.restrictTo('ADMIN'),
    userController.createUser, //انشاء مستخدم جديد
  );
router
  .route('/:id')
  .get(
    authMiddlewers.protect,
    authMiddlewers.isactive,
    authMiddlewers.restrictTo('ADMIN'),
    userController.getUser, //الحصول على مستخدم معين
  )
  .patch(
    authMiddlewers.protect,
    authMiddlewers.isactive,
    authMiddlewers.restrictTo('ADMIN'),
    userController.updateUser, //تحديث مستخدم معين
  )
  .delete(
    authMiddlewers.protect,
    authMiddlewers.isactive,
    authMiddlewers.restrictTo('ADMIN'),
    userController.deleteUser, //حذف مستخدم معين
  );
module.exports = router;
