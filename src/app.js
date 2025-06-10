import express from "express";
import cors from "cors"
import {CORS_ORIGIN} from "./config/config.js"

const app = express();

app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))

export {app}