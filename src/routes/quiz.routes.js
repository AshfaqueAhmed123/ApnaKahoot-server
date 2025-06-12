import { Router } from "express";
import {createQuiz,deleteQuiz,updateQuiz,fetchQuizById} from "../controllers/exports.js"
import {verifyUser} from "../middlewares/exports.js"

const router = Router();

router.route("/:userId/create").post(verifyUser,createQuiz)
router.route("/:quizId").delete(verifyUser,deleteQuiz).patch(verifyUser,updateQuiz).get(verifyUser,fetchQuizById)

export {router}