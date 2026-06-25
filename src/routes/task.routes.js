const express = require("express");
const router = express.Router();
const { getTask, addTask } = require("../controllers/task.controller");

router.get("/", getTask);
router.post("/", addTask);

module.exports = router;