import mongoose from "mongoose"

const dbConnect = async()=>{
    try{
 await mongoose.connect(process.env.MONGO_URI || "");
    console.log("db connected");
    }
    catch(error){
       console.error("mongodb not connected" , error);
       process.exit();
    }
   
}

export default dbConnect ;