const express = require("express");
const authController = require("../middleware/authMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Signup route
router.post("/signup", authController.signup);
router.get("/signup", (req, res) => {
  res.status(200).send("Hello, can u hear me / u are in an empty location");
});

// Login route
router.post("/login", authController.login);
// Logout route
// router.post('/logout', authMiddleware, authController.logout);
router.get("/getUser/:id", authController.getUserDetails);
router.get("/getImage/:imageName", authController.getImage);
router.get(
  "/getCv/controllers/uploads/userData/:fileName",
  authController.getCv
);
router.post("/changePassword", authMiddleware, authController.changePassword);
router.delete('/users/:userId', authController.deleteUser);

module.exports = router;
