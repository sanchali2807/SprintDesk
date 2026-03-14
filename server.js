import app from './app.js'
import dotenv from "dotenv";
dotenv.config();
import {connectDB} from "./config/database.js";
import {sequelize} from "./config/database.js";
import createAdmin from './config/createAdmin.js';
// import User from "./models/userModel.js";
const PORT = process.env.PORT;
connectDB();
await sequelize.sync({alter:true});
await createAdmin();
app.listen(PORT,()=>{
    console.log(`server connected ${PORT}`);
})