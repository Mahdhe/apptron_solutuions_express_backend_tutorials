const express = require("express");
const router = express.Router();
const {checkIn,checkOut,getAttendance,} = require("../controllers/attendance.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/checkin",  authMiddleware, checkIn);
router.post("/checkout", authMiddleware, checkOut);
router.get("/",          authMiddleware, getAttendance);

module.exports = router;