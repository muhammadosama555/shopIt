const express=require("express")
const app=express()
const cookieParser= require("cookie-parser")

const errorMiddleware= require("./middlewares/errors.js")

app.use(express.json())
app.use(cookieParser())
// Import all routes
const productsRoute=require('./routes/product.js')
const auth=require('./routes/auth.js')
const orderRoute=require('./routes/order.js')

app.use("/api/v1",productsRoute)
app.use("/api/v1",auth)
app.use("/api/v1",orderRoute)



//Middleware to handle errors
app.use(errorMiddleware)


module.exports= app;