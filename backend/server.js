import express from "express"
import cors from "cors"
import 'dotenv/config'

import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

// db connection
import sequelize from "./config/db.js"
import { connectDB } from "./config/db.js"
import userModel from "./models/userModel.js"
import foodModel from "./models/foodModel.js"
import orderModel from "./models/orderModel.js"

const initDB = async () => {
    await connectDB();
    await sequelize.sync(); // This creates tables if they don't exist
    console.log("All models were synchronized successfully.");
}

initDB();

// api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})
