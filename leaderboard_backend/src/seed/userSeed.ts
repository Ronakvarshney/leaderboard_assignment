import mongoose from "mongoose";
import UserModel from "../models/UserModel";
import { data } from "../dummydata/user";



async function SeedUsers() {
    try{
      await mongoose.connect("mongodb://localhost:27017/leaderboard");
      await UserModel.insertMany(data);
      console.log("users inserted");
      process.exit();
    }
    catch(error){
        console.log(error);
        process.exit();
    }
    
}

SeedUsers();