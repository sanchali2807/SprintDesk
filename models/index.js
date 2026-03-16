// a project is created by a user 

import User from "./userModel.js";
import Project from "./project.js";

User.hasMany(Project,{foreignKey:"createdBy"});
// The foreignKey: "createdBy" means the Project table will store the user ID in a column called createdBy.
Project.BelongsTo(User,{foreignKey:"createdBy"});
