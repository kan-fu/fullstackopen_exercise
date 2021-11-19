const config = require("./utils/config");
const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");

const blogsRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.errorHandler);

module.exports = app;
