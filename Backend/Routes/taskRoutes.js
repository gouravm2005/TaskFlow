import express from 'express'
import { createtask, gettask, edittask, removetask, getAlltasks, getCategorytasks } from "../Controllers/taskController.js";
import { AuthUser } from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.post('/createtask', AuthUser, createtask);

router.get('/gettask', AuthUser, gettask)

router.post('/edittask', AuthUser, edittask);

router.post('/removetask', AuthUser, removetask);

router.get('/Alltasks', AuthUser, getAlltasks);

router.get('/Categorytasks', AuthUser, getCategorytasks);

export default router;

