//Users/sophiawang/2024/summer/webdev/su2/kanbas-node-server-app/Kanbas/Quizzes/schema.js
import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    course: { type: String },
    status: { type: String },
    dueDate: { type: Date },
    availableDate: { type: Date },
    untilDate: { type: Date },
    points: { type: Number },
    questionsCount: { type: Number },
    multipleDates: { type: Boolean },
    published: { type: Boolean },
    type: { type: String },
}, { collection: 'quizzes' });

export default quizSchema;
