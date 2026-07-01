const Student = require("../models/student.model");

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json({ message: "Student Added Successfully", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStudents, addStudent };