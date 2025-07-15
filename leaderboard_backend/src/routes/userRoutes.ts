import { Router } from "express";
import { addUsers, getLeaderBoard, getUsers } from "../controllers/UserController";


const router = Router();

router.get("/users" , getUsers);
router.post("/user" , addUsers);
router.get("/leaderboard", getLeaderBoard);

export default router ;