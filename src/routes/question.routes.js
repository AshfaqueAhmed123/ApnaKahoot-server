import { Router } from "express";
import {verifyUser} from "../middlewares/exports.js"
import {createQuestion,fetchQuestionById,updateQuestion,removeQuestion} from "../controllers/exports.js"

const router = Router();

router.route("/").post(verifyUser,createQuestion);
router.route("/questionId").get(verifyUser,fetchQuestionById).patch(verifyUser,updateQuestion).delete(verifyUser,removeQuestion)

export {router}
