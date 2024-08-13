//Users/sophiawang/2024/summer/webdev/su2/kanbas-node-server-app/Kanbas/Modules/routes.js

import * as dao from "./dao.js";


export default function ModuleRoutes(app) {
    //Create Module
    const createModule = async (req, res) => {
        try {
            console.log("Received request to create module:", req.body);
            const { courseId } = req.params;
            const module = { 
                name: req.body.name, 
                description: req.body.description, 
                course: courseId, 
                lessons: req.body.lessons || [] 
            };
    
            const newModule = await dao.createModule(module);
            console.log("Successfully created module:", newModule);
            res.json(newModule);
        } catch (error) {
            console.error("Error creating module:", error.message);
            res.status(500).json({ error: error.message });
        }
    };
      
  //find Modules for Course
  const findModulesForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const modules = await dao.findModulesForCourse(courseId);
      res.json(modules);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //Update Module
  const updateModule = async (req, res) => {
    try {
      const { moduleId } = req.params;
      const updatedModule = await dao.updateModule(moduleId, req.body);
      res.json(updatedModule);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //Delete Module
  const deleteModule = async (req, res) => {
    try {
      const { moduleId } = req.params;
      const status = await dao.deleteModule(moduleId);
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //Route Registration
  app.post("/api/courses/:courseId/modules", createModule);
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.put("/api/modules/:moduleId", updateModule);
  app.delete("/api/modules/:moduleId", deleteModule);
}