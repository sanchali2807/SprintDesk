import Project from "../models/project.js";

export const createProject = async(req,res)=>{
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
        res.status(200).json({
            message : project
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message : err.message
        })
    }
}