import userModel from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
 const {fullname, email, password} = req.body;

 if (!fullname || !email || !password) {
  return res.json({success:false, message: "Missing Details"})
 }

 try {
  
 const existingUser = await userModel.findOne({email});

 if(existingUser){
  return res.json({success:false, message:'User already exist'} )
  }

 const hashedPassword = await bcrypt.hash(password, 10);

 const user = await new userModel({fullname, email, password:hashedPassword});
 await user.save();

 const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});

 res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  samesite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  maxAge : 7 * 24 * 60 * 60 * 1000
 });

 return res.json({success:true, token});

} 
 catch (error)
 {
  res.json({success:false, message: error.message})
 }
}

export const loginUser = async (req, res) => {
 const {email, password} = req.body;
 
 if(!email || !password){
  res.json({success:false, message: 'Missing Details'})
 }

 try {
  
  const user = await userModel.findOne({email});
 
  if(!user){
   res.json({success:false, message: 'Invalid Email'})
  }
  
   const Ismatch = await bcrypt.compare(password, user.password);
  
   if(!Ismatch){
    res.json({success:false, message:'Invalid password'})
   }
  
   const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});
  
   res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    samesite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    maxAge : 7 * 24 * 60 * 60 * 1000
   });
  
   return res.json({success:true, token});

 } catch (error) {
  res.json({success:false, message:error.message})
 }
}

export const getprofile = async(req, res) => {
  try {

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const user = await userModel.findById(req.user._id).select('-password')
    res.json({
      firstname: user.fullname.firstname,
      lastname: user.fullname.lastname,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    res.status(500).json({message : 'failed to fetch profile'})
  }
}

export const editprofile = async (req, res) => {
  try {
    const { firstname, lastname } = req.body;
    console.log(req.body)
    console.log(req.params.id)

    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { 
        "fullname.firstname": firstname,
        "fullname.lastname": lastname
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Profile updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logoutUser = async(req, res) =>{

 try {
   res.clearCookie('token',{
   httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    samesite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
 })

 return res.json({success:true, message:"Logged Out"})

 } catch (error) {
   res.json({success:false, message:error.message})
 }
}