import express from 'express';
import cors from 'cors';
import Hello from './hello.js';
import Lab5 from './Lab5/index.js';
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignementRoutes from './Kanbas/Assignments/routes.js';
import "dotenv/config";
import UserRoutes from "./Users/routes.js";

import mongoose from 'mongoose';

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";

// Mongoose connection listeners
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ' + CONNECTION_STRING);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Connect to MongoDB
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors());
app.use(express.json());

Hello(app);
Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignementRoutes(app);
UserRoutes(app); // configure UserRoutes

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
