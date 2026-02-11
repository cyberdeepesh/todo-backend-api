const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

// Error Middleware
app.use(errorHandler);

module.exports = app;
