import { Router } from "express";
import { addCategory, deleteCategory, getAllCategories, updateCategory } from "../../controllers/admin/categoryController.js";

export const categoryRouter = Router()

categoryRouter.get("/getAll", getAllCategories)
categoryRouter.put("/update/:id", updateCategory)
categoryRouter.post("/add", addCategory)
categoryRouter.delete("/delete/:id", deleteCategory)