import express from 'express'
import {AuthUser} from '../Middlewares/authMiddleware.js'
import { registerUser, loginUser, logoutUser, getprofile, editprofile } from '../Controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', AuthUser, getprofile);
router.post('/editprofile/:id', AuthUser, editprofile);
router.post('/logout', logoutUser);

export default router;