import * as dao from "./dao.js";

export default function QuizRoutes(app) {

  const createQuiz = async (req, res) => {
    try {
      const newQuiz = await dao.createQuiz(req.body);
      res.json(newQuiz);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const findAllQuizzes = async (req, res) => {
    try {
      const quizzes = await dao.findAllQuizzes();
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const findQuizzesByCourseId = async (req, res) => {
    try {
      const { courseId } = req.params;
      const quizzes = await dao.findQuizzesByCourseId(courseId);
      res.json(quizzes);
    } catch (error) {
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
      res.status(500).json({ error: error.message });
    }
  };

  const submitQuizResponse = async (req, res) => {
    try {
      const { quizId } = req.params;
      const response = {
        userId: req.body.userId,
        answers: req.body.answers,
        score: req.body.score,
        attemptDate: new Date(),
      };

      const result = await dao.submitResponse(quizId, response);
      if (result.nModified > 0) {
        res.json({ message: "Quiz response submitted successfully" });
      } else {
        res.status(404).json({ error: "Quiz not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }


const handleSaveAndPreview = async () => {
  try {
    const savedQuiz = editingIndex !== null ? 
      await updateQuiz(currentQuizId, quizData) : 
      await createQuiz(quizData);

    // After saving, navigate to the preview page
    navigate(`/quiz-preview/${savedQuiz._id}`);
  } catch (error) {
    console.error("Error saving quiz:", error);
  }
};
  };

  app.get("/api/courses/:courseId/quizzes", findQuizzesByCourseId);
  app.post("/api/quizzes", createQuiz);
  app.get("/api/quizzes", findAllQuizzes);
  app.get("/api/quizzes/:quizId", findQuizById);
  app.put("/api/quizzes/:quizId", updateQuiz);
  app.delete("/api/quizzes/:quizId", deleteQuiz);
  app.post("/api/quizzes/:quizId/submit", submitQuizResponse);

}
