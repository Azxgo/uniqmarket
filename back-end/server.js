import express from "express"
import cookieParser from "cookie-parser";
import { productRouter } from "./routers/products.js";
import { cartRouter } from "./routers/cart.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { authRouter } from "./routers/auth.js";
import dotenv from 'dotenv';

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

app.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
})

