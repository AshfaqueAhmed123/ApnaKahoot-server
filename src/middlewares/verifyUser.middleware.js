import { ApiError,ACCESS_TOKEN_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken"
import { User } from "../models/exports.js";

export const verifyUser = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
            return res.status(401).json(
                new ApiError(401, "Unauthorized request")
            )
        }
    
        const decodedToken = jwt.verify(token,ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            return res.status(401).json(
                new ApiError(401, "invalid access token")
            )
        }
    
        req.user = user;
        next()
    } catch (error) {
        return res.status(401).json(
            new ApiError(401, error?.message || "Invalid access token")
        )
    }
    
}