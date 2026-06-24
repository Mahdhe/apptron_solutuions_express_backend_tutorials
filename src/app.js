const express = require("express");
const app = express();

const studentRoutes = require("./routes/student.routes");
const courseRoutes = require("./routes/course.routes");
const taskRoutes = require("./routes/task.routes");
const trainerRoutes = require("./routes/trainer.routes")


app.use("/api/students", studentRoutes);    
app.use("/api/course", courseRoutes);    
app.use("/api/task", taskRoutes);    
app.use("/api/trainer", trainerRoutes);    


module.exports = app;