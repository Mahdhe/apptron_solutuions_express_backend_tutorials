const Task = require("../models/task.model");

// POST /api/tasks
const createTask = async (req,res) => {
    try{
        const {title,description,assignedTo,deadline,priority} =req.body;

        if (!title || !description || !assignedTo || !deadline){
            return res.status(400).json ({
                success : false,
                message : "All fields are required",
            });
        }
        const task = await Task.create({title,description,assignedTo,deadline,priority});

        res.status(201).json({
            success : true,
            message : "Task created successfully",
            task,
        });


    } catch (error){
        res.status(500).json({
            success : false,
            message : error.message
        });
    }

};



// GET /api/tasks — Admin and Trainer see all tasks
const getTasks = async (req,res) => {
    try {
        const tasks = await Task.find().populate("assignedTo","name email course");
        res.status(200).json({
            success : true,
            total : tasks.length,
            tasks,
        });
    } catch (error) {
        res.status(500).json({success : false, message : error.message});
    }
};


// GET /api/tasks/:id — get single task
const getTaskById = async (req,res) => {
    try {
        const task = await Task.findById(req.params.id).populate("assignedTo","name email course");

        if (!task) {
            return res.json(404)({
                success : false,
                message :"Task not found",
            });
        }

        res.status(200).json({
            success : true,
            task,
        });
    } catch (error) {
        res.status(500).json({success : false, message : error.message});
    }
};


// GET /api/tasks/my-tasks — Student views their own tasks
const getMyTasks = async (req,res) => {
    try {
        const tasks = await Task.find({assignedTo: req.params.studentId}).populate("assignedTo","name email course");

        if (!task) {
            return res.status(404).json({
                success : false,
                message : "Task not found",
            });
        }

        res.status(200).json({
            success : true,
            total : tasks.length,
            tasks,
        });
    } catch (error){
        res.status(500).json({success : false, message : error.message});
    }
};


//PUT /api/tasks/:id Students update only status
const updateTaskStatus = async (req,res) => {
    try{
        const {status} =req.body;

        if (!status) {
            return res.status(400).json({
                success : false,
                message : "Status is required",
            });
        }

        const allowedStatuses = ["Pendeing","In progress","Completed"];

        if (!allowedStatuses.includes(status)){
            return res.status(400).json({
                success : false,
                message : "Status must be pending, In progress or completed",
            });
        }

        const task =await Task.findByIdAndUpdate(
            req.params.id,
            {status},
            {new : true}
        );

        if (!task) {
            return res.status(404).json({
                success : false,
                messasge : "Task not found",
            });
        }

        res.status(200).json({
            success : true,
            message : "Task status updated successfully",
            task,
        })

    } catch (error){
        res.status(500).json({success : false, message : error.message});
    }

};


module.exports = {createTask,getTasks,getTaskById,getMyTasks,updateTaskStatus};
