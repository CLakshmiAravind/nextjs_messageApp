import mongoose, { Schema, Document } from "mongoose";


export interface Message extends Document {
    content: string,
    createdAt: Date,
}


const MessageScheme: Schema<Message> = new Schema({
    content: {
        required: true,
        type: String,
    },
    createdAt: {
        required: true,
        type: Date,
        default: Date.now
    }
})


export interface User extends Document {
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isAcceptingMessage: boolean,
    isVerified:boolean,
    messages: Message[]
}

const UserSchmea : Schema<User> = new Schema({
    username:{
        required:[ true,"UserName is required."],
        type: String,
        trim:true,
        unique:true
    },
    email:{
        required:[ true,"Email is required."],
        type: String,
        unique:true,
        match:[/.+\@.+\..+/,"Email is invalid."]
    },
    password:{
        required:[ true,"password is required."],
        type: String,
    },
    verifyCode:{
        required:[ true,"Verification code is required."],
        type:String
    },
    verifyCodeExpiry:{
        required:[ true,"Verification code Expiry is required."],
        type:Date
    },
    isAcceptingMessage:{
        required:true,
        type:Boolean,
        default: true
    },
    isVerified:{
        required:[ true,"isVerfied is required."],
        type:Boolean,
        default:false
    },
    messages:[MessageScheme]
})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchmea)

export default UserModel