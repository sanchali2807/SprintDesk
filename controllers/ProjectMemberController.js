import ProjectMember from "../models/ProjectMember.js";
import User from "../models/userModel.js";
import Project from "../models/project.js";

export const addProjectMember = async(req,res)=>{
    try{
        console.log("ADD MEMBER CONTROLLER HIT");
    const {userId,projectId} = req.body;
        // check user
        const user = await User.findByPk(userId);
        if(!user){
            return res.status(400).json({
                message:"user not found"
            })
        }
        // check project
        const project = await Project.findByPk(projectId);
    if(!project){
      return res.status(404).json({message:"Project not found"})
    }
console.log("BODY:", req.body);
console.log("USER FOUND:", user);
console.log("PROJECT FOUND:", project);
console.log("ROLE:", user?.role);
    //check for member or admin assign
    if(user.role!=="Member"&& user.role !== "Manager"){
        return res.status(400).json({
            message:"Only member can be assigned"
        })
    }
    if(user.status == "rejected"){
        return res.status(400).json({
            message:"Not authorised"
        })
    }

    //for duplicates
     const existing = await ProjectMember.findOne({
      where:{ userId, projectId }
    });
console.log("EXISTING MEMBER:", existing);
    if(existing){
      return res.status(400).json({
        message:"User already part of this project"
      });
    }
    // const role = await
    const member = await ProjectMember.create({
        userId,
        projectId
    })
    return res.status(200).json({
        message:"Project has been assigned",
        data :member
    })}
    catch(err){
        return res.status(500).json(err.message);
    }
};