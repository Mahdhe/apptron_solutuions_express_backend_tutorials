const Student = require("../models/student.model");

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      success: true,
      total: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// POST student
const addStudent = async (req, res) => {
  try {
    const {name, email, phone, course,age} = req.body;

    if (!name || !email || !phone || !course || !age){
      return res.status(400).json({
        success : false,
        message : "All fields are required",
      });
    }

    const existingStudent = await Student.findOne({email});
    if (existingStudent){
      return res.status(400).json({
        success : false,
        message : "Email already exist",
      })
    }

    const student = await Student.create ({name,email,phone,course,age});

    res.status(201).json({
      success :true,
      message : "Student created successfully",
      student,
    });

  } catch (error) {
    if (error.name === "ValidationError"){
      return res.status(400).json({
        success : false,
        message : "Validation failed",
        errors : error.message,
      });
    }
    res.status(500).json({ success : false, message: error.message });
  }
};

module.exports = { getStudents, getStudentById, addStudent };