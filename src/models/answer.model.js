import mongoose, { model, Schema } from "mongoose";

const answerSchema = new Schema({
    question:{
        type:Schema.Types.ObjectId,
        ref:"Question"
    },
    answerText:{
        type:String,
        required:true
    },
    answerImage:{
        type:String // cloudinary string
    },
    isCorrect:{
        type:Boolean,
        required:true
    },
    points:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

export const Answer = model("Answer",answerSchema)