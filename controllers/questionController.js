const Question = require('../models/questionModel');
const User = require('./../models/userModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
exports.getQuestion = handlerFactory.getOne(Question);
exports.createQuestion = handlerFactory.createOne(Question);
exports.updateQuestion = handlerFactory.updateOne(Question);
exports.deleteQuestion = handlerFactory.deleteOne(Question);
exports.getAllQuestion = handlerFactory.getAll(Question);
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
exports.submitTest = catchAsync(async (req, res) => {
  try {
    const { level, answers } = req.body;

    if (!level || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        message: 'يرجى إرسال المستوى ومصفوفة الإجابات.',
      });
    }

    // استخراج الـ IDs من الأجوبة
    const questionIds = answers.map((a) => a.id);

    // جلب الأسئلة الأصلية من قاعدة البيانات
    const questions = await Question.find({
      _id: { $in: questionIds },
      level: level,
    });

    if (questions.length === 0) {
      return res.status(404).json({
        message: 'لم يتم العثور على أسئلة بهذا المستوى.',
      });
    }

    // مقارنة كل إجابة بالإجابة الصحيحة
    let correctCount = 0;

    answers.forEach((userAnswer) => {
      const matchedQuestion = questions.find(
        (q) => q._id.toString() === userAnswer.id,
      );

      if (matchedQuestion && matchedQuestion.answer === userAnswer.answer) {
        correctCount++;
      }
    });

    const total = answers.length;
    const percentage = (correctCount / total) * 100;
    const passed = percentage >= 75;

    // تحديث مستوى المستخدم إن نجح (تأكد من وجود req.user)
    if (passed && req.user && req.user._id) {
      await User.findByIdAndUpdate(req.user._id, { currentLevel: level });
    }

    return res.status(200).json({
      passed,
      correctAnswers: correctCount,
      total,
      percentage: percentage.toFixed(2),
      message: passed,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
