const express = require("express");
const router = express.Router();
const {createMeeting,getAllMeetings,getMeetingById,getMyMeetings,updateMeeting,deleteMeeting} = require("../controllers/meeting.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");


router.post("/",authMiddleware,roleMiddleware("Admin", "Trainer"),createMeeting);
router.get("/",authMiddleware,roleMiddleware("Admin", "Trainer"),getAllMeetings);
router.get("/my-meetings/:studentId",authMiddleware,getMyMeetings);
router.get("/:id",authMiddleware,roleMiddleware("Admin", "Trainer"),getMeetingById);
router.put("/:id",authMiddleware,roleMiddleware("Admin", "Trainer"),updateMeeting);
router.delete("/:id",authMiddleware,roleMiddleware("Admin"),deleteMeeting);

module.exports = router;