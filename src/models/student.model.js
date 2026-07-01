const mongoose = require ("mongoose");

const studentSchema = new mongoose.Schema  ({

    name : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        unique : true,
    },

    phone : {
        type :String,
        required : true,
    },

    course : {
        type : String,
        required : true,
    },

    age : {
        type : Number,
        required : true,
    },

    status : {
        type : String,
        enum : ["Active","Inactive"],
        default : "Active",
    }
},

    {
        timestamps : true,
    }
);

module.exports = mongoose.model("Student",studentSchema)