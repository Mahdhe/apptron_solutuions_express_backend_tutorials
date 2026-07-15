const mongoose  = require ("mongoose");

const taskSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true,
    },

    description : {
        type : String,
        required : true,
    },

    assignedTo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Stuednt",
        required : true,
    },

    deadline : {
        type : String,
        required : true,
    },

    priority : {
        type : String,
        enum: ["Low", "Medium", "High"],
        default: "Medium",
    },

    status : {
        type : String,
        enum : ["Pendeing","In progress","Completed"],
        default : "Pending",
    }

},
    {
    timestamps : true,
    }
);

module.exports = mongoose.model("Task",taskSchema);