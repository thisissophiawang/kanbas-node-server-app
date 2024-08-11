//Users/sophiawang/2024/summer/webdev/su2/kanbas-node-server-app/Users/dao.js
import model from "./model.js";
export const createUser = (user) => {} // implemented later
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>  model.findOne({ username: username });
export const findUserByCredentials = (username, password) => 
     model.findOne({ username, password });
export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i");
    // 'i' makes it case-insensitive
    return model.find({
      $or: [{ firstName: { $regex: regex } },{ lastName:  { $regex: regex } }],
    });
  };

export const findUsersByRole
    = (role) => model.find({ role: role }); //find all users with the given role
export const updateUser = (userId, user) =>  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });