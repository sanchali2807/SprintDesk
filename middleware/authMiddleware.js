import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next)=>{
const authHeader = req.headers.authorization;
if(!authHeader){
    return res.status(404).json({message:"token is required"});
}
const token = authHeader.split(" ")[1];
try{
const decoded = jwt.verify(token,process.env.JWT_SECRET);
// now decoded contains the payload 
// req.user = the authenticated user's information attached to the request object so routes can access it.
req.user = decoded;
next();
}catch(err){
    return res.status(500).json({
        message : "invalid token"
    })
}

}