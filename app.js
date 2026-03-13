import express from 'express';
import cors from 'cors';


const app = express();

// allows rontend ruuning on different port to access your apis
app.use(cors());

// middleware to read json body send by the client 
app.use(express.json());

app.get("/",(req,res)=>{
    console.log("request recieved");
    res.send("JIRA");
})

export default app;
