//Users/sophiawang/2024/summer/webdev/su2/kanbas-node-server-app/Users/model.js
import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("UserModel", schema);
export default model;
