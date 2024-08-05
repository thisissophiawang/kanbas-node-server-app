import Database from "../Database/index.js";
export default function AssignmentRoutes(app) {
  
  // Create a new assignment
  app.post("/api/assignments", (req, res) => {
    const assignment = { ...req.body, _id: new Date().getTime().toString() };
    Database.assignments.push(assignment);
    res.send(assignment);
  });

  // Get all assignments
  app.get("/api/assignments", (req, res) => {
    const assignments = Database.assignments;
    res.send(assignments);
  });

  // Get assignments by course id
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = Database.assignments.filter((a) => a.course === cid);
    res.send(assignments);
  });

  // Update an assignment
  app.put("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const assignmentIndex = Database.assignments.findIndex((a) => a._id === id);
    Database.assignments[assignmentIndex] = {
      ...Database.assignments[assignmentIndex],
      ...req.body,
    };
    res.sendStatus(204);
  });

  // Delete an assignment
  app.delete("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    Database.assignments = Database.assignments.filter((a) => a._id !== id);
    res.sendStatus(200);
  });
}
