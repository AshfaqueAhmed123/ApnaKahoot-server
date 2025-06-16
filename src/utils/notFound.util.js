import {ApiError} from "../config/config.js"

const handleNotFound = async (req,res,next) => {
    try {
        return res.status(404).json(
            new ApiError(404,"Sorry! this page does not exists!")
        )
    } catch (error) {
        return res.status(error?.status || 400).json(
            new ApiError(error?.status || 400, error?.message)
        )
    }finally{
        next()
    }
}

export {handleNotFound}