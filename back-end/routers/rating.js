import { Router } from "express";
import { addRating, checkPurcharse, getAllRatings, getProductRating, getUserRating } from "../controllers/ratingController.js";

export const ratingRouter = Router()

ratingRouter.post("/add", addRating)
ratingRouter.get("/get/:id", getProductRating);
ratingRouter.get("/getUser/:id", getUserRating);
ratingRouter.get("/checkPurchase/:id", checkPurcharse)
ratingRouter.get("/getAll", getAllRatings)