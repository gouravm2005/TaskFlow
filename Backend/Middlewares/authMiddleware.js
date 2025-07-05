// middlewares/authMiddleware.js
import userModel from "../models/user.js";
import jwt from "jsonwebtoken";

export const AuthUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;

    next();
    
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
