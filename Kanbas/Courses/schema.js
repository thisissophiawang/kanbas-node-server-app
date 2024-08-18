import mongoose from 'mongoose';

// Main quiz schema
const coursesSchema = new mongoose.Schema({
    id: { type: String, unique: true, default: new Date().getTime().toString() },
    name: { type: String },
    number: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    department: { type: String },
    credits: { type: Number },
    description: { type: String },
    image: { type: String },
}, { collection: 'courses' });

export default coursesSchema;
