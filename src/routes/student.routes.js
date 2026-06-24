const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
 res.json({
   message: "Student Route Working"
 });
});

module.exports = router;
