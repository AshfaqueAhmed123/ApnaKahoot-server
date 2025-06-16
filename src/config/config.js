import dotenv from "dotenv"
dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const CLOUDINARY_CLOUD_NAME=process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY=process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET=process.env.CLOUDINARY_API_SECRET;
const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY=process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_SECRET=process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRY=process.env.REFRESH_TOKEN_EXPIRY;

import {ApiError} from "../utils/ApiError.util.js"
import {ApiResponse} from "../utils/ApiResponse.util.js"
import {uploadOnCloudinary} from "../utils/cloudinary.utils.js"
import {handleNotFound} from "../utils/notFound.util.js"

export {
    PORT,MONGODB_URI,DB_NAME,CORS_ORIGIN,handleNotFound,
    ApiError,ApiResponse,uploadOnCloudinary,
    CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,
    ACCESS_TOKEN_SECRET,ACCESS_TOKEN_EXPIRY,REFRESH_TOKEN_SECRET,REFRESH_TOKEN_EXPIRY
}