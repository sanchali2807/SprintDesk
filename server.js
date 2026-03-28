import app from './app.js'
import dotenv from "dotenv";
dotenv.config();
import {connectDB} from "./config/database.js";
import {sequelize} from "./config/database.js";
import createAdmin from './config/createAdmin.js';
// import User from "./models/userModel.js";
const startServer= async()=>{
    try{
        await connectDB();
        await sequelize.sync({alter:true});
        await createAdmin();
        const PORT = process.env.PORT;
    app.listen(PORT,()=>{
        console.log(`server connected ${PORT}`);
})

    }catch(err){
        console.log("Server setup failed");
        process.exit(1);
    }
}
startServer();