const express = require("express");
const router = express.Router();
const { getStudents, addStudent, getStudentById, updateStudent, deleteStudent } = require("../controllers/student.controller");

router.get("/", getStudents);
router.get("/:id", getStudentById);
router.post("/", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
