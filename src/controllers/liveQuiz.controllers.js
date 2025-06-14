import {LiveQuiz} from "../models/exports.js"
import {ApiError,ApiResponse} from "../config/config.js"

const live = async (req,res) => {
    try {
        const {quiz,user} = req.body;
        if(!quiz || !user){
            return res.status(400).json(
                new ApiError(400,"quiz and user are required")
            )
        }
        const liveQuiz = await LiveQuiz.create({
            quiz,
            user,
            PIN:Math.floor(100000 + Math.random()*100000),
            players:[],
        })
        if(!liveQuiz){
            return res.status(500).json(
                new ApiError(500,"something went wrong")
            )
        }
        return res.status(200).json(
            new ApiResponse(200,"quiz is live now", liveQuiz)
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400,error?.message)
        )
    }
}

const remove = async (req,res) => {
    try {
        const liveQuizId = req.params.liveQuizId;
        if(!liveQuizId){
            return res.status(400).json(
                new ApiError(400,"quiz id is required")
            )
        }
        const deleted = await LiveQuiz.findByIdAndDelete(liveQuizId);
        if(!deleted){
            return res.status(500).json(
                new ApiError(500,"something went wrong deleting live quiz")
            )
        }
        return res.status(200).json(
            new ApiResponse(200,"quiz is unlive now", deleted)
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400,error?.message)
        )
    }
}

const fetchById = async (req,res) => {
    try {
        const liveQuizId = req.params.liveQuizId;
        if(!liveQuizId){
            return res.status(400).json(
                new ApiError(400,"quiz id is required")
            )
        }
        const quiz = await LiveQuiz.findById(liveQuizId);
        if(!quiz){
            return res.status(500).json(
                new ApiError(500,"something went wrong fetching live quiz")
            )
        }
        return res.status(200).json(
            new ApiResponse(200,"quiz fetched", quiz)
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400,error?.message)
        )
    }
}

export {live,remove,fetchById}