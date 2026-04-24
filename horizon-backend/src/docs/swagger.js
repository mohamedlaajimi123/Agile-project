const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Horizon API",
      version: "1.0.0",
      description: "Swagger documentation for the Horizon Exam System API.",
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
            id: { type: "integer", example: 1 },
            full_name: { type: "string", example: "Jane Doe" },
            email: { type: "string", format: "email", example: "jane.doe@example.com" },
            role: { type: "string", example: "student" },
          },
        },
        AuditLog: {
          type: "object",
          properties: {
            id: { type: "integer", example: 101 },
            user_id: { type: "integer", example: 1 },
            action: { type: "string", example: "UPDATE" },
            entity: { type: "string", example: "course" },
            entity_id: { type: "integer", example: 42 },
            details: {
              type: "object",
              additionalProperties: true,
              example: { changedFields: ["title", "description"] },
            },
            created_at: { type: "string", format: "date-time", example: "2026-04-24T10:00:00Z" },
          },
        },
        Course: {
          type: "object",
          properties: {
            id: { type: "integer", example: 12 },
            name: { type: "string", example: "Database Systems" },
            professor_id: { type: "integer", example: 5 },
          },
        },
        Exam: {
          type: "object",
          properties: {
            id: { type: "integer", example: 14 },
            course_id: { type: "integer", example: 12 },
            date: { type: "string", format: "date-time", example: "2026-06-01T09:00:00Z" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string", example: "Unauthorized" },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: { error: "Unauthorized" },
            },
          },
        },
        ForbiddenError: {
          description: "Forbidden",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: { error: "Forbidden: not allowed" },
            },
          },
        },
        ServerError: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: { error: "Something went wrong" },
            },
          },
        },
      },
      requestBodies: {
        LoginRequest: {
          description: "Credentials used to log in",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", format: "email", example: "admin@test.com" },
                  password: { type: "string", example: "password123" },
                },
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      { name: "Auth", description: "Authentication endpoints" },
      { name: "SuperAdmin", description: "Superadmin management and audit endpoints" },
      { name: "Professor", description: "Professor dashboard and actions" },
      { name: "Admin", description: "Admin dashboard and management" },
      { name: "Student", description: "Student dashboard and data" },
      { name: "Courses", description: "Course management endpoints" },
      { name: "Exams", description: "Exam management endpoints" },
      { name: "Grades", description: "Grade management endpoints" },
      { name: "Users", description: "User account management" },
      { name: "Analytics", description: "Analytics and reporting" },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };