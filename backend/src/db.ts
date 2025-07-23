import { link } from "fs";
import mongoose,{model,Schema, Types} from "mongoose";
import { title } from "process";
const UserSchema=new Schema({
    username:{type:String,unique:true},
    password:String
});

export const UserModel=model("User",UserSchema);

const ContentSchema=new Schema({
    title:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId, ref:'Tag'}],
    type: String,
    userId:{type:mongoose.Types.ObjectId,ref:'User',required:true},
    
});
const LinksSchema=new Schema({
    hash:String,
    userId:{type:mongoose.Types.ObjectId,ref:'User',required:true,unique:true},

})
export const LinkModel=model("Links",LinksSchema);
 
export const ContentModel=model("Content",ContentSchema);