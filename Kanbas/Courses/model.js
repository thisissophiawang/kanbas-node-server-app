// Kanbas/Quizzes/model.js
import mongoose from 'mongoose';
import coursesSchema from './schema.js';

const CoursesModel = mongoose.model('Courses', coursesSchema);

export default CoursesModel;
