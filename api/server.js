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

//Connecting to Database
connectDatabase();

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