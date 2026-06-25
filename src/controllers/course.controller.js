const getCourse = (req,res) => {
    res.json({message:"All course list"})
};

const addCourse = (req,res) => {
    res.json({message:"Course added successfully"})
};

module.exports = {getCourse,addCourse}