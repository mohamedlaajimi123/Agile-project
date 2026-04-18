const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Horizon Academic API",
      version: "1.0.0",
      description: "University Management System API",
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

      schemas: {
        Course: {
          type: "object",
          properties: {
            course_id: { type: "integer" },
            title: { type: "string" },
            code: { type: "string" },
          },
        },

        Class: {
          type: "object",
          properties: {
            class_id: { type: "integer" },
            name: { type: "string" },
            semester_id: { type: "integer" },
          },
        },

        Student: {
          type: "object",
          properties: {
            student_id: { type: "integer" },
            full_name: { type: "string" },
            email: { type: "string" },
          },
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };