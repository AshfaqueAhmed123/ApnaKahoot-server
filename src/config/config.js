import dotenv from "dotenv"
dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;
const CORS_ORIGIN = process.env.CORS_ORIGIN;


import {ApiError} from "../utils/ApiError.util.js"
import {ApiResponse} from "../utils/ApiResponse.util.js"

export {
    PORT,MONGODB_URI,DB_NAME,CORS_ORIGIN,
    ApiError,ApiResponse
}