import ClaimHistoryModel from "../models/ClaimHistoryModel";
import UserModel from "../models/UserModel";
import { Request, Response } from "express";



export const claimPoints = async(req : Request , res : Response) : Promise<any>=>{
    try{
      const {userId} = req.body ;
      const user = await UserModel.findById({_id : userId});
      if(!user){
        return res.status(404).json({
            success : false ,
            message : "user not found"
        })
      };


      const points = Math.floor(Math.random()*10) + 1 ;
      user.totalPoints += points ;
      await user.save();

      const claimedhistory = await ClaimHistoryModel.create({
        userId : user._id ,
        userName : user.name ,
        claimedPoints : points
      });

      const updateLeaderboard = await UserModel.find().sort({totalPoints : -1});

      return res.status(201).json({
        success : true ,
        message : "claimPoints done",
        leaderboard : updateLeaderboard ,
        user ,
        claimedpoints : points
      })
    }
    catch(error : any){
        return res.status(500).json({
            success : false ,
            message : error.message
        })
    }
}


export const getHistory = async(req : Request , res : Response)=>{
    const history = await ClaimHistoryModel.find().sort({claimAt : -1});
    return res.status(201).json({
        success : true ,
        message : "history fetches" ,
        history
    })
}