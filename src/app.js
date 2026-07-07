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


app.use(jsonParser);
app.use(logger);


app.use("/api/students", studentRoutes);    
app.use("/api/courses", courseRoutes);    
app.use("/api/tasks", taskRoutes);    
app.use("/api/trainers", trainerRoutes);  
app.use("/api/users", userRoutes);  
app.use(errorHandler);

module.exports = app;