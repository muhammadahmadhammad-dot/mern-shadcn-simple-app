import express from "express"
import dotenv from "dotenv"
import connectionWithDB from "./config/db.js"
import cors from "cors"

import userRouter from "./routes/userRoutes.js"


const app = express();

dotenv.config()

connectionWithDB();

app.use(cors({origin:'http://localhost:5173'}))
app.use(express.json())

app.use('/api/users',userRouter)

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server is runing on port :${PORT}`)
});