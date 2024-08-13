//Users/sophiawang/2024/summer/webdev/su2/kanbas-node-server-app/Kanbas/Modules/dao.js
import model from "./model.js";

export const createModule = (module) => {
    return model.create(module);
  };

export const findModulesForCourse = (courseId) => {
    return model.find({ course: courseId });
  };
  
  export const updateModule = (moduleId, updatedModule) => {
    return model.updateOne({ _id: moduleId }, { $set: updatedModule });
  };
  
  export const deleteModule = (moduleId) => {
    return model.deleteOne({ _id: moduleId });
  };