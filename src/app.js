import express from "express";
import cors from "cors"
import { createServer } from "http";
import { Server } from "socket.io";
import {CORS_ORIGIN,handleNotFound} from "./config/config.js"

const app = express();

app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))

const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors:{
    origin:CORS_ORIGIN
  }
 });

 // routes
app.get("/",(req,res)=>{
  res.json({msg:"app is running"})
})
import {userRouter,quizRouter,questionRouter,answerRouter} from "./routes/exports.js"
app.use("/api/v1/user", userRouter)
app.use("/api/v1/quiz", quizRouter)
app.use("/api/v1/question", questionRouter)
app.use("/api/v1/answer",answerRouter)

app.use(handleNotFound)

export {httpServer, io}