import {register,login,logout,changePassword,updateAccount,refreshAccessToken} from "./user.controllers.js"

import {create as createQuiz, remove as deleteQuiz, update as updateQuiz, fetchQuizById} from "./quiz.controllers.js"

import {create as createQuestion,fetchById as fetchQuestionById,update as updateQuestion,remove as removeQuestion} from "./question.controllers.js"

import {create as createAnswer, fetchById as fetchAnswerById, update as updateAnswer, remove as removeAnswer} from "./answer.controllers.js"

import {live as liveQuiz, remove as removeLiveQuiz, fetchById as fetchLiveQuizById} from "./liveQuiz.controllers.js"

import {join as joinPlayer, remove as removePlayer} from "./player.controllers.js"

export {
    // user
    register,login,logout,changePassword,updateAccount,refreshAccessToken,
    // quiz
    createQuiz,deleteQuiz,updateQuiz,fetchQuizById,
    // question
    createQuestion,fetchQuestionById,updateQuestion,removeQuestion,
    // Answer
    createAnswer,fetchAnswerById,updateAnswer,removeAnswer,
    // live Quiz
    liveQuiz,removeLiveQuiz,fetchLiveQuizById,
    // player
    joinPlayer,removePlayer
}