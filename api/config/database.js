const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDatabase = () => {
  mongoose.connect(process.env.DB_ONLINE_URI).then((con) => {
    console.log(`MongoDb Database connected with Host:${con.connection.host}`);
  });
};

module.exports = connectDatabase;
