const Student = require("../models/student.model");
const Attendance = require("../models/attendance.model");
const Task = require("../models/task.model");
const Meeting = require("../models/meeting.model");


const getDashboard = async (req,res) => {
    try{
        const today = new Date().toISOString().split("T")[0];
        const totalStudents = await Student.countDocuments();
        const activeStudents = await Student.countDocuments({status : "Active"});
        const todayAttendance = await Attendance.countDocuments({date : today});
        const pendingTasks = await Task.countDocuments({status : "Pending"});
        const completedTasks = await Task.countDocuments({status : "Completed"});
        const todayMeetings = await Meeting.countDocuments({meetingDate: today});
        

        res.status(200).json ({
            success : true,
            data : {totalStudents,activeStudents,todayAttendance,pendingTasks,completedTasks,todayMeetings},
        });
    } catch (error){
        res.status(500).json({success : false, message : error.message});
    }
};

module.exports = {getDashboard};