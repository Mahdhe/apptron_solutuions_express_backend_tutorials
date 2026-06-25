const express = require("express");
const router = express.Router();
const { getCourse, addCourse } = require("../controllers/course.controller");

router.get("/", getCourse);
router.post("/", addCourse);

module.exports = router;