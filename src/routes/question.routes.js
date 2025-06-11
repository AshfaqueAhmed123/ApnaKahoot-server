import { Router } from "express";
import {createQuestion,fetchQuestionById,updateQuestion,removeQuestion} from "../controllers/exports.js"

const router = Router();

router.route("/").post(createQuestion);
router.route("/questionId").get(fetchQuestionById).patch(updateQuestion).delete(removeQuestion)

export {router}
