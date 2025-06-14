import {Schema,model} from "mongoose"

const playerSchema = new Schema({
    nickname:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    quiz:{
        type:Schema.Types.ObjectId,
        ref:"Quiz"
    },
},{
    timestamps:true
})

export const Player = model("Player", playerSchema);