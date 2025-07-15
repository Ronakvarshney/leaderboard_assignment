
import mongoose, { Schema, Document } from "mongoose";

export interface Userinterface extends Document {
      name : string ;
      totalPoints : number ;
}


const UserSchema : Schema = new mongoose.Schema({
    name : {type : String , required : true } ,
    totalPoints : {type : Number , default: 0 }
}, {timestamps : true}
)


export default mongoose.model<Userinterface>("User" , UserSchema);