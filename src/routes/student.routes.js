const express = require("express");
const router = express.Router();
const { getStudents, addStudent, getStudentById, updateStudent, deleteStudent } = require("../controllers/student.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

router.get("/", authMiddleware, getStudents);
router.get("/:id", authMiddleware ,getStudentById);

router.post("/",    authMiddleware, roleMiddleware("Admin", "Trainer"), addStudent);
router.put("/:id",  authMiddleware, roleMiddleware("Admin", "Trainer"), updateStudent);

router.delete("/:id", authMiddleware, roleMiddleware("Admin"), deleteStudent);

module.exports = router;
