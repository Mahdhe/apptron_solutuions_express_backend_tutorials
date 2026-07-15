const Student = require("../models/student.model");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

// GET all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("userId", "email role status");
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
    const student = await Student.findById(req.params.id).populate(
      "userId",
      "email role status"
    );

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

// POST create student — also creates a user account
const addStudent = async (req, res) => {
  try {
    const { name, email, phone, course, age, password } = req.body;

    if (!name || !email || !phone || !course || !age || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required including password",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists in user accounts",
      });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user account so student can login
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "Student",
    });

    // create student record and link to user account
    const student = await Student.create({
      name,
      email,
      phone,
      course,
      age,
      userId: user._id,
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully. Student can now login with their email and password.",
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        course: student.course,
        age: student.age,
        userId: user._id,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.message,
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT update student
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.message,
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE student — also deletes user account
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // delete the linked user account too
    if (student.userId) {
      await User.findByIdAndDelete(student.userId);
    }

    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Student and user account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
};