const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const playersMMRRouter = require("./controllers/PlayersMMR");
const middleware = require("./utils/middleware")

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/players", playersMMRRouter);

app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app;