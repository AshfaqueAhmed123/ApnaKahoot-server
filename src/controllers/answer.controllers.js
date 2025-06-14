import {Answer} from "../models/exports.js"
import {ApiError,ApiResponse} from "../config/config.js"

const create = async (req,res) => {
    try {
        const { question, answerText, isCorrect, points } = req.body;
        if ([question, answerText, isCorrect].some((field) => field === "")) {
            return res.status(400).json(
                new ApiError(400, "all fields are required")
            )
        }
        // TODO : also get asnwerImage from user and add that to the answer document
        const answer = await Answer.create({
            question,
            answerText,
            isCorrect,
            points
        })
        if (!answer) {
            return res.status(500).json(
                new ApiError(500, "something went wrong while creating asnwer")
            )
        }
        return res.status(200).json(
            new ApiResponse(200, "answer created", answer)
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400,error?.message)
        )
    }
}

const fetchById = async (req,res) => {
    try {
        const answerId = req.params.answerId;
        if (!answerId) {
            return res.status(400).json(
                new ApiError(400, "answerId is required")
            )
        }
        const answer = await Answer.findById(answerId);
        if (!answer) {
            return res.status(404).json(
                new ApiError(404, "answer does not exists with this id")
            )
        }
        return res.status(200).json(
            new ApiResponse(200, "answer fecthed", answer)
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400,error?.message)
        )
    }
}

const update = async (req,res) => {
    try {
        // TODO : add answerImage in edit options 
        const answerId = req.params.answerId;
        const {answerText,isCorrect} = req.body;
        if(!answerId || !answerText || !isCorrect){
            return res.status(400).json(
                new ApiError(400,"all fields are required")
            )
        }
        const updated = await Answer.findByIdAndUpdate(answerId,
            {
                $set: {
                    answerText : answerText,
                    isCorrect : isCorrect
                }
            },
            { new: true }
        )

        if(!updated){
            return res.status(500).json(
                new ApiError(500,"something went wrong while updating answer")
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                "answer updated",
                updated
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
        const answerId = req.params.answerId;
        if (!answerId) {
            return res.status(400).json(
                new ApiError(400, "answerId is required")
            )
        }
        const deleted = Answer.findByIdAndDelete(answerId)
        if (!deleted) {
            return res.status(500).json(
                new ApiError(500, "something went wrong while deleting asnwer")
            )
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                "answer deleted",
                deleted
            )
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400,error?.message)
        )
    }
}


export {create,fetchById,update,remove}