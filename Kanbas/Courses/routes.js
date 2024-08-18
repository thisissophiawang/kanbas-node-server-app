import Database from "../Database/index.js";
import * as dao from "./dao.js";

export default function CourseRoutes(app) {
  // Create a new course
  app.post("/api/courses", async (req, res) => {
    try {
      const newCourse = await dao.createCourse(req.body);
      res.send(newCourse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all courses
  app.get("/api/courses", async (req, res) => {
    try {
      const resCourses = await dao.findAllCourses();
      const dataCourse = [];
      dataCourse.push(...Database.courses, ...resCourses);
      res.send(dataCourse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete the course
  app.delete("/api/courses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const status = await dao.deleteCourse(id);
      if (status.deletedCount > 0) {
        Database.courses = Database.courses.filter((c) => c._id !== id);
        // res.json({ message: "Course deleted successfully" });
        res.send(Database.courses);
      } else {
        res.status(404).json({ error: "Course not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update a course
  app.put("/api/courses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedQuiz = await dao.updateCourse(id, req.body);
      if (updatedQuiz.modifiedCount > 0) {
        Database.courses = Database.courses.map((c) => (c._id === id ? { ...c, ...req.body } : c));
        // res.json({ message: "Quiz updated successfully" });
        res.send(Database.courses);
      } else {
        res.status(404).json({ error: "Quiz not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}
