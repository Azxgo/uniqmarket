import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../../controllers/admin/productController.js";

export const adminProductRouter = Router()

adminProductRouter.get("/getAll", getAllProducts)
adminProductRouter.get("/get/:id", getProductById)
adminProductRouter.post("/create", createProduct)
adminProductRouter.put("/update/:id", updateProduct)
adminProductRouter.post("/delete/:id", deleteProduct)