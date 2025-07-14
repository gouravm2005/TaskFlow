import express from 'express'
import {addNote, getNotes, editNote, deleteNote} from '../Controllers/noteController.js'
import { AuthUser } from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.post('/addnote', AuthUser, addNote);
router.get('/notes', AuthUser, getNotes);
router.put('/editnote/:id', AuthUser, editNote);
router.delete('/deletenote/:id', AuthUser, deleteNote);

export default router;