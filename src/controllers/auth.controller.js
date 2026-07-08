const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const registerUser = async (req,res) => {

    try{
        const{name,email,password,role} = req.body;

        //check all fields are provided

        if (!name || !email || !password || !role){
            return res.status(400).json({
                success : true,
                message : "All fields are required",
            });
        }

        //check password length
        if(password.length < 6){
            return res.status (400).json({
                success : false,
                message: "Password must be atleast 6 characters",
            });
        }

        //check role is valid
        if(!["Admin","Student"].includes(role)){
            return res.status(400).json({
                success : false,
                message : "Role must be either Admin or Student",
            });
        }

        //check if email is exist
        const existingUser = await User.findOne({email}); 
        if(existingUser){
            return res.status(400).json({
                 success : false,
                 message : "Email already exist",
            });
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create the user with hashed password
        const user = await User.create({
            name,
            email,
            password : hashedPassword,
            role,
        });

        res.status(201).json({
            success : true,
            message : "User registered successfully",
        });



    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message,
        });
    }
};          

module.exports = {registerUser};