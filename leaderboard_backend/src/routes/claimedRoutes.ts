import { Router } from "express";
import { claimPoints, getHistory } from "../controllers/claimController";


const Claimedrouter = Router();

Claimedrouter.post("/claim" , claimPoints);
Claimedrouter.get("/history" , getHistory);

export default Claimedrouter ;