const express = require("express");
const router = express.Router();
const { getStudent, addStudent } = require("../controllers/student.controller");

router.get("/", getStudent);
router.post("/", addStudent);

module.exports = router;
