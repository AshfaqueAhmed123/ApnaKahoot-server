import mongoose,{Schema,model} from "mongoose"

const quizSchema = new Schema({
    PIN:{
        type:Number,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    previewImage:{
        type:String // cloudinary url
    },
    backgroundImage:{
        type:String // cloudinary url
    },
    questions:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Question",
        required:true
    }],
    owner:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User",
        required:true
    },
    isLive:{
        type:Boolean,
        required:true,
    },
    isParticipatingAllowed:{
        type:Boolean,
        required:true,
    },
    participatants:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Participatant"
    }],
},{
    timestamps:true
})

export const Quiz = model("Quiz", quizSchema)
