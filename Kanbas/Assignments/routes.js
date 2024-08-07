import db from "../Database/index.js";
export default function AssignementRoutes(app) {
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments.filter((m) => m.course === cid);
    res.json(assignments);
  });
}


  
