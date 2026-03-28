import { Transaction } from "sequelize";
import Project from "../models/project.js";
import { sequelize } from "../config/database.js";

export const createProject = async(req,res)=>{
    const t = await sequelize.transaction();
    try{
        const {name,description} = req.body;
         console.log("BODY:", req.body);
    console.log("USER:", req.user);
        const project = await Project.create({
            name,
            description,
            createdBy : req.user.id
            // req.user.id is the id of the user currently logged in 
            // req.user have the payload of the token that was passed
        })
         // ✅ 2. AUTO-ADD creator (manager) to project
        await ProjectMember.create({
            userId: req.user.id,
            projectId: project.id,
            role : "Manager"
        }, {transaction : t});

        await t.commit();
        res.status(200).json({
            message : project
        })
    }catch(err){
        await t.rollback();
        console.log(err);
        return res.status(500).json({
            message : err.message
        })
    }
}