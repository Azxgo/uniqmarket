import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../../controllers/admin/userController.js";

export const userRouter = Router()

userRouter.get("/getAll", getAllUsers)
userRouter.get("/get/:id", getUserById)
userRouter.post("/create", createUser)
userRouter.put("/update/:id", updateUser)
userRouter.post("/delete/:id", deleteUser)