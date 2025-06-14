import {Schema,model} from "mongoose";

const liveQuizSchema = new Schema({
    quiz:{
        type:Schema.Types.ObjectId,
        ref:"Quiz"
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    PIN:{
        type:Number,
        required:true
    },
    players:[{
        type:Schema.Types.ObjectId,
        ref:"Player"
    }],
},{
    timestamps:true
});

export const LiveQuiz = model("LiveQuiz",liveQuizSchema);