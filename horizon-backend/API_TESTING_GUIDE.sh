#!/bin/bash
# Authentication System - API Testing Guide
# Use these curl commands to test the authentication system
# Make sure backend is running on http://localhost:5000

API_URL="http://localhost:5000/api"
ADMIN_TOKEN=""
PROFESSOR_TOKEN=""
STUDENT_TOKEN=""

echo "=========================================="
echo "Authentication System - API Testing Guide"
echo "=========================================="
echo ""

# ========================================
# 1. HEALTH CHECK
# ========================================
echo "1️⃣ Testing Health Check..."
echo "Endpoint: GET /api/health"
echo ""

curl -X GET "$API_URL/health" \
  -H "Content-Type: application/json" \
  -w "\nStatus: %{http_code}\n\n"

# ========================================
# 2. LOGIN TESTS
# ========================================
echo "2️⃣ Testing Admin Login..."
echo "Endpoint: POST /api/auth/login"
echo "Payload: {\"email\": \"admin@test.com\", \"password\": \"password123\"}"
echo ""

ADMIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password123"}')

echo "$ADMIN_RESPONSE" | jq '.'
ADMIN_TOKEN=$(echo "$ADMIN_RESPONSE" | jq -r '.token')

echo ""
echo "3️⃣ Testing Professor Login..."
echo "Endpoint: POST /api/auth/login"
echo "Payload: {\"email\": \"professor@test.com\", \"password\": \"password123\"}"
echo ""

PROFESSOR_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"professor@test.com","password":"password123"}')

echo "$PROFESSOR_RESPONSE" | jq '.'
PROFESSOR_TOKEN=$(echo "$PROFESSOR_RESPONSE" | jq -r '.token')

echo ""
echo "4️⃣ Testing Student Login..."
echo "Endpoint: POST /api/auth/login"
echo "Payload: {\"email\": \"student@test.com\", \"password\": \"password123\"}"
echo ""

STUDENT_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"student@test.com","password":"password123"}')

echo "$STUDENT_RESPONSE" | jq '.'
STUDENT_TOKEN=$(echo "$STUDENT_RESPONSE" | jq -r '.token')

echo ""
echo "✅ Tokens Retrieved:"
echo "   Admin Token: ${ADMIN_TOKEN:0:20}..."
echo "   Professor Token: ${PROFESSOR_TOKEN:0:20}..."
echo "   Student Token: ${STUDENT_TOKEN:0:20}..."
echo ""

# ========================================
# 3. GET CURRENT USER (ME ENDPOINT)
# ========================================
echo "5️⃣ Testing Get Current User (ME Endpoint)..."
echo "Endpoint: GET /api/auth/me"
echo ""

curl -s -X GET "$API_URL/auth/me" \
  -H "Authorization: Bearer $STUDENT_TOKEN" \
  -H "Content-Type: application/json" | jq '.'

echo ""

# ========================================
# 4. ADMIN DASHBOARD
# ========================================
echo "6️⃣ Testing Admin Dashboard..."
echo "Endpoint: GET /api/admin/dashboard"
echo "Auth: Admin Token"
echo ""

curl -s -X GET "$API_URL/admin/dashboard" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" | jq '.'

echo ""

# ========================================
# 5. PROFESSOR DASHBOARD
# ========================================
echo "7️⃣ Testing Professor Dashboard..."
echo "Endpoint: GET /api/professor/dashboard"
echo "Auth: Professor Token"
echo ""

curl -s -X GET "$API_URL/professor/dashboard" \
  -H "Authorization: Bearer $PROFESSOR_TOKEN" \
  -H "Content-Type: application/json" | jq '.'

echo ""

# ========================================
# 6. STUDENT DASHBOARD
# ========================================
echo "8️⃣ Testing Student Dashboard..."
echo "Endpoint: GET /api/students/dashboard"
echo "Auth: Student Token"
echo ""

curl -s -X GET "$API_URL/students/dashboard" \
  -H "Authorization: Bearer $STUDENT_TOKEN" \
  -H "Content-Type: application/json" | jq '.'

echo ""

# ========================================
# 7. AUTHORIZATION TESTS (Wrong Role)
# ========================================
echo "9️⃣ Testing Authorization (Wrong Role)..."
echo "Attempting: Student accessing Admin Dashboard"
echo "Endpoint: GET /api/admin/dashboard"
echo "Auth: Student Token (Should be Forbidden)"
echo ""

