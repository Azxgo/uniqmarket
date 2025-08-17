import { Router } from "express";
import { deleteOrder, getAllOrders, getById, updateStatus } from "../../controllers/admin/orderController.js";

export const orderRouter = Router()

orderRouter.get("/getAll", getAllOrders)
orderRouter.get("/get/:id", getById)
orderRouter.put("/update/:id", updateStatus)
orderRouter.post("/delete/:id", deleteOrder)