// src/Kanbas/Assignments/routes.js

import express from 'express';
import Database from '../Database/index.js';

const router = express.Router();

// Create a new assignment
router.post('/assignments', (req, res) => {
  const assignment = { ...req.body, _id: new Date().getTime().toString() };
  Database.assignments.push(assignment);
  res.status(201).send(assignment);
});

// Get all assignments
router.get('/assignments', (req, res) => {
  res.send(Database.assignments);
});

// Get assignments by course id
router.get('/courses/:cid/assignments', (req, res) => {
  const { cid } = req.params;
  const assignments = Database.assignments.filter((a) => a.course === cid);
  res.send(assignments);
});

// Update an assignment
router.put('/assignments/:id', (req, res) => {
  const { id } = req.params;
  const assignmentIndex = Database.assignments.findIndex((a) => a._id === id);
  if (assignmentIndex !== -1) {
    Database.assignments[assignmentIndex] = { ...Database.assignments[assignmentIndex], ...req.body };
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

// Delete an assignment
router.delete('/assignments/:id', (req, res) => {
  const { id } = req.params;
  Database.assignments = Database.assignments.filter((a) => a._id !== id);
  res.sendStatus(200);
});

export default router;
