const app = require("./app")
const dotenv= require("dotenv")


//Setting up config file
dotenv.config({path: 'config/config.env'})

app.listen(process.env.PORT || 4000,()=>{
    console.log(`server Started on PORT:${process.env.PORT} in ${process.env.NODE_ENV} MODE.`)
})