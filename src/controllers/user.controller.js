const User = require ("../models/user.model");

const getUsers = async (req,res) => {
    try{
        const users = await User.find();
        res.status(200).json({success:true, total:users.length, users});
    }catch(error){
        res.status(500).json({success:false, message: error.message});
    }
};

const addUser = async (req,res) => {
    try{
        const {name,email,password,role} = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success : false,
                message : "All fields are required",
            });
        }

        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({
                success : true,
                message : "Email already exist",
            });
        }

        const user = await User.create ({name,email,password,role});
        res.status(201).json({
            success : true,
            message : "User created successfully",
            user,
        });
    }catch(error){
        res.status(500).json({success:false, message: error.message});
    }
};

module.exports = {getUsers,addUser};