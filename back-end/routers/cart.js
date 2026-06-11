import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js"
import { cartSessionMiddleware } from "../middlewares/cartSession.js"
import { addToCart, buyProducts, getCart, removeFromCart, resetCart } from "../controllers/cartController.js";

export const cartRouter = Router()

cartRouter.use(cartSessionMiddleware);
cartRouter.use(authMiddleware);

cartRouter.post("/add", addToCart)
cartRouter.post("/remove", removeFromCart)
cartRouter.post("/reset", resetCart)
cartRouter.post("/buy", buyProducts)
cartRouter.get("/", getCart)