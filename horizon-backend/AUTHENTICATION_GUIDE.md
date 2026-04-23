# Authentication System Guide

## Overview
This document describes the complete authentication system for the Horizon backend.

## Architecture

### 1. JWT Token Generation
- **File**: `src/utils/jwt.js`
- **Function**: `generateToken(user)`
- **Payload**: `{ id: user.user_id, role: user.role }`
- **Expiry**: 1 day
- **Secret**: Stored in `process.env.JWT_SECRET`

### 2. Login Flow
- **Endpoint**: `POST /api/auth/login`
- **File**: `src/controllers/authController.js`
- **Service**: `src/services/authService.js`

**Process**:
1. Receive email and password from request body
2. Query database for user by email
3. If user not found → Return 404 (via error handler)
4. Compare provided password with hashed password using bcrypt
5. If password incorrect → Return 401 (via error handler)
6. If valid → Generate JWT token and return `{ token, role, user }`

**Error Responses**:
- 404: User not found
- 401: Invalid credentials
- 200: Successful login

### 3. Authentication Middleware
- **File**: `src/middlewares/authMiddleware.js`
- **Middleware**: `protect`

**Functionality**:
1. Extract token from `Authorization: Bearer <token>` header
2. If token missing → Return 401
3. If token invalid → Return 401
4. If valid → Verify token using `JWT_SECRET`
5. Attach decoded user (`req.user`) containing `{ id, role }`
6. Call `next()` to proceed to next middleware/route

**Usage**:
```javascript
router.get("/dashboard", protect, controller.getDashboard);
```

### 4. Authorization Middleware
- **File**: `src/middlewares/authMiddleware.js`
- **Middleware**: `authorize(...roles)`

**Functionality**:
1. Check if `req.user` exists (set by protect middleware)
2. Check if user role matches any allowed roles
3. If role mismatch → Return 403 (Forbidden)
4. If role matches → Call `next()` to proceed

**Usage**:
```javascript
router.get("/dashboard", protect, authorize("admin"), controller.getDashboard);
router.get("/dashboard", protect, authorize("student", "professor"), controller.getDashboard);
```

## Dashboard Routes

### Admin Dashboard
- **Endpoint**: `GET /api/admin/dashboard`
- **Route File**: `src/routes/adminRoutes.js`
- **Controller**: `src/controllers/adminController.js`
- **Middleware**: `protect`, `authorize("admin")`
- **Response**: Admin statistics (total users, total students, etc.)

### Professor Dashboard
- **Endpoint**: `GET /api/professor/dashboard`
- **Route File**: `src/routes/professorRoutes.js`
- **Controller**: `src/controllers/professorController.js`
- **Middleware**: `protect`, `authorize("professor")`
- **Response**: Professor dashboard data

### Student Dashboard
- **Endpoint**: `GET /api/students/dashboard`
- **Route File**: `src/routes/studentRoutes.js`
- **Controller**: `src/controllers/studentController.js`
- **Middleware**: `protect`, `authorize("student")`
- **Response**: Student dashboard data with enrolled courses count

## Database Integration

### User Table
The system expects a `users` table with the following columns:
- `user_id` (PRIMARY KEY)
- `email` (UNIQUE)
- `password_hash` (bcrypt hashed)
- `full_name`
- `role` ('admin', 'professor', 'student', 'superadmin')

### Student Table
- `student_id` (PRIMARY KEY)
- `user_id` (FOREIGN KEY -> users.user_id)
- `student_code`

### Student Classes Table
- `student_id` (FOREIGN KEY -> students.student_id)
- Other class-related fields

## Usage Examples

### 1. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@test.com",
    "password": "password123"
  }'
```

**Response**:
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

### 2. Access Protected Route
```bash
curl -X GET http://localhost:5000/api/students/dashboard \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response**:
```json
{
  "message": "Student dashboard loaded successfully",
  "student": {
    "id": 1,
    "name": "John Doe",
    "email": "student@test.com",
    "studentCode": "STU001"
  },
  "enrolledCourses": 3
}
```

### 3. Unauthorized Access (Wrong Role)
```bash
curl -X GET http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer <student_token>"
```

**Response** (403 Forbidden):
```json
{
  "error": "Forbidden: not allowed"
}
```

## Environment Variables Required

```env
JWT_SECRET=your_secret_key_here
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=horizon_db
DB_PORT=5432
NODE_ENV=development
```

## Error Handling

All errors are handled by the centralized error middleware at `src/middlewares/errorMiddleware.js`.

### Common Error Responses

| Status | Error | Cause |
|--------|-------|-------|
| 401 | Not authorized, token missing | No Authorization header provided |
| 401 | Not authorized, invalid token | Token expired or invalid |
| 401 | No user found | User not found in request |
| 403 | Forbidden: not allowed | User role doesn't match requirement |
| 404 | User not found | Email doesn't exist during login |
| 401 | Invalid credentials | Password mismatch during login |

## Security Features

1. **Password Security**: Passwords are hashed using bcrypt
2. **JWT Expiry**: Tokens expire after 1 day
3. **Role-Based Access**: Fine-grained authorization by role
4. **Token Validation**: All tokens validated against JWT_SECRET
5. **Rate Limiting**: Express rate limiter configured (15 min, 100 requests per IP)
6. **CORS**: Enabled for cross-origin requests
7. **Helmet**: Security headers applied

## Testing the System

### Prerequisites
1. PostgreSQL database running
2. Environment variables configured
3. Backend server running on http://localhost:5000

### Test Sequence

1. **Create a test user** (assuming you have a signup endpoint)
   ```bash
   POST /api/auth/login
   ```

2. **Login with credentials**
   ```bash
   POST /api/auth/login with email and password
   ```

3. **Use token to access protected routes**
   ```bash
   GET /api/admin/dashboard with Bearer token
   GET /api/professor/dashboard with Bearer token
   GET /api/students/dashboard with Bearer token
   ```

4. **Test unauthorized access**
   - Try accessing admin route with student token (should return 403)
   - Try accessing routes without token (should return 401)
   - Try accessing with invalid token (should return 401)

## File Structure

```
src/
├── controllers/
│   ├── authController.js       # Login and getMe endpoints
│   ├── adminController.js      # Admin dashboard
│   ├── professorController.js  # Professor dashboard
│   └── studentController.js    # Student dashboard
├── routes/
│   ├── authRoutes.js           # /api/auth/* routes
│   ├── adminRoutes.js          # /api/admin/* routes
│   ├── professorRoutes.js      # /api/professor/* routes
│   └── studentRoutes.js        # /api/students/* routes
├── middlewares/
│   ├── authMiddleware.js       # protect and authorize
│   └── errorMiddleware.js      # Error handling
├── services/
│   └── authService.js          # Login logic
├── models/
│   └── userModel.js            # Database queries
├── utils/
│   └── jwt.js                  # Token generation
└── config/
    └── db.js                   # PostgreSQL pool
```

## Next Steps

1. Ensure JWT_SECRET is set in environment variables
2. Create database tables (users, students, student_classes)
3. Test login functionality
4. Test protected routes with valid tokens
5. Test authorization with different roles
6. Implement refresh token mechanism (optional)
7. Add logout functionality (optional)
