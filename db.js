// importing any necessary packages
const mongoose = require("mongoose");

// function (Any)
const connectDB = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 3000, // 30 seconds
    })
    .then(() => {
      console.log("Connected to Database");
    });
};

// export
module.exports = connectDB;
