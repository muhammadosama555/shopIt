const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middlewares/error");
const connectDB = require("./config/db.js");

//Load env variables
dotenv.config({ path: "./config/config.env" });

//database connected
connectDB();

const app = express();
//body Parser
app.use(express.json());
//cors
app.use(cors());

//Routes files
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const productRoutes = require("./routes/product.js");
const reviewRoutes = require("./routes/review.js");
const orderRoutes = require("./routes/order.js");


//Mount the routers
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);



app.use(errorHandler);

const PORT = process.env.PORT 

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
