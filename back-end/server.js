import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

import { productRouter } from "./routers/products.js"
import { cartRouter } from "./routers/cart.js"
import { corsMiddleware } from "./middlewares/cors.js"
import { authRouter } from "./routers/auth.js"
import { adminProductRouter } from "./routers/admin/product.js"
import { userRouter } from "./routers/admin/user.js"
import { orderRouter } from "./routers/admin/orders.js"
import { categoryRouter } from "./routers/admin/category.js"
import { adminAuth } from "./middlewares/adminAuth.js"
import { ratingRouter } from "./routers/rating.js"
import { authMiddleware } from "./middlewares/auth.js"
import { vendorRouter } from "./routers/admin/vendor.js"
import pool from "./db-config.js"

dotenv.config()

const app = express()
const port = process.env.PORT ?? 3000

app.use(corsMiddleware())
app.use(cookieParser())
app.use(express.json())

app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/auth", authRouter)
app.use("/api/rating", authMiddleware, ratingRouter)

app.use("/api/admin/products", adminAuth, adminProductRouter)
app.use("/api/admin/users", adminAuth, userRouter)
app.use("/api/admin/orders", adminAuth, orderRouter)
app.use("/api/admin/vendors", adminAuth, vendorRouter)
app.use("/api/admin/category", adminAuth, categoryRouter)

async function start() {
  try {
    await pool.query("SELECT 1")
    console.log("Conexión a DB lista ✅")
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`)
    })
  } catch (err) {
    console.error("No se pudo conectar a la DB:", err)
    process.exit(1)
  }
}

start()