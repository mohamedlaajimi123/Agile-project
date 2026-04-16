// src/docs/swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const specs = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Horizon API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js"],
});

module.exports = { swaggerUi, specs };