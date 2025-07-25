import { Router } from "express";
import { login, logout, register, verify } from "../controllers/authController.js";

export const authRouter = Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.get("/verify", verify)