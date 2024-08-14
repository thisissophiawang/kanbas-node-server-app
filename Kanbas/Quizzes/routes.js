//Users/sophiawang/2024/summer/webdev/su2/kanbas-node-server-app/Kanbas/Quizzes/routes.js
import * as dao from "./dao.js";

export default function QuizRoutes(app) {

  const createQuiz = async (req, res) => {
    try {
      console.log("Received request to create quiz:", req.body);
      const newQuiz = await dao.createQuiz(req.body);
      console.log("Successfully created quiz:", newQuiz);
      res.json(newQuiz);
    } catch (error) {
      console.error("Error creating quiz:", error.message);
      res.status(500).json({ error: error.message });
    }
  };

  const findAllQuizzes = async (req, res) => {
    try {
      const quizzes = await dao.findAllQuizzes();
      res.json(quizzes);
    } catch (error) {
      console.error("Error retrieving quizzes:", error.message);
      res.status(500).json({ error: error.message });
    }
  };

  const findQuizzesByCourseId = async (req, res) => {
    try {
      const { courseId } = req.params;
      const quizzes = await dao.findQuizzesByCourseId(courseId);
      res.json(quizzes);
    } catch (error) {
      console.error("Error retrieving quizzes by course:", error.message);
      res.status(500).json({ error: error.message });
    }
  };

  const findQuizById = async (req, res) => {
    try {
      const { quizId } = req.params;
      const quiz = await dao.findQuizById(quizId);
      if (quiz) {
        res.json(quiz);
      } else {
        res.status(404).json({ error: "Quiz not found" });
      }
    } catch (error) {
      console.error("Error retrieving quiz:", error.message);
      res.status(500).json({ error: error.message });
    }
  };

  const updateQuiz = async (req, res) => {
    try {
      const { quizId } = req.params;
      const updatedQuiz = await dao.updateQuiz(quizId, req.body);
      if (updatedQuiz.modifiedCount > 0) {
        res.json({ message: "Quiz updated successfully" });
      } else {
        res.status(404).json({ error: "Quiz not found" });
      }
    } catch (error) {
      console.error("Error updating quiz:", error.message);
      res.status(500).json({ error: error.message });
    }
  };

  const deleteQuiz = async (req, res) => {
    try {
      const { quizId } = req.params;
      const status = await dao.deleteQuiz(quizId);
      if (status.deletedCount > 0) {
        res.json({ message: "Quiz deleted successfully" });
      } else {
        res.status(404).json({ error: "Quiz not found" });
      }
    } catch (error) {
      console.error("Error deleting quiz:", error.message);
      res.status(500).json({ error: error.message });
    }
  };

  app.get("/api/courses/:courseId/quizzes", findQuizzesByCourseId); //new route
  app.post("/api/quizzes", createQuiz);
  app.get("/api/quizzes", findAllQuizzes);
  app.get("/api/quizzes/:quizId", findQuizById);
  app.put("/api/quizzes/:quizId", updateQuiz);
  app.delete("/api/quizzes/:quizId", deleteQuiz);
}
