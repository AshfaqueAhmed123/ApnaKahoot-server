import mongoose,{Schema,model} from "mongoose";

const questionSchema = new Schema({
    parentQuiz:{
        type:Schema.Types.ObjectId,
        ref:"Quiz"
    },
    questionText:{
        type:String,
    },
    questionImage:{
        type:String,
    },
    answers:[{
        type:Schema.Types.ObjectId,
        ref:"Answer"
    }],
    questionTime:{
        type:Number,
        required:true
    },
    points:{
        type:Number,
        required:true
    }
},{
    timestamps:true
});

export const Question = model("Question",questionSchema);