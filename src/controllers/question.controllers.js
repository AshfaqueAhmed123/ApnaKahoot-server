import {Question} from "../models/exports.js"
import {ApiError,ApiResponse} from "../config/config.js"

const create = async (req,res) => {
    try {
        const {parentQuiz,questionText,answers,correctAnswer,questionTime,points} = req.body;
        if([parentQuiz,questionText,answers,questionTime,points].some((field)=> field === "")){
            return res.status(400).json(
                new ApiError(400,"all fields are required")
            )
        }
        const question = await Question.create({
            parentQuiz,
            questionText,
            answers,
            questionTime,
            points
        })
        if(!question){
            return res.status(500).json(
                new ApiError(500,"something went wrong while creating question")
            )
        }
        return res.status(200).json(
            new ApiResponse(200,"question created", question)
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400,error?.message)
        )
    }
}

const fetchById = async (req, res) => {
    try {
        const questionId = req.params.questionId;
        if (!questionId) {
            return res.status(400).json(
                new ApiError(400, "questionId is required")
            )
        }
        const question = await Question.findById(questionId).populate("answers");
        if (!question) {
            return res.status(404).json(
                new ApiError(404, "question does not exists with this id")
            )
        }
        return res.status(200).json(
            new ApiResponse(200, "question fecthed", question)
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

const update = async (req,res) => {
    try {
        const questionId = req.params.questionId;
        const {questionText,answers,correctAnswer,questionTime,points} = req.body;
        if(!questionId || [questionText,answers,correctAnswer,questionTime,points].some((field)=>field === "")){
            return res.status(400).json(
                new ApiError(400,"all fields are required")
            )
        }
        const updated = await Question.findByIdAndUpdate(questionId,{
            $set:{
                questionText:questionText,
                answers:answers,
                correctAnswer:correctAnswer,
                questionTime:questionTime,
                points:points
            }
        })
        if(!updated){
            return res.status(500).json(
                new ApiError(500,"something went wrong while updating question")
            )
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                "question updated",
                updated
            )
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400,error?.message)
        )
    }
}

const remove = async (req, res) => {
    try {
        const questionId = req.params.questionId;
        if (!questionId) {
            return res.status(400).json(
                new ApiError(400, "questionId is required")
            )
        }
        const deleted = Question.findByIdAndDelete(questionId)
        if (!deleted) {
            return res.status(500).json(
                new ApiError(500, "something went wrong while deleting question")
            )
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                "quesstion deleted",
                deleted
            )
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

export {create,fetchById,update,remove}