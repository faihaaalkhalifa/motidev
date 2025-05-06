<<<<<<< HEAD
const questionController = require('../controllers/questionController');
const { protect, restrictTo } = require('./../middlewares/authMiddlewers');
const { RoleCode } = require('./../utils/enum');
const { USER, ADMIN } = RoleCode;
const express = require('express');
const router = express.Router();
router.use(protect);
// الحصول على 20 سؤالًا عشوائيًا حسب المستوى
router.get('/random/:level', questionController.random);
router
  .route('/test')
  .patch(restrictTo(USER), questionController.getTestQuestion);
router
  .route('/')
  .get(restrictTo(USER, ADMIN), questionController.getAllQuestion)
  .post(restrictTo(ADMIN), questionController.createQuestion);
router
  .route('/:id')
  .get(restrictTo(USER, ADMIN), questionController.getQuestion)
  .patch(restrictTo(ADMIN), questionController.updateQuestion)
  .delete(restrictTo(ADMIN), questionController.deleteQuestion);
=======
const questionController = require('../controllers/questionController'); 
const {protect,restrictTo}= require('./../middlewares/authMiddlewers'); 
const {RoleCode}= require('./../utils/enum'); 
const {USER,ADMIN}= RoleCode; 
const express = require("express"); 
const router = express.Router();
router.use(protect); 
// الحصول على 20 سؤالًا عشوائيًا حسب المستوى
router.get('/random/:level',questionController.random);
router.route("/").get( 
restrictTo(USER,ADMIN),
questionController.getAllQuestion)
.post(restrictTo(ADMIN),
questionController.createQuestion);
router .route("/:id") 
.get(restrictTo(USER,ADMIN),
questionController.getQuestion) 
.patch(restrictTo(ADMIN),
questionController.updateQuestion) 
.delete(restrictTo(ADMIN),
questionController.deleteQuestion) 
>>>>>>> 70b13b397ab76889ad3b7bfb30e2ae2f9028f268
module.exports = router;
