const express = require("express");
const router = express.Router();
const { getTrainer, addTrainer } = require("../controllers/trainer.controller");

router.get("/", getTrainer);
router.post("/", addTrainer);

module.exports = router;