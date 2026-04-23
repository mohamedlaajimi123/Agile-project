# 🔐 Complete Authentication System for Horizon Backend

A production-ready authentication system built with Node.js, Express, PostgreSQL, and JWT tokens.

## 📋 Overview

This authentication system provides:
- ✅ Email/password login with JWT tokens
- ✅ Role-based access control (admin, professor, student)
- ✅ Protected API routes with middleware
- ✅ PostgreSQL database integration
- ✅ Bcrypt password hashing
- ✅ 1-day JWT expiry
- ✅ Rate limiting and security headers
- ✅ Comprehensive error handling

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd horizon-backend
npm install
```

### 2. Configure Environment Variables
```bash
cp .env.example .env
# Edit .env and set:
# JWT_SECRET=your-super-secret-key
# DB credentials
```

### 3. Set Up Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE horizon_db;

# Run schema
\connect horizon_db
\i DATABASE_SCHEMA.sql
```

### 4. Start Server
```bash
npm start
# Server runs on http://localhost:5000
```

### 5. Test Authentication
```bash
# Method 1: Run test script
node test-auth-system.js

# Method 2: Use curl
bash API_TESTING_GUIDE.sh

# Method 3: Manual with Postman/REST Client
# See API_TESTING_GUIDE.sh for examples
```

## 📁 Project Structure

```
src/
├── controllers/
│   ├── authController.js       # Login, getMe
│   ├── adminController.js      # Admin dashboard
│   ├── professorController.js  # Professor dashboard
│   └── studentController.js    # Student dashboard
├── routes/
│   ├── index.js                # Main router
│   ├── authRoutes.js           # Authentication routes
│   ├── adminRoutes.js          # Admin routes
│   ├── professorRoutes.js      # Professor routes
│   └── studentRoutes.js        # Student routes
├── middlewares/
│   ├── authMiddleware.js       # protect & authorize
│   ├── errorMiddleware.js      # Error handling
│   ├── validateRequest.js      # Request validation
│   └── roleMiddleware.js       # Role checking
├── services/
│   └── authService.js          # Authentication logic
├── models/
│   └── userModel.js            # User database queries
├── utils/
│   ├── jwt.js                  # Token generation
│   └── logger.js               # Logging
└── config/
    └── db.js                   # PostgreSQL pool

docs/
├── AUTHENTICATION_GUIDE.md          # Detailed guide
├── AUTHENTICATION_QUICK_REFERENCE.md # Quick reference
├── API_TESTING_GUIDE.sh             # Testing examples
├── DATABASE_SCHEMA.sql              # SQL schema
├── README.md                        # This file
└── test-auth-system.js              # Test script
```

## 🔑 Core Features

### 1. Login Endpoint
**POST** `/api/auth/login`

Request:
```json
{
  "email": "student@test.com",
  "password": "password123"
}
```

Response (200):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "full_name": "John Doe",
    "email": "student@test.com",
    "role": "student"
  }
}
```

### 2. Protected Routes
All dashboard routes require:
- ✅ Valid JWT token in `Authorization: Bearer <token>` header
- ✅ Correct role for the endpoint

**GET** `/api/admin/dashboard` - Admin only
**GET** `/api/professor/dashboard` - Professor only
**GET** `/api/students/dashboard` - Student only

### 3. Middleware Stack

**protect middleware** - Validates JWT token
```javascript
router.get("/dashboard", protect, controller.getDashboard);
```

**authorize middleware** - Checks user role
```javascript
router.get("/dashboard", protect, authorize("admin"), controller.getDashboard);
```

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);
```

### Students Table
```sql
CREATE TABLE students (
  student_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE,
  student_code VARCHAR(50) UNIQUE NOT NULL,
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

See [DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql) for complete schema.

## 🧪 Testing

### Automated Tests
```bash
# Run comprehensive test suite
node test-auth-system.js
```

### Manual Testing with Curl

**Login as Admin**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password123"}'
```

**Access Admin Dashboard**
```bash
TOKEN="your_jwt_token_here"
curl -X GET http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer $TOKEN"
```

**Test Forbidden Access**
```bash
# Use student token to access admin dashboard
curl -X GET http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer $STUDENT_TOKEN"
# Returns: 403 Forbidden
```

See [API_TESTING_GUIDE.sh](./API_TESTING_GUIDE.sh) for more examples.

## 🔐 Security Features

| Feature | Implementation |
|---------|-----------------|
| Password Hashing | bcrypt (10 rounds) |
| JWT Token | HS256 algorithm, 1 day expiry |
| Authorization | Role-based access control |
| Rate Limiting | 100 requests per 15 minutes |
| CORS | Enabled for cross-origin safety |
| Security Headers | Helmet middleware |
| SQL Injection | Parameterized queries |
| Token Validation | Verified against JWT_SECRET |

## ⚙️ Configuration

### Environment Variables
```env
# Authentication
JWT_SECRET=your-secret-key-here

# Database
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=horizon_db
DB_PORT=5432

# Server
NODE_ENV=development
PORT=5000

# Logging
LOG_LEVEL=info
```

## 📚 API Endpoints

| Method | Endpoint | Auth | Role | Status |
|--------|----------|------|------|--------|
| POST | `/api/auth/login` | ❌ | - | ✅ |
| GET | `/api/auth/me` | ✅ | - | ✅ |
| GET | `/api/admin/dashboard` | ✅ | admin | ✅ |
| GET | `/api/professor/dashboard` | ✅ | professor | ✅ |
| GET | `/api/students/dashboard` | ✅ | student | ✅ |
| GET | `/api/students` | ✅ | admin | ✅ |
| POST | `/api/students` | ✅ | admin | ✅ |
| GET | `/api/students/me` | ✅ | - | ✅ |

## 🚨 Error Handling

All errors return appropriate HTTP status codes:

```javascript
200 OK - Successful request
400 Bad Request - Invalid input (validation error)
401 Unauthorized - Missing or invalid token
403 Forbidden - Insufficient permissions (wrong role)
404 Not Found - Resource not found (user not found during login)
500 Internal Server Error - Server error
```

### Example Error Responses

**Missing Token (401)**
```json
{
  "error": "Not authorized, token missing"
}
```

**Invalid Token (401)**
```json
{
  "error": "Not authorized, invalid token"
}
```

**Wrong Role (403)**
```json
{
  "error": "Forbidden: not allowed"
}
```

**User Not Found (404)**
```json
{
  "error": "User not found"
}
```

## 📖 Additional Documentation

- [AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md) - Comprehensive guide with examples
- [AUTHENTICATION_QUICK_REFERENCE.md](./AUTHENTICATION_QUICK_REFERENCE.md) - Quick reference
- [DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql) - SQL schema and queries
- [API_TESTING_GUIDE.sh](./API_TESTING_GUIDE.sh) - Testing examples

## 🔄 Authentication Flow

```
1. User submits email & password
   ↓
2. Server validates credentials against database
   ↓
3. Password verified with bcrypt
   ↓
4. JWT token generated (id, role, 1-day expiry)
   ↓
5. Token returned to client
   ↓
6. Client includes token in Authorization header
   ↓
7. Server validates token with protect middleware
   ↓
8. User role checked with authorize middleware
   ↓
9. Route handler executes if authorized
   ↓
10. Response sent to client
```

## 🛠️ Development

### Add New Protected Route
```javascript
// 1. Add route with middleware
router.get("/dashboard", protect, authorize("student"), controller.getDashboard);

// 2. Implement controller
exports.getDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id; // From protect middleware
    // Your logic here
    res.json({ message: "Success" });
  } catch (err) {
    next(err);
  }
};
```

### Add New Role
1. Update `role` CHECK constraint in database schema
2. Update `authorize()` calls with new role
3. Create controller and routes for new role
4. Update test script with new role credentials

## 🐛 Troubleshooting

**Problem: "JWT_SECRET is not defined"**
```
Solution: Set JWT_SECRET in .env and restart server
```

**Problem: "User not found" on login**
```
Solution: Create test users in database or use DATABASE_SCHEMA.sql
```

**Problem: "Invalid token" on protected routes**
```
Solution: Check token format (Bearer prefix), check expiry, check JWT_SECRET
```

**Problem: "Forbidden: not allowed"**
```
Solution: Check user role in database, verify authorize() has correct role
```

**Problem: Database connection error**
```
Solution: Check DB credentials, verify PostgreSQL is running, check connection string
```

## 📝 Notes

- JWT tokens expire after **1 day**
- Passwords are hashed with **bcrypt (10 rounds)**
- Rate limit: **100 requests per 15 minutes** per IP
- All queries use **parameterized statements** (SQL injection safe)
- Use **HTTPS** in production
- Store JWT_SECRET in **environment variables** only
- Never commit `.env` file

## 📜 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📞 Support

For issues or questions, check:
1. [AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md)
2. [API_TESTING_GUIDE.sh](./API_TESTING_GUIDE.sh)
3. Error messages in server logs

---

**Last Updated**: 2026-04-23
**Status**: ✅ Production Ready
