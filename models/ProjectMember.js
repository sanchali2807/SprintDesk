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
  }
});
export default ProjectMember;