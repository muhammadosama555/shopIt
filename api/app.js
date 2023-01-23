const express=require("express")
const app=express()
const cookieParser= require("cookie-parser")
const bodyParser= require("body-parser")
const fileUpload= require("express-fileupload")


const errorMiddleware= require("./middlewares/errors.js")

app.use(express.json())
app.use(bodyParser.urlencoded({extende:true}))
app.use(cookieParser())
app.use(fileUpload())


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