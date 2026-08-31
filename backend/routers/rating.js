import { Router } from "express";
import { addRating, checkPurcharse, deleteReview, getAllRatings, getProductRating, getReviewsbyProduct, getUserRating } from "../controllers/ratingController.js";

export const ratingRouter = Router()

ratingRouter.post("/add", addRating)
ratingRouter.get("/get/:id", getProductRating);
ratingRouter.get("/getUser/:id", getUserRating);
ratingRouter.get("/checkPurchase/:id", checkPurcharse)
ratingRouter.get("/getAll", getAllRatings)
ratingRouter.get("/getReviews/:id", getReviewsbyProduct)
ratingRouter.delete("/delete/:productId", deleteReview);