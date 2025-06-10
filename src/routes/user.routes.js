import express from "express"
import {register,login,logout,changePassword,updateAccount,refreshAccessToken} from "../controllers/exports.js"
import {verifyUser} from "../middlewares/exports.js"

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(verifyUser,logout);
router.route("/change-password").patch(verifyUser,changePassword)
router.route("/update-account").patch(verifyUser,updateAccount)
router.route("/refresh-token").post(refreshAccessToken)

export {router};