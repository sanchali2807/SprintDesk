import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next)=>{
const authHeader = req.headers.authorization;
if(!authHeader){
    return res.status(401).json({message:"token is required"});
}
const token = authHeader.split(" ")[1];
try{
const decoded = jwt.verify(token,process.env.JWT_SECRET);
// now decoded contains the payload 
// req.user = the authenticated user's information attached to the request object so routes can access it.
req.user = decoded;
next();
}catch(err){
    return res.status(401).json({
        message : "invalid token"
    })
}

}
//401 for invalid token
//403 for unauthorised role
export const verifyAdmin = (req,res,next)=>{
    console.log("decoded token", req.user);
    if(req.user.role !== "Admin"){
        return res.status(403).json({
            message : "admin access required"
        })
    }
    next();
}

export const verifyManager = (req,res,next)=>{
    console.log(req.user);
    if(req.user.role!=="Manager"){
        return res.status(403).json({
            message:"manager or admin access required"
        })
    }
    next();
}

// ...authorizeRole => expects unlimited no of arguements and then converts them in an array 
export const authorizeRole = (...allowedRole) =>{
    return (req,res,next)=>{
        if(!allowedRole.includes(req.user.role)){
            return res.status(403).json({
                message : "Access Denied"
            })
        }
        next();
    }
}