const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { getAuth, postAuth } = require("../controller/authControllers");

/**
 * @route Get api/auth
 * @desc Test rout
 * @access Public
 */

router.get("/", authMiddleware, getAuth);
module.exports = router;

router.post("/", postAuth);
