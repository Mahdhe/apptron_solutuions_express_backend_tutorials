const getTrainer = (req,res) =>{
    res.json({message:"All trainer list"})
};

const addTrainer =(req,res) => {
    res.json({message:"Trainer added successfully"})
};

module.exports ={getTrainer,addTrainer}