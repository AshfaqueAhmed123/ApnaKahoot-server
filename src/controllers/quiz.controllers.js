import {Quiz} from "../models/quiz.model.js"
import {ApiError,ApiResponse} from "../config/config.js"

const create = async (req,res) => {
    try {
        const userId = req.params.userId;
        const {title,description,questions} = req.body;
        if(!userId || !title || !questions){
            return res.status(400).json(
                new ApiError(400,"userId, title and questions are required")
            )
        }
        const quizExixts = await Quiz.findOne({
            $and : [{title}, {owner:userId}]
        });
        if(quizExixts){
            return res.status(400).json(
                new ApiError(400,"quiz with same title already exists")
            )
        }
        const quiz = await Quiz.create({
            title,
            description,
            // previewImage,
            // backgroundImage,
            questions,
            owner : userId,
            isLive : false,
            isParticipatingAllowed : false,
        })
        if(!quiz){
            return res.status(500).json(
                new ApiResponse(500,"something went wrong while creating quiz.")
            )
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                "quiz created sucessfully!",
                quiz
            )
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400,error?.message)
        )
    }
}

const remove = async (req,res) => {
    try {
        const quizId = req.params.quizId;
        if(!quizId){
            return res.status(400).json(
                new ApiError(400,"quizId is required")
            )
        }
        const deleted = Quiz.findByIdAndDelete(quizId)
        if(!deleted){
            return res.status(500).json(
                new ApiError(500,"something went wrong while deleting quiz")
            )
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                "quiz deleted",
                deleted
            )
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400,error?.message)
        )
    }
}

const update = async (req,res) => {
    try {
        const quizId = req.params.quizId;
        // TODO: add background and preview images edit options 
        const {title,description,questions} = req.body;
        if(!quizId || [title,description,questions].some((field)=>field === "")){
            return res.status(400).json(
                new ApiError(400,"all fields are required")
            )
        }
        const updated = await Quiz.findByIdAndUpdate(quizId,{
            $set:{
                title:title,
                description:description,
                questions:questions
            }
        })
        if(!updated){
            return res.status(500).json(
                new ApiError(500,"something went wrong while updating quiz")
            )
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                "quiz updated",
                updated
            )
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400,error?.message)
        )
    }
}

const fetchQuizById = async(req,res) => {
    try {
        const quizId = req.params.quizId;
        if(!quizId){
            return res.status(400).json(
                new ApiError(400,"quizId is required")
            )
        }
        const quiz = await Quiz.findById(quizId).populate("questions");
        if(!quiz){
            return res.status(404).json(
                new ApiError(404,"quiz does not exists with this id")
            )
        }
        return res.status(200).json(
            new ApiResponse(200,"quiz fecthed", quiz)
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400,error?.message)
        )
    }
}

export {create,remove,update,fetchQuizById}