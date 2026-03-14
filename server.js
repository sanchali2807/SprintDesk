import app from './app.js'
import dotenv from "dotenv";
dotenv.config();
import {connectDB} from "./config/database.js";


const PORT = process.env.PORT;
connectDB();
app.listen(PORT,()=>{
    console.log(`server connected ${PORT}`);
})