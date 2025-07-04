import express from 'express'
import { createtask, edittask, removetask, getAlltasks, getCategorytasks } from "../Controllers/taskController";

const router = express.Router();

router.post('/createtask', createtask);

router.post('/edittask', edittask);

router.post('/removetask', removetask);

router.get('/Alltasks', getAlltasks);

router.get('/Categorytasks', getCategorytasks);

export default router;

