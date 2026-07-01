const express = require("express");
const router = express.Router();
const { getStudents, addStudent } = require("../controllers/student.controller");

router.get("/", getStudents);
router.post("/", addStudent);

module.exports = router;
