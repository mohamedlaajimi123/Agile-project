const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Horizon API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    // 🔥 THIS IS THE MISSING PART
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJSDoc(options);

module.exports = { swaggerUi, specs };