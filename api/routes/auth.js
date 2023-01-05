const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  getUserProfile,
} = require("../controllers/authController.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.post("/password/forgot", forgotPassword);
router.get("/me", isAuthenticatedUser, getUserProfile);

module.exports = router;
