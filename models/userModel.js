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
    }
});

export default User;