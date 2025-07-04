import express from 'express'
import { registerUser, loginUser, logoutUser, getprofile } from '../Controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getprofile);
router.post('/logout', logoutUser);

export default router;