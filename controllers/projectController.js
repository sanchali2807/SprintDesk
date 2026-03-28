import Project from "../models/project.js";
import ProjectMember from "../models/ProjectMember.js";
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
        },{transaction : t})
         // ✅ 2. AUTO-ADD creator (manager) to project
        await ProjectMember.create({
            userId: req.user.id,
            projectId: project.id,
            role : "Manager"
        }, {transaction : t});

        await t.commit();
        res.status(200).json({
            message : "project created successfully",
            project
        })
    }catch(err){
        await t.rollback();
        return res.status(500).json({
            message : err.message
        })
    }
}


// //🔥 Transaction
// Guarantees:
// Project + Member = always consisten
// if error occurs on creating project member wihtout tramsaction the project will have already been formed and this will cause db in consistency