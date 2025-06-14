import { User } from "../models/exports.js";
import { ApiError, ApiResponse, uploadOnCloudinary } from "../config/config.js";
import jwt from "jsonwebtoken"

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        return new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const register = async (req, res) => {
    try {
        const { username, email, fullName, password } = req.body;
        if (
            [fullName, email, username, password].some(
                (field) => field === ""
            )
        ) {
            return res.status(400).json(
                new ApiError(400, "All fields are required")
            )
        }

        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (existedUser) {
            return res.status(409).json(
                new ApiError(409, "User with email or username already exists")
            )
        }

        // const profilePictureLocalPath = req.files?.profilePicture[0]?.path;

        // if (!profilePictureLocalPath) {
            // return res.status(400).json(
                // new ApiError(400, "profile picture file is required")
            // )
        // }

        // const profilePicture = await uploadOnCloudinary(profilePictureLocalPath)

        const user = await User.create({
            fullName,
            // profilePicture: profilePicture?.url || "",
            email,
            password,
            username: username?.toLowerCase()
        })


        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )

        if (!createdUser) {
            return res.status(500).json(
                new ApiError(500, "Something went wrong while registering the user")
            )
        }

        return res.status(201).json(
            new ApiResponse(200, "User registered Successfully", createdUser)
        )

    } catch (error) {
        return res
            .status(error?.status || 400)
            .json(new ApiError(error?.status || 400, error?.message));
    }
};

const login = async (req,res) => {    
    try {
        const { email, username, password } = req.body
        if (!username && !email) {
            return res.status(400).json(
                new ApiError(400, "username or email are required")
            )
        }
        if (!password) {
            return res.status(400).json(
                new ApiError(400, "password is required")
            )
        }
        const user = await User.findOne({
            $or: [{ username }, { email }]
        })
        if (!user) {
            return res.status(404).json(
                new ApiError(404, "User does not exist")
            )
        }
        const isPasswordValid = await user.isPasswordCorrect(password)

        if (!isPasswordValid) {
            return res.status(401).json(
                new ApiError(401, "Invalid user credentials")
            )
        }

        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        return res.status(200).json(
            new ApiResponse(
                200,
                "user loggged in sucesfully!",
                [loggedInUser, { "accessToken": accessToken }, { "refreshToken": refreshToken }]
            )
        )

    } catch (error) {
        return res.status(error?.status || 400).json(new ApiError(error?.status || 400, error?.message));
    }
}

const logout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1 // this removes the field from document
                }
            },
            {
                new: true
            }
        )
        return res.status(200).json(new ApiResponse(200, "User logged Out"))
    } catch (error) {
        return res
            .status(error?.status || 400)
            .json(new ApiError(error?.status || 400, error?.message));
    }
}

const changePassword = async (req,res) => {
    try {
        const { oldPassword, newPassword } = req.body



        const user = await User.findById(req.user?._id)
        const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

        if (!isPasswordCorrect) {
            return res.status(400).json(
                new ApiError(400, "Invalid old password")
            )
        }

        user.password = newPassword
        await user.save({ validateBeforeSave: false })

        return res
            .status(200)
            .json(new ApiResponse(200, "Password changed successfully"))
    } catch (error) {
        return res
            .status(error?.status || 400)
            .json(new ApiError(error?.status || 400, error?.message));
    }
}

const updateAccount = async (req,res) => {
    try {
        const { fullName, email } = req.body

        if (!fullName || !email) {
            return res.status(400).json(
                new ApiError(400, "All fields are required")
            )
        }

        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    fullName,
                    email: email
                }
            },
            { new: true }

        ).select("-password")

        return res
            .status(200)
            .json(new ApiResponse(200, "Account details updated successfully", user))
    } catch (error) {
        return res
            .status(error?.status || 400)
            .json(new ApiError(error?.status || 400, error?.message));
    }
}

const refreshAccessToken = async (req,res) => {
    try {
        const {refreshToken} = req.body
        if (!refreshToken) {
            return res.status(401).json(
                new ApiError(401, "unauthorized request")
            )
        }
        const decodedToken = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            return res.status(401).json(
                new ApiError(401, "Invalid refresh token")
            )
        }

        if (refreshToken !== user?.refreshToken) {
            return res.status(401).json(
                new ApiError(401, "Refresh token is expired or used")
            )

        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id)

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "Access token refreshed",
                    { accessToken, refreshToken: newRefreshToken }
                )
            )
    } catch (error) {
        return res
            .status(error?.status || 400)
            .json(new ApiError(error?.status || 400, error?.message));
    }
}

export { register, login, logout, changePassword, updateAccount, refreshAccessToken };
