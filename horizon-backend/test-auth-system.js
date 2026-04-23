// test-auth-system.js
// Script to test the complete authentication system
// Run with: node test-auth-system.js

const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

// Test credentials
const testUsers = {
  student: { email: 'student@test.com', password: 'password123' },
  professor: { email: 'professor@test.com', password: 'password123' },
  admin: { email: 'admin@test.com', password: 'password123' },
};

let tokens = {};

// Color output for better readability
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(type, message) {
  const typeColors = {
    success: colors.green,
    error: colors.red,
    info: colors.blue,
    test: colors.yellow,
  };
  console.log(`${typeColors[type] || colors.reset}[${type.toUpperCase()}] ${message}${colors.reset}`);
}

async function testLogin() {
  log('test', '=== TESTING LOGIN ENDPOINTS ===');

  for (const [role, credentials] of Object.entries(testUsers)) {
    try {
      log('info', `Testing ${role} login...`);
      const response = await axios.post(`${API_BASE}/auth/login`, credentials);

      tokens[role] = response.data.token;

      log('success', `✓ ${role.toUpperCase()} Login successful`);
      log('info', `  Token: ${response.data.token.substring(0, 20)}...`);
      log('info', `  User: ${response.data.user.full_name} (${response.data.user.role})`);
    } catch (error) {
      if (error.response?.status === 404) {
        log('error', `✗ ${role.toUpperCase()} not found - Create test user first`);
      } else if (error.response?.status === 401) {
        log('error', `✗ ${role.toUpperCase()} invalid credentials`);
      } else {
        log('error', `✗ ${role.toUpperCase()} login failed: ${error.message}`);
      }
    }
  }
}

async function testProtectedRoutes() {
  log('test', '\n=== TESTING PROTECTED ROUTES ===');

  const routes = {
    'Admin Dashboard': { path: '/admin/dashboard', role: 'admin' },
    'Professor Dashboard': { path: '/professor/dashboard', role: 'professor' },
    'Student Dashboard': { path: '/students/dashboard', role: 'student' },
  };

  for (const [name, { path, role }] of Object.entries(routes)) {
    try {
      if (!tokens[role]) {
        log('error', `✗ ${name} - No token available for ${role}`);
        continue;
      }

      log('info', `Testing ${name}...`);
      const response = await axios.get(`${API_BASE}${path}`, {
        headers: { Authorization: `Bearer ${tokens[role]}` },
      });

      log('success', `✓ ${name} accessible`);
      log('info', `  Response: ${JSON.stringify(response.data).substring(0, 100)}...`);
    } catch (error) {
      if (error.response?.status === 401) {
        log('error', `✗ ${name} - Unauthorized (invalid/missing token)`);
      } else if (error.response?.status === 403) {
        log('error', `✗ ${name} - Forbidden (wrong role)`);
      } else {
        log('error', `✗ ${name} - ${error.message}`);
      }
    }
  }
}

async function testUnauthorizedAccess() {
  log('test', '\n=== TESTING UNAUTHORIZED ACCESS ===');

  // Test 1: Missing token
  try {
    log('info', 'Testing access without token...');
    await axios.get(`${API_BASE}/admin/dashboard`);
    log('error', '✗ Should have failed without token');
  } catch (error) {
    if (error.response?.status === 401) {
      log('success', '✓ Correctly rejected request without token');
    } else {
      log('error', `✗ Unexpected error: ${error.message}`);
    }
  }

  // Test 2: Invalid token
  try {
    log('info', 'Testing access with invalid token...');
    await axios.get(`${API_BASE}/admin/dashboard`, {
      headers: { Authorization: 'Bearer invalid_token_123' },
    });
    log('error', '✗ Should have failed with invalid token');
  } catch (error) {
    if (error.response?.status === 401) {
      log('success', '✓ Correctly rejected invalid token');
    } else {
      log('error', `✗ Unexpected error: ${error.message}`);
    }
  }

  // Test 3: Wrong role
  if (tokens.student) {
    try {
      log('info', 'Testing student access to admin dashboard...');
      await axios.get(`${API_BASE}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${tokens.student}` },
      });
      log('error', '✗ Should have forbidden student access to admin dashboard');
    } catch (error) {
      if (error.response?.status === 403) {
        log('success', '✓ Correctly rejected wrong role access');
      } else if (error.response?.status === 401) {
        log('info', '  (Test skipped - invalid token)');
      } else {
        log('error', `✗ Unexpected error: ${error.message}`);
      }
    }
  }
}

async function testGetMe() {
  log('test', '\n=== TESTING GET ME ENDPOINT ===');

  if (tokens.student) {
    try {
      log('info', 'Fetching current user info...');
      const response = await axios.get(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${tokens.student}` },
      });

      log('success', '✓ Get me endpoint working');
      log('info', `  User ID: ${response.data.user.id}`);
      log('info', `  User Role: ${response.data.user.role}`);
    } catch (error) {
      log('error', `✗ Get me failed: ${error.message}`);
    }
  }
}

async function runAllTests() {
  log('info', '🚀 Starting Authentication System Tests...\n');

  await testLogin();
  await testProtectedRoutes();
  await testUnauthorizedAccess();
  await testGetMe();

  log('test', '\n=== TEST SUITE COMPLETED ===');
  log('info', 'Check results above for any failures.');
}

// Run tests with error handling
runAllTests().catch((error) => {
  log('error', `Fatal error: ${error.message}`);
  process.exit(1);
});
