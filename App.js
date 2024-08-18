//app.js
import express from 'express';
import cors from 'cors';
import Hello from './hello.js';
import Lab5 from './Lab5/index.js';
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from './Kanbas/Modules/routes.js';  //with Mongoose and MongoDB
import AssignementRoutes from './Kanbas/Assignments/routes.js';
import "dotenv/config";
import UserRoutes from "./Users/routes.js";
import session from "express-session";
import QuizRoutes from "./Kanbas/Quizzes/routes.js"; // Correct path

// Mongoose
import mongoose from 'mongoose';

//change from local to remote server
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/Kanbas";
//const CONNECTION_STRING = "mongodb://127.0.0.1:27017/Kanbas";

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

console.log(process.env.MONGO_CONNECTION_STRING);
console.log(process.env.NETLIFY_URL);
console.log(process.env.REMOTE_SERVER);

//importing the routes
const app = express();
app.use(cors({
  credentials: true,
  origin: process.env.NETLIFY_URL || "http://localhost:3000",
})
);

app.use(express.json());
//run locally
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
//run on remote server
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));



Hello(app);
Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignementRoutes(app);
UserRoutes(app); //connect the UserRoutes to the app
QuizRoutes(app); //connect the QuizRoutes to the app



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
