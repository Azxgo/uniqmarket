import { Router } from "express";
import { addRating, getProductRating, getUserRating } from "../controllers/ratingController.js";

export const ratingRouter = Router()

ratingRouter.post("/add", addRating)
ratingRouter.get("/get/:id", getProductRating);
ratingRouter.get("/getUser/:id", getUserRating);