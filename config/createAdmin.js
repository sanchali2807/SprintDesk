import User from "../models/userModel.js";
import bcrypt, { hash } from "bcrypt";

const createAdmin = async()=>{
    const admin = await User.findOne({
        where:{role:"admin"}
    })
    if(!admin){
        const hashedPassword = await bcrypt.hash("admin123",10);
        await User.create({
            name:"sanchali",
            password:hashedPassword,
            role:"admin",
            status:"approved"
        });
        console.log("admin created");

    }
}
export default createAdmin;