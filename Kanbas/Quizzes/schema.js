import mongoose from 'mongoose';

// Schema for choices within a question
const ChoiceSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

// Schema for individual questions within a quiz
const QuestionSchema = new mongoose.Schema({
  type: { type: String, required: true },  // 'Multiple Choice', 'True/False', etc.
  title: { type: String, required: true }, // Title of the question
  content: { type: String, required: true }, // The actual question text
  choices: [ChoiceSchema], // Array of choices (for multiple choice questions)
  points: { type: Number, required: true }, // Points assigned to the question
});

// Schema for storing user responses to a quiz
const ResponseSchema = new mongoose.Schema({
  userId: { type: String, required: true },  // Assume some user identification
  answers: [{
    questionId: mongoose.Schema.Types.ObjectId,  // Reference to a specific question
    answer: { type: mongoose.Schema.Types.Mixed, required: true },  // Could be a string, boolean, array, etc.
  }],
  score: { type: Number, required: true },  // Store the score for this attempt
  attemptDate: { type: Date, default: Date.now },
});

// Main quiz schema
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
    questions: [QuestionSchema],  // New field to store an array of questions
    responses: [ResponseSchema],  // New field to store user responses
}, { collection: 'quizzes' });

export default quizSchema;
