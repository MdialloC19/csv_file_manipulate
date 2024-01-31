const express = require("express");
const router = express.Router();
const userControllers = require("../controller/userControllers");

router.post("/", userControllers.postOneUser);

module.exports = router;
