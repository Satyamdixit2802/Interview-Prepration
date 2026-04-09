import mongoose from "mongoose";

const blackListTokenSchema = new mongoose.Schema({
    token : {
        type : String ,
        required : [true, "token is required to add into blacklist"]
    }
},{timestamps : true})

export const TokenBlackList = mongoose.model("TokenBlackList",blackListTokenSchema);