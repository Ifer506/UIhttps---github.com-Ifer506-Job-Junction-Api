const dotenv = require("dotenv");
const { router } = require("express");
const connectDB = require("./db");
const express = require("express");

//configuring dotenv , where all secrets passthrough
dotenv.config();

//defining port == suggestion  = dotenv.config(); needs to be in first
const PORT = process.env.PORT;

const app = express();

//middleware
app.use(express.json());

//connect to database
connectDB();

app.get("/job/user", (req, res) => {
  res.status(200).json("Hello from server");
});

// Custom middleware
app.get("/", (req, res) => {
    res.send("API is working");
  });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error in index" });
});
  

//running the server
app.listen(PORT, () => {
  console.log(`All clear welcome to , port ${PORT}`);
});

//mongoose server
module.exports = app;
