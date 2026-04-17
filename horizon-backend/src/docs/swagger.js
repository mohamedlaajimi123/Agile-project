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

  schemas: {
    User: {
      type: "object",
      properties: {
        user_id: { type: "integer", example: 1 },
        full_name: { type: "string", example: "John Doe" },
        email: { type: "string", example: "john@test.com" },
        role: { type: "string", example: "student" },
      },
    },

    Student: {
      type: "object",
      properties: {
        student_id: { type: "integer", example: 1 },
        user_id: { type: "integer", example: 1 },
        student_code: { type: "string", example: "STU001" },
        full_name: { type: "string", example: "John Doe" },
        email: { type: "string", example: "john@test.com" },
      },
    },

    AuthResponse: {
      type: "object",
      properties: {
        token: { type: "string", example: "jwt_token_here" },
        user: {
          $ref: "#/components/schemas/User",
        },
      },
    },
  },
},
    // 🔥 THIS IS THE MISSING PART
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
  { name: "Auth", description: "Authentication endpoints" },
  { name: "Students", description: "Student operations" },
  { name: "Admin", description: "Admin operations" },
  { name: "Professor", description: "Professor operations" },
],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJSDoc(options);

module.exports = { swaggerUi, specs };