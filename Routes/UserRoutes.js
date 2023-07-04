const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUserInfo,
} = require("../Controllers/UserController");
const validateToken = require("../Middleware/ValidateTokenHandler");

const router = express.Router();
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/currentUser").get(validateToken, getCurrentUserInfo);

// router.post("/login", loginUser);

// router.get("/currentUser", getCurrentUserInfo);

module.exports = router;
