import {register,login,logout,changePassword,updateAccount,refreshAccessToken} from "./user.controllers.js"

import {create as createQuiz, remove as deleteQuiz, update as updateQuiz, fetchQuizById} from "./quiz.controllers.js"

import {create as createQuestion,fetchById as fetchQuestionById,update as updateQuestion,remove as removeQuestion} from "./question.controllers.js"

import {create as createAnswer, fetchById as fetchAnswerById, update as updateAnswer, remove as removeAnswer} from "./answer.controllers.js"

export {
    // user
    register,login,logout,changePassword,updateAccount,refreshAccessToken,
    // quiz
    createQuiz,deleteQuiz,updateQuiz,fetchQuizById,
    // question
    createQuestion,fetchQuestionById,updateQuestion,removeQuestion,
    // Answer
    createAnswer,fetchAnswerById,updateAnswer,removeAnswer
}