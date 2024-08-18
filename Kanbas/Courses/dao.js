import model from "./model.js";

export const findAllCourses = () => model.find();

export const createCourse = (c) => model.create(c);

export const deleteCourse = (cId) => model.deleteOne({ _id: cId });

export const updateCourse = (cId, course) => model.updateOne({ _id: cId }, { $set: course });
