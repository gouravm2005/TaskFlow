import userModel from "../models/user";
import jsonWebToken from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const AuthUser = async(req, res) => {
 const token = req.cookie.token || req.headers.Authorization?.split('')[1];
 if(!token){
  res.status(401).json({message:'Unauthorized'})
 }

 try {
  const decode = jsonWebToken.verify(token, process.env.JWT_SECRET)
  const user = userModel.findById(req.decode._id)

  user.id = user

  return next()

 } catch (error) {
  res.status(401).json({message: 'Unauthorized'})
 }
}


