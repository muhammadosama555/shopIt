const app = require("./app")
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB connected"))
.catch((err)=>{
    console.log(err)
})
const dotenv= require("dotenv")


//Setting up config file
dotenv.config({path: 'config/config.env'})

//Connecting to Database
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB connected"))
.catch((err)=>{
    console.log(err)
})

app.listen(process.env.PORT || 4000,()=>{
    console.log(`server Started on PORT:${process.env.PORT} in ${process.env.NODE_ENV} MODE.`)
})