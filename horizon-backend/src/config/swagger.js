const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Horizon API",
      version: "1.0.0",
      description: "API documentation for Horizon system",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // where swagger reads docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;