const Question = require('../models/questionModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
exports.getQuestion = handlerFactory.getOne(Question);
exports.createQuestion = handlerFactory.createOne(Question);
exports.updateQuestion = handlerFactory.updateOne(Question);
exports.deleteQuestion = handlerFactory.deleteOne(Question);
exports.getAllQuestion = handlerFactory.getAll(Question);
exports.getTestQuestion = catchAsync(async (req, res) => {
  let count = 0;
  const userId = req.user._id;
  const { answers } = req.body;
  let thisanswer;
  let questionInDB;
  for (let i = 0; i < answers.length; i++) {
    thisanswer = answers[i];
    questionInDB = await Question.findById(thisanswer.id);
    console.log('questionInDB');
    if (questionInDB.answer == thisanswer.answer) count += 1;
  }
  if (count >= answers.length * 0.75) {
    //update in DB
    await User.findByIdAndUpdate(userId, { level: questionInDB.level });
    console.log('questionInDB');

    res.status(200).json({
      status: `your level updated to ${questionInDB.level} your corect ansorus are ${count}`,
    });
  } //leve
  else {
    res.status(200).json('Mybe next time');
  }
});
exports.random = catchAsync(async (req, res) => {
  try {
    const level = req.params.level; // مستوى السؤال (مثل: easy, medium, hard)
    const randomQuestions = await Question.aggregate([
      { $match: { level: level } }, // تصفية الأسئلة حسب المستوى
      { $sample: { size: 20 } }, // أخذ 20 سؤالًا عشوائيًا
    ]);

    if (randomQuestions.length === 0) {
      return res
        .status(404)
        .json({ message: 'لا توجد أسئلة متاحة لهذا المستوى.' });
    }

    res.json(randomQuestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
