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
router.get('/resetPassword/:token', (req, res) => {res.render('user/resetPassword4');});
router.post('/signup', authController.signup);
// عمليات المستخدم على حسابه الخاص
router.patch('/activeMe', authMiddlewers.protect, userController.activeMe);
router.patch('/updateMyPassword',authMiddlewers.protect,authController.updatePassword,);
router.get('/me',authMiddlewers.protect,userController.getMe,userController.getUser,);
router.patch('/updateMeAndUpload',authMiddlewers.protect,imguserMiddlewers.uploadUserPhoto,userController.updateMe,);
router.patch('/updateMe', authMiddlewers.protect, userController.updateMe);
router.delete('/deleteMe', authMiddlewers.protect, userController.deleteMe);
// طرق ادارة المستخدمين
<<<<<<< HEAD
router
  .route('/')
=======
router.route('/')
>>>>>>> 70b13b397ab76889ad3b7bfb30e2ae2f9028f268
  .get(
    authMiddlewers.protect,
    authMiddlewers.isactive,
    authMiddlewers.restrictTo('ADMIN'),
<<<<<<< HEAD
    userController.getAllUsers, //,الحصول على جميع المستخدمين
=======
     userController.getAllUsers,//,الحصول على جميع المستخدمين
>>>>>>> 70b13b397ab76889ad3b7bfb30e2ae2f9028f268
  )
  .post(
    authMiddlewers.protect,
    authMiddlewers.isactive,
    authMiddlewers.restrictTo('ADMIN'),
<<<<<<< HEAD
    userController.createUser, //انشاء مستخدم جديد
=======
    userController.createUser,//انشاء مستخدم جديد
>>>>>>> 70b13b397ab76889ad3b7bfb30e2ae2f9028f268
  );
router.route('/:id')
  .get(
    authMiddlewers.protect,
    authMiddlewers.isactive,
    authMiddlewers.restrictTo('ADMIN'),
<<<<<<< HEAD
    userController.getUser, //الحصول على مستخدم معين
=======
    userController.getUser,//الحصول على مستخدم معين
>>>>>>> 70b13b397ab76889ad3b7bfb30e2ae2f9028f268
  )
  .patch(
    authMiddlewers.protect,
    authMiddlewers.isactive,
    authMiddlewers.restrictTo('ADMIN'),
<<<<<<< HEAD
    userController.updateUser, //تحديث مستخدم معين
=======
    userController.updateUser,//تحديث مستخدم معين
>>>>>>> 70b13b397ab76889ad3b7bfb30e2ae2f9028f268
  )
  .delete(
    authMiddlewers.protect,
    authMiddlewers.isactive,
    authMiddlewers.restrictTo('ADMIN'),
<<<<<<< HEAD
    userController.deleteUser, //حذف مستخدم معين
=======
    userController.deleteUser,//حذف مستخدم معين
>>>>>>> 70b13b397ab76889ad3b7bfb30e2ae2f9028f268
  );
module.exports = router;
   