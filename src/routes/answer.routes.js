import {Router} from "express"
import {verifyUser} from "../middlewares/exports.js"
import {createAnswer,fetchAnswerById,updateAnswer,removeAnswer} from "../controllers/exports.js"
import { remove } from "../controllers/quiz.controllers.js";

const router = Router();

router.route("/").post(createAnswer)
router.route("/:answerId").get(fetchAnswerById).patch(updateAnswer).delete(removeAnswer)

export {router};