const Question  = require('../models/questionModel'); 
const AppError = require("../utils/appError"); 
const handlerFactory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync"); 
exports.getQuestion  = handlerFactory.getOne(Question);
exports.createQuestion = handlerFactory.createOne(Question); 
exports.updateQuestion = handlerFactory.updateOne(Question); 
exports.deleteQuestion =handlerFactory.deleteOne(Question);
exports.getAllQuestion = handlerFactory.getAll(Question); 
exports.random=catchAsync(async (req, res) => {
    try {
        const level = req.params.level; // مستوى السؤال (مثل: easy, medium, hard)
        const randomQuestions = await Question.aggregate([
            { $match: { level: level } }, // تصفية الأسئلة حسب المستوى
            { $sample: { size: 20 } }     // أخذ 20 سؤالًا عشوائيًا
        ]);

        if (randomQuestions.length === 0) {
            return res.status(404).json({ message: "لا توجد أسئلة متاحة لهذا المستوى." });
        }

        res.json(randomQuestions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})