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
// Custom middleware
app.get("/", (req, res) => {
    res.send("API is working");
});

// Routes
const authMiddleware = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const jobsRoutes = require("./routes/jobsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const searchRoutes = require("./routes/searchRoutes");
const fileController = require("./controllers/fileController");
const searchController = require("./controllers/searchController");

app.use("/auth", authRoutes);
app.use("/jobs", jobsRoutes);
app.use("/controllers", fileController);
app.use("/users", authMiddleware, usersRoutes);
app.use("/search", searchRoutes);

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
