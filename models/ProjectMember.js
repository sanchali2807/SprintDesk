import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const ProjectMember = sequelize.define("ProjectMember",{
    userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  role: {
    type:DataTypes.ENUM("Manager","Member"),
    allowNull:false,
    defaultValue:"Member"
  }
});
export default ProjectMember;