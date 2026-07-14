const mongoose =require("mongoose");

const attendanceSchema = new mongoose.Schema({

        studentId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Student",
            required : true,
        },

        date : {
            type : String,
            required : true,
        },

        checkIn : {
            type : String,
            default : null,
        },

        checkOut : {
            type : String,
            default : null,
        },

        status : {
            type : String,
            enum : ["Present", "Absent", "Halfday"],
            default : "Present",
        },
},
        {
            timestamp: true,
        }

);

module.exports = mongoose.model("Attendance", attendanceSchema);