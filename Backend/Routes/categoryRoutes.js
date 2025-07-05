import express from "express";
import { createCategory, editCategory, deleteCategory, getCategories } from "../Controllers/categoryController.js";
import { AuthUser } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", AuthUser, createCategory);
router.get("/all", AuthUser, getCategories);
router.put("/edit/:id", AuthUser, editCategory);
router.delete("/delete/:id", AuthUser, deleteCategory);

export default router;
