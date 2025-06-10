import {register,login,logout,changePassword,updateAccount,refreshAccessToken} from "./user.controllers.js"

import {create as createQuiz, remove as deleteQuiz} from "./quiz.controllers.js"

export {
    // user
    register,login,logout,changePassword,updateAccount,refreshAccessToken,
    // quiz
    createQuiz,deleteQuiz
}