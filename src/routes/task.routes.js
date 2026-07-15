const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const { createTask,getTasks,getTaskById,getMyTasks,updateTaskStatus } = require("../controllers/task.controller");


router.post("/", authMiddleware, roleMiddleware("Admin","Trainer"), createTask);

router.get("/", authMiddleware, roleMiddleware("Admin","Trainer"), getTasks);

router.get("/mytasks/:studentId", getMyTasks);

router.get("/:id", authMiddleware, getTaskById);

router.put("/:id", authMiddleware, updateTaskStatus);

module.exports = router;