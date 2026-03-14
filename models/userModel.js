import {DataTypes} from "sequelize";
import {sequelize} from "../config/database.js";

const User = sequelize.define("User",{
    name : {
        type: DataTypes.STRING,
        allowedNull:false
    },
    password : {
        type: DataTypes.STRING,
        allowedNull:false
    },
    role:{
        type:DataTypes.ENUM("Admin","Manager","Member"),
        defaultValue:"member"
    },
    status:{
        type:DataTypes.ENUM("pending","approved","rejected"),
        defaultValue:"pending",
        // allowNull:true
    }
});

export default User;