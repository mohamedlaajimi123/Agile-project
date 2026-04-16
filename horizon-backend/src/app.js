// src/app.js
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const { swaggerUi, specs } = require("./docs/swagger");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use(errorMiddleware);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
module.exports = app;