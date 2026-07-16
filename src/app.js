const express = require("express");
const app = express();



const logger = require("./middleware/logger.middleware");
const errorHandler = require("./middleware/error.middleware");
const jsonParser = require("./middleware/json.middleware");


const studentRoutes = require("./routes/student.routes");
const courseRoutes = require("./routes/course.routes");
const taskRoutes = require("./routes/task.routes");
const trainerRoutes = require("./routes/trainer.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes =require("./routes/auth.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const meetingRoutes = require("./routes/meeting.routes");

app.use(jsonParser);
app.use(logger);


app.use("/api/students", studentRoutes);    
app.use("/api/courses", courseRoutes);    
app.use("/api/tasks", taskRoutes);    
app.use("/api/trainers", trainerRoutes);  
app.use("/api/users", userRoutes);  
app.use("/api/auth",authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/meetings", meetingRoutes);

app.use(errorHandler);

module.exports = app;