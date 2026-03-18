import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js"; 

const Task = sequelize.define("Task",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
      title: {
       type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },

  status: {
    type: DataTypes.ENUM("todo", "in-progress", "done"),
    defaultValue: "todo",
  },

  priority: {
    type: DataTypes.ENUM("low", "medium", "high"),
    defaultValue: "medium",
  },

  dueDate: {
    type: DataTypes.DATE,
  },

  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  assignedTo: {
    type: DataTypes.INTEGER, // userId
  },

  createdBy: {
    type: DataTypes.INTEGER,
  },
}) 
export default Task;