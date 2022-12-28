const express=require("express")
const app=express()

app.use(express.json())
// Import all routes
const productsRoute=require('./routes/product.js')

app.use("/api/v1",productsRoute)

app


module.exports= app;