import UserModel from "../models/UserModel"
import { Request, Response } from "express";


export const getUsers = async (req: Request, res: Response): Promise<any> => {

    try {
        const users = await UserModel.find();
        if (!users) {
            return res.status(404).json({
                success: false,
                message: "users not found"
            })
        }

        return res.status(201).json({
            success: true,
            message: 'users fetches',
            users
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "something goes wrong", error
        })

    }

}


export const addUsers = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        //    here i am assumed name is a fullname so it must be unique at all.
        const existingname = await UserModel.findOne({ name: name });
        if (existingname) {
            return res.status(500).json({
                success: false,
                message: "Fullname already exists"
            })
        };

        const newuser = await UserModel.create({ name });
        return res.status(201).json({
            success: true,
            message: "user created successfully",
            newuser
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "something goes wrong", error
        })
    }
}


export const getLeaderBoard = async (req : Request , res: Response) => {
    try {
        const users = await UserModel.find().sort({ totalPoints: -1 });
        return res.status(201).json({
            success: true,
            message: "leaderboard updated",
            users
        })
    }
    catch (error : any) {
        return res.status(500).json({
            success: false,
            message:  error.message
        })
    }
}