const Meeting = require("../models/meeting.model");
const Student = require("../models/student.model");


//POST /api/meetings — Admin and Trainer only
const createMeeting = async (req,res) => {
    try {
        const {studentId,meetingTitle,meetingDate,meetingTime,meetingType,meetingLink,status} = req.body;

        if (!studentId || !meetingTitle || !meetingDate || !meetingTime || !meetingType || !meetingLink) {
            return res.status(400).json ({
                success : false,
                message : "All fields required",
            });
        }

        const meeting = await Meeting.create({studentId,meetingTitle,meetingDate,meetingTime,meetingType,meetingLink,status});

        res.status(201).json({
            success : true,
            message : "Meeting created successfully",
            meeting,
        });

    } catch (error) {
        res.status(500).json({success : false, message : error.message});
    }
};

// GET /api/meetings — Admin and Trainer see all meetings
const getAllMeetings = async(req,res) => {
    try {
        const meetings = await Meeting.find().populate(
            "studentId",
            "name email course"
        );

        res.status(200).json({
            success : true,
            total : meetings.length,
            meetings, 
        });
    } catch (error) {
        res.status(500).json({success : true, message : error.message});
    }
};

// GET /api/meetings/:id — get single meeting(
const getMeetingById = async(req,res) => {
    try {
        const meeting = await Meeting.findById(req.params.id).populate(
            "studentId",
            "name email course"
        );

        if(!meeting) {
            res.status(404).json({
                success : false,
                message :"Meeting not found",
            });
        }

        res.status(200).json({
            success : true,
            meeting,
        });
    } catch (error){
        res.status(500).json({success : false, message : error.message});
    }
};


// GET /api/meetings/my-meetings/:studentId — Student views their own meetings
const getMyMeetings = async (req,res) => {
    try {
        const student = await Student.findOne({userId: req.params.studentId});

        if(!student){
            res.status(404).json({
                success : false,
                message : "Student not found",
            });
        }

        const meetings = await Meeting.find({studentId : student._id}).populate(
            "studentId",
            "name email course",
        );

        res.status(200).json({
            success : true,
            total : meetings.length,
            meetings,
        });
    } catch (error) {
        res.status(500).json({success : false, message : error.message});
    }
};


// PUT /api/meetings/:id — Admin and Trainer only
const updateMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Meeting updated successfully",
      meeting,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/meetings/:id — Admin only
const deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.id);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Meeting deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {createMeeting,getAllMeetings,getMeetingById,getMyMeetings,updateMeeting,deleteMeeting};