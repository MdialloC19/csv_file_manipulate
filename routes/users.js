const express = require("express");
const router = express.Router();
const userControllers = require("../controller/userControllers");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/auth");

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  userControllers.postOneUser
);

router.put("/", authMiddleware, userControllers.putOnUser);

module.exports = router;
