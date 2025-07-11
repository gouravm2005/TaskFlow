import express from 'express'
import { createtask, gettask, edittask, removetask, getAlltasks, getCategorytasks, getNotifications } from "../Controllers/taskController.js";
import { AuthUser } from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.post('/createtask', AuthUser, createtask);

router.get('/gettask/:id', AuthUser, gettask)

router.post('/edittask/:id', AuthUser, edittask);

router.post('/removetask/:id', AuthUser, removetask);

router.get('/Alltasks', AuthUser, getAlltasks);

router.get('/Categorytasks/:id', AuthUser, getCategorytasks);

router.get('/Notifications', AuthUser, getNotifications);

export default router;

