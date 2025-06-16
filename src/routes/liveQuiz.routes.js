import { Router } from "express"
import {verifyUser} from "../middlewares/exports.js"
import {liveQuiz,removeLiveQuiz,fetchLiveQuizById} from "../controllers/exports.js"

const router = Router();

router.route("/").post(liveQuiz)
router.route("/:liveQuizId").get(fetchLiveQuizById).delete(removeLiveQuiz)

export {router}