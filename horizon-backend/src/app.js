const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const { swaggerUi, specs } = require("./docs/swagger");

const app = express();

// ✅ CORS (simple and safe)
app.use(cors());

// ✅ JSON
app.use(express.json());

// ✅ Routes
app.use("/api", routes);

// ✅ Swagger (ONLY ONCE)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// ✅ Error handler
app.use(errorMiddleware);

module.exports = app;