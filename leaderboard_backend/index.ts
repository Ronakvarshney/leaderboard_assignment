import express from "express" 
import cors from 'cors'
import dotenv from "dotenv"
import dbConnect from "./src/config/dbconfig";
import router from "./src/routes/userRoutes";
import Claimedrouter from "./src/routes/claimedRoutes";


const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
dbConnect()

app.use('/api' , router);
app.use('/api', Claimedrouter );

app.listen(process.env.PORT , ()=>{
    console.log("server running at port 5000");
}) 