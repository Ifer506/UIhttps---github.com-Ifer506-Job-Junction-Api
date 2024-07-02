const dotenv = require("dotenv");
const { router } = require("express");
const connectDB = require("./database/db");
const cloudinary = require("cloudinary");
// import {v2 as cloudinary} from 'cloudinary';
const acceptMultimedia = require("connect-multiparty");
const cors = require("cors");
const express = require("express");

//configuring dotenv , where all secrets passthrough
dotenv.config();

//defining port == suggestion  = dotenv.config(); needs to be in first
const PORT = process.env.PORT;

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(acceptMultimedia());

const corsOption = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));

//connect to database
connectDB();

app.use(express.json());

//create an api for user
app.use("/potato/user", require("./routes/userRoutes"));
app.use("/potato/content", require("./routes/contentRoutes"));

app.get("/potato/user", (req, res) => {
  res.status(200).json("Hello from server");
});

//running the server
app.listen(PORT, () => {
  console.log(`All clear welcome to , port ${PORT}`);
});

//mongoose server
module.exports = app;
