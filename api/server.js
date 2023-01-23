const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//HANDLE uncaught exceptions 
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to uncaught exception")
  process.exit(1);

});



//Setting up config file
dotenv.config({ path: "config/config.env" });
const cloudinary= require("cloudinary")

//Connecting to Database
connectDatabase();

// setting up cloudinary configration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const server=app.listen(process.env.PORT || 4000, () => {
  console.log(
    `server Started on PORT:${process.env.PORT} in ${process.env.NODE_ENV} MODE.`
  );
});


//Handle Unhandled  Promise rejections
process.on("unhandledRejection", err =>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server dueto unhandled promise rejections")
    server.close(() => process.exit(1));
})