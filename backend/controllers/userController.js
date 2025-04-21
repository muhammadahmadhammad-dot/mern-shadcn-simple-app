import { matchPassword } from "../helper/userHelper.js";
import userModel from "../models/userModel.js";
import { loginSchema } from "../validations/userValidation.js"
import jwt from "jsonwebtoken"

export const login  =async (req, res) => {
    try {
        const {data,error} = loginSchema.safeParse(req.body);
        if(error){
            return res.status(400).send({success:false,message:'Validation error!',validateErrors:error.format()})
        }
        const {email, password} = data;
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({success:false,message:'Not Found.'})
        }

        const isMatched = matchPassword(password, user.password)
        if(!isMatched){
            return res.status(401).send({success:false,message:'Invalid Credentials.'})
        }

        const token = await jwt.sign({id:user._id},process.env.SECRET_KEY, {expiresIn:'1d'})

        return res.status(200).send({success:true,message:'Login Successfully!',user,token})

    } catch (error) {
        console.log('Login controller error : ' + error);
        return res.status(400).send({success:false,message:`Error : ${error}`})
    }
}
export const logout  = (req, res) => {}
export const register  = (req, res) => {}