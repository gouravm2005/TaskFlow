import express from 'express'
import { AuthUser } from '../Middlewares/authMiddleware.js'
import {getTaskDetails, getTodaystasks, getprogress} from '../Controllers/dashboardController.js'

const router = express.Router();

router.get('/taskdetails', AuthUser, getTaskDetails);
router.get('/todaystasks', AuthUser, getTodaystasks);
router.get('/progress', AuthUser, getprogress);

export default router;