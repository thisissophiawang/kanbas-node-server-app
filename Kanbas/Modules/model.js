//Users/sophiawang/2024/summer/webdev/su2/kanbas-node-server-app/Kanbas/Modules/model.js

import mongoose from "mongoose";
import schema from "./schema.js";
const Modulemodel = mongoose.model("ModuleModel", schema);
export default Modulemodel;