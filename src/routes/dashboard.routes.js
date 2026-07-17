const express = require("express");
const router = express.Router();
const {getDashboard} = require("../controllers/dashboard.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");


router.get("/",authMiddleware,roleMiddleware("Admin","Trainer"),getDashboard);

module.exports = router;
