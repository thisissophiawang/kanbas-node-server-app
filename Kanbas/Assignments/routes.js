//Users/sophiawang/2024/summer/webdev/su2/kanbas-node-server-app/Kanbas/Assignments/routes.js
import db from "../Database/index.js";

export default function AssignementRoutes(app) {
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments.filter((m) => m.course === cid);
    res.json(assignments);
  });
  //creating a new assignment
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
        ...req.body,
        course: cid,
        _id: new Date().getTime().toString(),
    };
    db.assignments.push(newAssignment);
    res.send(newAssignment);
});

//getting all assignments
app.get("/api/courses/:cid/assignments", (req, res) => {
  const { cid } = req.params;
  const assignments = db.assignments.filter((a) => a.course === cid);
  res.json(assignments);
});

//deleting an assignment
app.delete("/api/assignments/:aid", (req, res) => {
  const { aid } = req.params;
  db.assignments = db.assignments.filter((a) => a._id !== aid);
  res.sendStatus(200);
});

//updating an assignment
app.put("/api/assignments/:aid", (req, res) => {
  const { aid } = req.params;
  const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
  db.assignments[assignmentIndex] = {
      ...db.assignments[assignmentIndex],
      ...req.body,
  };
  res.sendStatus(204);
});

}


  
