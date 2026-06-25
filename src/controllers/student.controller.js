const getStudent = (req,res) =>{
    res.json({message:"All Student list"})
};

const addStudent = (req,res) =>{
    res.json({message:"Student added successfully!"})
};


module.exports ={getStudent,addStudent}