import express from "express"
import { login, logout, register } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/login',login)
userRouter.post('/logout',logout)
userRouter.post('/register',register)

export default userRouter