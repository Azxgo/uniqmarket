import express from "express"
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import { productRouter } from "./routers/products.js";
import { cartRouter } from "./routers/cart.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { authRouter } from "./routers/auth.js";
import { adminProductRouter } from "./routers/admin/product.js";
import { userRouter } from "./routers/admin/user.js";
import { orderRouter } from "./routers/admin/orders.js";
import { categoryRouter } from "./routers/admin/category.js";
import { adminAuth } from "./middlewares/adminAuth.js";
import { ratingRouter } from "./routers/rating.js";
import { authMiddleware } from "./middlewares/auth.js";

//Config
dotenv.config();
const app = express()
const port = process.env.PORT ?? 3000
app.use(corsMiddleware());
app.use(cookieParser())
app.use(express.json());

app.use('/api', productRouter);
app.use("/cart", cartRouter);
app.use("/auth", authRouter)
app.use("/rating", authMiddleware, ratingRouter)

app.use('/admin/products', adminAuth, adminProductRouter)
app.use('/admin/users', adminAuth, userRouter)
app.use('/admin/orders', adminAuth, orderRouter)
app.use('/admin/category', adminAuth, categoryRouter)

app.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
})

