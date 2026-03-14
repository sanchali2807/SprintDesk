import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/authRoutes.js";

const app = express();

// allows rontend ruuning on different port to access your apis
app.use(cors());
app.use(express.json());
app.use("/auth",authRoutes);
// middleware to read json body send by the client 

app.get("/",(req,res)=>{
    console.log("request recieved");
    res.send("JIRA");
})

export default app;
