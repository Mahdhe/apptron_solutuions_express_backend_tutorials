const express = require("express");
const router = express.Router();
const { getStudents, addStudent, getStudentById } = require("../controllers/student.controller");

router.get("/", getStudents);
router.get("/:id", getStudentById);
router.post("/", addStudent);

module.exports = router;
