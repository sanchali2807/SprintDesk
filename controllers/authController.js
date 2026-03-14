import { hash } from "bcrypt";
import User from "../models/userModel.js";
import becrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async(req,res)=>{
    try{
        const {name ,password,role} = req.body;
// wihtout deconstructing need to write like this
// const name = req.body.name;
// const password = req.body.password;
// const role = req.body.role;

// check if user already exists
if(role == "admin"){
    return res.status(404).json({message:"admin cannot be registered"});
}
const existingUser = await User.findOne({where : {name}});
if(existingUser){
    return res.status(400).json({message:"User already exists"});
}
// hash password
const hashedPassword = await becrypt.hash(password,10);
const user = await User.create({
    name,
    password: hashedPassword,
    role:role,
    status:"pending"
});
res.status(201).json({
    message:"user registered , pending admin approval",
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
            return res.status(404).json({message: "User not found!"});
        }
        if(user.status !== "approved"){
            return res.status(403).json({message:"pending admin approval"});
        }
        const isMatch = await becrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(404).json({message:"passwords do not match"});
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


// admin approved user
export const approveUser = async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findByPk(id);
        if(!user){
            return res.status(400).json({message:"user does not exist"});
        }
        user.status = "approved";
        res.json({
            message:"User approved successfully",
            user
        });

    }catch(err){
        res.status(500).json({message:err.message});
    }
}