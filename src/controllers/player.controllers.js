import {Player} from "../models/exports.js"
import {ApiError,ApiResponse} from "../config/config.js"

const join = async (req,res) => {
    try {
        const {nickname,avatar,quiz} = req.body;
        if(!nickname || !quiz){
            return res.status(400).json(
                new ApiError(400,"nickname and quiz are required")
            )
        }
        const player = await Player.create({
            nickname,avatar,quiz
        })
        if(!player){
            return res.status(500).json(
                new ApiError(500,"something went wrong joining player")
            )
        }
        return res.status(200).json(
            new ApiResponse(200,"player joined", player)
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

const remove = async (req,res) => {
    try {
        const playerId = req.params.playerId;
        if(!playerId){
            return res.status(400).json(
                new ApiError(400,"playerId is required")
            )
        }
        const deletedPlayer = await Player.findByIdAndDelete(playerId)
        if(!deletedPlayer){
            return res.status(500).json(
                new ApiError(500, "unable to delete player either playerId is incorrect or something else is wrong")
            )
        }
        return res.status(200).json(
            new ApiResponse(200, "player removed", deletedPlayer)
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }
}

export {join,remove}