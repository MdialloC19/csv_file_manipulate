const express = require("express");
const router = express.Router();
const spreadControllers = require("../controller/spreadControllers");
const userControllers = require("../controller/userControllers");

// route for spread
router.get("/", spreadControllers.getAllSpreadRows);
router.get("/:id", spreadControllers.getAllSpreadRows);
router.post("/", spreadControllers.postOneSpreadRow);
router.put("/:id", spreadControllers.putOneSpreadRow);
router.delete("/:id", spreadControllers.deleteOneSpreadRow);

module.exports = router;
