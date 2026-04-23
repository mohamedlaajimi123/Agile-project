-- Database Schema for Authentication System
-- Run these SQL commands to set up required tables

-- ========================================
-- USERS TABLE (Core Authentication)
-- ========================================

CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'professor', 'student', 'superadmin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Create index on email for faster login queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ========================================
-- STUDENTS TABLE (Student-specific data)
-- ========================================

CREATE TABLE IF NOT EXISTS students (
  student_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE,
  student_code VARCHAR(50) UNIQUE NOT NULL,
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create indexes for faster queries
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_student_code ON students(student_code);

-- ========================================
-- STUDENT_CLASSES TABLE (Enrollment tracking)
-- ========================================

CREATE TABLE IF NOT EXISTS student_classes (
  enrollment_id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL,
  class_id INTEGER NOT NULL,
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_student_classes_student ON student_classes(student_id);
CREATE INDEX idx_student_classes_class ON student_classes(class_id);

-- ========================================
-- SAMPLE TEST DATA
-- ========================================

-- Add test users with hashed passwords
-- Password: password123 (bcrypt hash - replace with actual hash in production)

INSERT INTO users (full_name, email, password_hash, role) 
VALUES 
  ('Admin User', 'admin@test.com', '$2b$10$...', 'admin'),
  ('Professor User', 'professor@test.com', '$2b$10$...', 'professor'),
  ('Student User', 'student@test.com', '$2b$10$...', 'student')
ON CONFLICT (email) DO NOTHING;

-- Add sample student records
INSERT INTO students (user_id, student_code)
SELECT user_id, CONCAT('STU', LPAD(user_id::text, 4, '0'))
FROM users 
WHERE role = 'student'
ON CONFLICT (student_code) DO NOTHING;

-- ========================================
-- HELPFUL QUERIES
-- ========================================

-- Get user with their role
SELECT user_id, full_name, email, role FROM users WHERE email = 'student@test.com';

-- Get student info with user details
SELECT 
  u.user_id, 
  u.full_name, 
  u.email, 
  s.student_code,
  COUNT(sc.enrollment_id) as enrolled_courses
FROM users u
LEFT JOIN students s ON u.user_id = s.user_id
LEFT JOIN student_classes sc ON s.student_id = sc.student_id
WHERE u.email = 'student@test.com'
GROUP BY u.user_id, s.student_id;

-- Count users by role
SELECT role, COUNT(*) as count FROM users GROUP BY role;

-- Get all enrolled students for a class
SELECT 
  u.full_name, 
  u.email, 
  s.student_code
FROM users u
JOIN students s ON u.user_id = s.user_id
JOIN student_classes sc ON s.student_id = sc.student_id
WHERE sc.class_id = 1;

-- ========================================
-- GENERATING BCRYPT HASHES
-- ========================================

-- To generate bcrypt hashes for passwords, use bcrypt library:
-- Node.js:
--   const bcrypt = require('bcrypt');
--   bcrypt.hash('password123', 10).then(hash => console.log(hash));

-- Example output:
--   $2b$10$PUkFHcPPvq5zcVKnxhzGDu.vEkJ.RV5m3cKd7vLs8R4v2h3cFqT2.

-- ========================================
-- MIGRATION NOTES
-- ========================================

/*
1. Run all CREATE TABLE statements in order
2. Generate bcrypt hashes for test passwords
3. Insert test data with actual bcrypt hashes
4. Verify tables with: SELECT * FROM information_schema.tables WHERE table_schema='public';
5. Check indexes with: SELECT * FROM pg_indexes WHERE schemaname='public';
*/

-- ========================================
-- BACKUP & RESTORE
-- ========================================

-- Backup database:
-- pg_dump -U postgres -h localhost -d horizon_db -f backup.sql

-- Restore database:
-- psql -U postgres -h localhost -d horizon_db -f backup.sql

-- ========================================
-- PERFORMANCE OPTIMIZATION
-- ========================================

-- Analyze tables for query optimization
ANALYZE users;
ANALYZE students;
ANALYZE student_classes;

-- Vacuum to clean up dead tuples
VACUUM ANALYZE users;
VACUUM ANALYZE students;
VACUUM ANALYZE student_classes;
