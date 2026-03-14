import { hash } from "bcrypt";
import User from "../models/userModel.js";
import becrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async(req,res)=>{
    try{
        const {name ,password,role} = req.body;
// wihtout deconstructong need to write like this
// const name = req.body.name;
// const password = req.body.password;
// const role = req.body.role;

// check if user already exists
const existingUser = await User.findOne({where : {name}});
if(existingUser){
    return res.status.send(400).json({message:"User already exists"});
}
// hash password
const hashedPassword = await becrypt.hash(password,10);
const user = await User.create({
    name,
    password: hashedPassword,
    role
});
res.status(201).json({
    message:"user registered",
    user
});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}


export const loginUser = async(req,res)=>{
    try{
        const {name,password} = req.body;
        const user = await User.findOne({
            where :{name}
        });
        if(!user){
            res.status(404).json({message: "User not found!"});
        }
        const isMatch = await becrypt.compare(password,user.password);
        if(!isMatch){
            res.status(404).json("passwords do not match");
        }
        // create a new jwt token
        const token = jwt.sign(
            {
                //data stored inside the token
            id : user.id,
            role : user.role
            },
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
    );
    res.json({
        message:"login successfull",
        token
    })
    }catch(err){
        res.status(500).json({error:err.message});
    }
}