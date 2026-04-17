// src/app.js

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const { swaggerUi, specs } = require("./docs/swagger");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Swagger (before routes or after, but before error handler is best)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// ✅ API routes
app.use("/api", routes);

// ✅ Error handler (always LAST)
app.use(errorMiddleware);

module.exports = app;