curl -s -X GET "$API_URL/admin/dashboard" \
  -H "Authorization: Bearer $STUDENT_TOKEN" \
  -H "Content-Type: application/json" -w "\nStatus: %{http_code}\n"

echo ""

# ========================================
# 8. AUTHENTICATION TESTS (No Token)
# ========================================
echo "🔟 Testing Authentication (Missing Token)..."
echo "Endpoint: GET /api/admin/dashboard"
echo "Auth: No Token (Should be Unauthorized)"
echo ""

curl -s -X GET "$API_URL/admin/dashboard" \
  -H "Content-Type: application/json" -w "\nStatus: %{http_code}\n"

echo ""

# ========================================
# 9. AUTHENTICATION TESTS (Invalid Token)
# ========================================
echo "1️⃣1️⃣ Testing Authentication (Invalid Token)..."
echo "Endpoint: GET /api/admin/dashboard"
echo "Auth: Invalid Token (Should be Unauthorized)"
echo ""

curl -s -X GET "$API_URL/admin/dashboard" \
  -H "Authorization: Bearer invalid_token_12345" \
  -H "Content-Type: application/json" -w "\nStatus: %{http_code}\n"

echo ""

# ========================================
# 10. LOGIN WITH WRONG CREDENTIALS
# ========================================
echo "1️⃣2️⃣ Testing Login with Wrong Credentials..."
echo "Endpoint: POST /api/auth/login"
echo "Payload: {\"email\": \"test@test.com\", \"password\": \"wrongpassword\"}"
echo ""

curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"wrongpassword"}' \
  -w "\nStatus: %{http_code}\n" | jq '.'

echo ""

# ========================================
# 11. GET ALL STUDENTS (Admin Only)
# ========================================
echo "1️⃣3️⃣ Testing Get All Students (Admin Only)..."
echo "Endpoint: GET /api/students"
echo "Auth: Admin Token"
echo ""

curl -s -X GET "$API_URL/students" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" | jq '.'

echo ""

# ========================================
# 12. GET STUDENT PROFILE
# ========================================
echo "1️⃣4️⃣ Testing Get Student Profile..."
echo "Endpoint: GET /api/students/me"
echo "Auth: Student Token"
echo ""

curl -s -X GET "$API_URL/students/me" \
  -H "Authorization: Bearer $STUDENT_TOKEN" \
  -H "Content-Type: application/json" | jq '.'

echo ""

# ========================================
# SUMMARY
# ========================================
echo "=========================================="
echo "✅ Testing Complete!"
echo "=========================================="
echo ""
echo "Summary:"
echo "✓ Health check"
echo "✓ Login endpoints (admin, professor, student)"
echo "✓ Get current user (ME endpoint)"
echo "✓ Dashboard access by role"
echo "✓ Authorization checks (wrong role)"
echo "✓ Authentication checks (missing/invalid token)"
echo "✓ Error handling"
echo ""
echo "Expected Results:"
echo "- All login endpoints should return 200 with token"
echo "- All dashboard endpoints with correct token should return 200"
echo "- Wrong role access should return 403 Forbidden"
echo "- Missing/invalid token should return 401 Unauthorized"
echo "- Health check should show database: connected"
echo ""

# ========================================
# NOTES FOR MANUAL TESTING
# ========================================
cat << 'EOF'

ALTERNATIVE TESTING METHODS:

1. Using Postman:
   - Import the curl examples above
   - Set variables: {{API_URL}}, {{ADMIN_TOKEN}}, {{STUDENT_TOKEN}}, {{PROFESSOR_TOKEN}}
   - Create test collection for each endpoint

2. Using REST Client VSCode Extension:
   Create a file called requests.http with the following format:
   
   ### Health Check
   GET http://localhost:5000/api/health
   
   ### Admin Login
   POST http://localhost:5000/api/auth/login
   Content-Type: application/json
   
   {
     "email": "admin@test.com",
     "password": "password123"
   }
   
   ### Admin Dashboard
   @token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   GET http://localhost:5000/api/admin/dashboard
   Authorization: Bearer @token

3. Using Thunder Client VSCode Extension:
   - Similar to REST Client
   - Visual interface for managing requests
   - Built-in response formatting

4. Command Line with jq:
   Save this file and run: bash api-tests.sh
   (Already provided above)

5. Node.js Script:
   Use the provided test-auth-system.js file:
   node test-auth-system.js

EOF

echo ""
