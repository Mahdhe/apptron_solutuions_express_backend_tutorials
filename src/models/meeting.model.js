const mongoose = require("mongoose");
const { on } = require("./student.model");

const meetingSchema = new mongoose.Schema (
    {
        studentId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Student",
            required : true,

        },

        meetingTitle : {
            type : String,
            required : true,
        },

        meetingDate : {
            type : String,
            required : true,
        },

        meetingTime : {
            type : String,
            required : true,
        },

        meetingType : {
            type : String,
            enum : ["Online","Offline"],
            required : true,
        },

        meetingLink : {
            type : String,
            required : true,
            default: null,
        },

        status : {
            type : String,
            enum : ["Scheduled","Completed","Cancelled"],
            default : "Scheduled",
        },


},
        {
            timestamps : true,
        }


);


module.exports = mongoose.model("Meeting",meetingSchema);