// server.js
require("dotenv").config();
const app = require("./src/app");
const logger = require("./src/utils/logger");
const PORT = process.env.PORT || 5000;
console.log("ENV TEST:", process.env.PORT); // 👈 add this
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});