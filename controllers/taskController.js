import Task from "../models/task.js";
import ProjectMember from "../models/ProjectMember.js";
import User from "../models/userModel.js";
export const createTask = async(req,res)=>{
try{
    const {title,description,projectId,assignedTo,priority,dueDate} = req.body;
    const userId = req.user.id;//the one assigning
    const role = req.user.role;
    console.log("userId:", userId);
console.log("projectId:", projectId);
    const member = await ProjectMember.findOne({
        where : {userId,projectId}
    });
    
    if(!member){
        return res.status(400).json({
            message : "You does not belong to the project group"
        })
    }
    if(role !== "Manager"){
        return res.status(403).json({
            message : "Not authorized"
        })
    }
    // 2. assigned user belongs to project
const assignedMember = await ProjectMember.findOne({
    where: { userId: assignedTo, projectId }
});
if (!assignedMember) {
    return res.status(400).json({
        message: "Assigned user is not part of this project"
    });
}
if(assignedMember.role !== "Member"){
    return res.status(400).json({
        message : "only member can be assigned"
    })
}

const existing = await Task.findOne({
    where: {title,projectId}
})
if(existing){
    return res.status(400).json({message : "Task with same title already exists in this project"})
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
    return res.status(200).json({
        message : "task created and assigned",
    task})

}catch(err){
    return res.status(500).json(err.message);
}
}


export const getTaskByProject = async(req,res)=>{
    try{
    const {projectId} = req.params;
    //only assigned user can see the task
    const member = await ProjectMember.findOne({
    where: { userId: req.user.id, projectId }
});

if (!member) {
    return res.status(403).json({
        message: "Access denied"
    });
}
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
        const user = req.user;
        // const userId = req.user.id;
        const task = await Task.findByPk(id);
        //task check
        if(!task){
            return res.status(400).json({
                message : "task not found!!"
            })
        }
        //role check
        if(user.role !== "Manager" && user.role !== "Admin"){
             return res.status(403).json({ message: "Not authorized" });
        }
        //extract allowed to update fields
         const { title, description, priority, assignedTo } = req.body;
         const updatedFields = {};
         if(title !== undefined) updatedFields.title = title;
         if(description!== undefined) updatedFields.description = description;
         if(priority !== undefined) updatedFields.priority = priority;
         if(assignedTo !== undefined) updatedFields.assignedTo = assignedTo;

         // validate user part of the project
         if(assignedTo !== undefined){
            const assignedUser = await User.findByPk(assignedTo);
            if(!assignedUser){
                return res.status(400).json({
                    message : "user not found"
                })
            }
            const isMember = await ProjectMember.findOne({
                where : {
                    userId : assignedTo,
                    projectId : task.projectId
                }
            });
            if(!isMember){
                return res.status(400).json({
                    message : "user not part of the project"   
                })
            }

         }
         if (Object.keys(updatedFields).length === 0) {
    return res.status(400).json({
        message: "No valid fields provided for update"
    });
}
         await task.update(updatedFields);
         return res.status(200).json({
            message : "Updated Successfully",
            task
         })

    }catch(err){
        return res.status(500).json(err.message);
    }
}

export const updateStatus = async(req,res)=>{
    const {id} = req.params;
    const {status} = req.body;
    const user = req.user;
    const task = await Task.findByPk(id);
    if(!task){
        return res.status(400).json({
            message : "task not found"
        })
    }

    const statusArr = ["todo","in-progress","done"];
    if(!statusArr.includes(status)){
        return res.status(400).json({
            message : "Invalid status value"
        })
    }
    task.status = status;
    await task.save();
    return res.status(200).json({
        message : "Status Updated"
    })
    // if(status !== )

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