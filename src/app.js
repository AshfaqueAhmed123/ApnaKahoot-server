import express from "express";
import cors from "cors"
import { createServer } from "http";
import { Server } from "socket.io";
import {CORS_ORIGIN} from "./config/config.js"

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
    origin:"http://localhost:5173"
  }
 });

 // routes
app.get("/",(req,res)=>{
  res.json({msg:"app is running"})
})
import {userRouter} from "./routes/exports.js"
import {quizRouter} from "./routes/exports.js"
app.use("/api/v1/user", userRouter)
app.use("/api/v1/quiz", quizRouter)


// R/T stuff
io.on("connection", (socket) => {
  console.log(socket.id.slice(0,3))
});

export {httpServer}