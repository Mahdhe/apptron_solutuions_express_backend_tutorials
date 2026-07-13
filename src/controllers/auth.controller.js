const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
        if(!["Admin","Trainer","Student"].includes(role)){
            return res.status(400).json({
                success : false,
                message : "Role must be either Admin,Trainer or Student",
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




const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check all fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email.",
      });
    }

    // compare entered password with hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }


    // generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );


    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {registerUser,loginUser};