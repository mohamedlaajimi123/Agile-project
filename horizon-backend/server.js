// server.js
require("dotenv").config();
const app = require("./src/app");
const logger = require("./src/utils/logger");

app.listen(process.env.PORT, () => {
  logger.info(`Server running on port ${process.env.PORT}`);
});