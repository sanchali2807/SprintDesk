import {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host:"localhost",
        dialect:"mysql"
    }
);

export const connectDB = async()=>{
    try{
        await sequelize.authenticate();
        console.log("database connected");
    }catch(err){
        console.log(error,"DB error");
    }
}
