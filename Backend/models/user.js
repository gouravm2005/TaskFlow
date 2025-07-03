import mongoose from "mongoose";
import validator from 'validator'

const userschema = new mongoose.Schema({
 fullname:{
  firstname:{
   type: String, required:true
  },
  lastname:{
   type: String, required:true
  }
 },
 email:{
  type: String, required:true, unique:true, validate:[validator.isEmail, "Invalid Email"]
 },
 password:{
  type : String, required:true, minlength:8
 }
})

const userModel = mongoose.models.user || mongoose.model("user", userschema);
export default userModel;