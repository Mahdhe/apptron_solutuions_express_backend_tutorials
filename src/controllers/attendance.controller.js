const Attendance = require("../models/attendance.model");

// POST /api/attendance/checkin
const checkIn = async (req,res) => {
    try{
        const {studentId} = req.body;

        if (!studentId) {
            return res.status(400).json({
                success : false,
                message : "Student ID is required",
            });
        }

        const today = new Date().toISOString().split("T")[0];

        const existingAttendance = await Attendance.findOne ({
            studentId,
            date : today,
        });

        if (existingAttendance) {
            return res.status(400).json({
                success : false,
                message : "Student has already checked in today",
            });
        }

        const checkInTime = new Date().toLocaleTimeString();

        const attendance = await Attendance.create ({
            studentId,
            date : today,
            checkIn : checkInTime,
            status : "Present",
        });

        res.status(201).json({
            success : true,
            message : "Check-in successful",
            attendance,
        });


    } catch (error){
        res.status(500).json({
            success : false,
            message : error.message 
        });
    }
};



// POST /api/attendance/checkout
const checkOut = async (req,res) => {

    try{
        const  { studentId } = req.body; 

        if (!studentId) {
            return res.status(400).json({
                success : false,
                message : "Student ID is required"
            });
        }

        const today = new Date().toISOString().split("T")[0];

        const attendance = await Attendance.findOne({
            studentId,
            date : today,
        });

        if (!attendance){
            return res.status(400).json({
                success : false,
                message : "No check-in record found for today",
            });
        }

        if (attendance.checkOut){
            return res.status(400).json({
                success : false,
                message : "Student has already checked out today",
            });
        }


        const checkOutTime = new Date().toLocaleTimeString();

        attendance.checkOut = checkOutTime;
        await attendance.save();

        res.status(200).json({
            success : true,
            message : "Check-out successful",
            attendance,
        });

    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        });
    }

};


// GET /api/attendance

const getAttendance = async (req,res) => {
    try{
        const attendanceRecords = await Attendance.find().populate(
            "studentId",
            "name email course"
        );

        res.status(200).json({
            success : true,
            total : attendanceRecords.length,
            attendance : attendanceRecords,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message : error.message
        });
    }
};


module.exports = {checkIn,checkOut,getAttendance};