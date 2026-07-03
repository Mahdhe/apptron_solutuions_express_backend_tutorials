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
        min : [18, "Age must be greater than or equal to 18"],
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