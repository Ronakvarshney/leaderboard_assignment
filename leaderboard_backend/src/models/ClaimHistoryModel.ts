import mongoose, { Schema, Document, mongo } from "mongoose";
import { ref } from "process";


export interface ClaimhistoryInterface extends Document {
    userId : mongoose.Types.ObjectId ;
    userName : string ;
    claimedPoints : number ;
    claimAt : Date;
}


const claimedSchema = new mongoose.Schema({
    userId : {type : Schema.Types.ObjectId , ref : "User"},
    userName : {type : String },
    claimedPoints : {type : Number},
    claimAt : {type : Date , default : Date.now}
});


export default mongoose.model("ClaimedHistory" , claimedSchema);