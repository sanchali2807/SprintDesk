import Task from "../models/task.js";
import ProjectMember from "../models/ProjectMember.js";
import User from "../models/userModel.js";
export const createTask = async(req,res)=>{
try{
    const {title,description,projectId,assignedTo,priority,dueDate} = req.body;
    const userId = req.user.id;//the one assining
    const member = await ProjectMember.findOne({
        where : {userId,projectId}
    });
    
    if(!member){
        return res.status(400).json({
            message : "member does not belong to the project group"
        })
    }
    const task = await Task.create({
        title,
        description,
        projectId,
        assignedTo,
        priority,
        dueDate,
        createdBy:userId
    });
    res.status(200).json({message : `task create and assigned to ${assignedTo}`}),
    task;

}catch(err){
    return res.status(500).json(err.message);
}
}


export const getTaskByProject = async(req,res)=>{
    try{
    const {projectId} = req.params;
    const tasks = await Task.findAll({
        where : {projectId},
        include : [
            {
            model : User,
            as : "assignedUser",
            attributes: ["id","name","role"]
        }, 
        {
            model : User,
            as : "createdBy",
            attributes: ["id","name","role"]
        }
        ]
    })
    res.json(tasks);
}catch(err){
    return res.status(500).json(err.message);
}

}

export const updateTask = async(req,res)=>{
    try{
        const {id} = req.params;
        const userId = req.user.id;
        const task = await Task.findByPk(id);
        if(!task){
            return res.status(400).json({
                message : "task not found!!"
            })
        }
        // only assigned user or creator can update
        // we did && because if even one is false we will not get error
        if(task.assignedTo !== "userId" && task.createdBy !== "userId"){
            return res.status(403).json({ message: "Not authorized" });}
            await task.update(req.body);
            res.json(task);
    }catch(err){
        return res.status(500).json(err.message);
    }
}


export const deleteTask = async(req,res)=>{
    try{
    const {id} = req.params;
    const userId = req.user.id;
    const task = await Task.findByPk(id);
    if(!task){
        return res.status(400).json({
                message : "task not found!!"
            })
    }
    if(task.assignedTo!==userId && task.createdBy !== userId){
        return res.status(403).json({ message: "Not authorized" });}
        await task.destroy();
        res.json({message : "task deleted"});
        
}catch(err){
return res.status(500).json(err.message);
}
}