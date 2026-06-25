const getTask = (req,res) => {
    res.json({message:"All task list"})
};

const addTask = (req,res) =>{
    res.json({message: "Task added successfully"})
};

module.exports = {getTask,addTask}