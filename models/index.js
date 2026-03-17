// a project is created by a user 

// this tell how shemas are associated with each other 

import User from "./userModel.js";
import Project from "./project.js";
import ProjectMember from "./ProjectMember.js";
import Task from "./task.js";

//creater relationship
User.hasMany(Project,{foreignKey:"createdBy"});
// The foreignKey: "createdBy" means the Project table will store the user ID in a column called createdBy.
Project.belongsTo(User,{foreignKey:"createdBy"});


// Project membership relationship
User.belongsToMany(Project,{
    through:ProjectMember,
    foreignKey: "userId"
})

Project.belongsToMany(User,{
    through:ProjectMember,
    foreignKey:"projectId"
})


// task belong to project
Task.belongsTo(Project,{
    foreignKey:"projectId"
});
Project.hasMany(Task, { 
    foreignKey: "projectId"
 });

// task belongs to user
Task.belongsTo(User,{
    foreignKey:"assignedTo" ,as:"assignedUser"
});

Task.belongsTo(User, { 
    foreignKey: "createdBy", as: "creator"
 });