const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { getAuth, postAuth } = require("../controller/authControllers");
const { check } = require("express-validator");

/**
 * @route Get api/auth
 * @desc Test rout
 * @access Public
 */

router.get("/", authMiddleware, getAuth);
module.exports = router;

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).exists(),
  ],
  postAuth
);
