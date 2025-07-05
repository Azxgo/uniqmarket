import { Router } from "express";
import { get5RandomProducts, getAll, getCategories } from "../controllers/productController.js";

export const productRouter = Router()

productRouter.get("/products", getAll)
productRouter.get("/categories", getCategories)
productRouter.get("/rand", get5RandomProducts)