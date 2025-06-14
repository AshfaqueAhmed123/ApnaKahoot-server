import { Router } from "express";
import {createQuiz,deleteQuiz,updateQuiz,fetchQuizById} from "../controllers/exports.js"
import {verifyUser} from "../middlewares/exports.js"

const router = Router();

router.route("/:userId/create").post(createQuiz)
router.route("/:quizId").delete(deleteQuiz).patch(updateQuiz).get(fetchQuizById)

export {router}