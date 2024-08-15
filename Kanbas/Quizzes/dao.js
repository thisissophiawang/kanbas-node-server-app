//Users/sophiawang/2024/summer/webdev/su2/kanbas-node-server-app/Kanbas/Quizzes/dao.js
import model from "./model.js";

export const findAllQuizzes = () => model.find();
export const createQuiz = (quiz) => model.create(quiz);

// This function retrieves a quiz by its quiz ID
export const findQuizById = (quizId) => model.findById(quizId);

// This function retrieves all quizzes for a specific course
export const findQuizzesByCourseId = (courseId) => model.find({ course: courseId });  // Corrected

export const updateQuiz = (quizId, quiz) => model.updateOne({ _id: quizId }, { $set: quiz });
export const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId });
