const express=require("express")
const app=express()

const errorMiddleware= require("./middlewares/errors.js")

app.use(express.json())
// Import all routes
const productsRoute=require('./routes/product.js')

app.use("/api/v1",productsRoute)



//Middleware to handle errors
app.use(errorMiddleware)


module.exports= app;