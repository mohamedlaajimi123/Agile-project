const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const routes = require("./routes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const { swaggerUi, specs } = require("./docs/swagger");

const app = express();

// ✅ CORS (simple and safe)
app.use(cors());

// ✅ Security headers
app.use(helmet());

// ✅ Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// ✅ JSON
app.use(express.json());

// ✅ Routes
app.use("/api", routes);

// ✅ Swagger (ONLY ONCE)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// ✅ Error handler
app.use(errorMiddleware);

module.exports = app;