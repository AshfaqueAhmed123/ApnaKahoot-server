import {Router} from "express"
import {verifyUser} from "../middlewares/exports.js"
import {createAnswer,fetchAnswerById,updateAnswer,removeAnswer} from "../controllers/exports.js"
import { remove } from "../controllers/quiz.controllers.js";

const router = Router();

router.route("/").post(verifyUser,createAnswer)
router.route("/:answerId").get(verifyUser,fetchAnswerById).patch(verifyUser,updateAnswer).delete(verifyUser,removeAnswer)

export default router;