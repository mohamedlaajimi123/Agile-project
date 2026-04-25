import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Components
import Toast from './components/common/Toast';
import ProtectedRoute from './components/common/ProtectedRoute'; 

// Pages
import HorizonLogin from './pages/Login/HorizonLogin'; 
import AdminPortal from './pages/AdminPortal';
import ProfessorPortal from './pages/ProfessorPortal';
import StudentPortal from './pages/StudentPortal';
import SuperAdminPortal from './pages/SuperAdminPortal';

export default function App() {
  return (
    <Router>
      <Toast />

      <Routes>
        
        {/* Login Route */}
        <Route path="/" element={<HorizonLogin />} />
        <Route path="/login" element={<HorizonLogin />} />

        {/* Protected Dashboard Routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPortal />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/professor/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['professor']}>
              <ProfessorPortal />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentPortal />
            </ProtectedRoute>
          } 
        />

        {/* Fallback portal routes (for backwards compatibility) */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPortal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/professor/*"
          element={
            <ProtectedRoute allowedRoles={['professor']}>
              <ProfessorPortal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentPortal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['superadmin']}>
              <SuperAdminPortal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin/*"
          element={
            <ProtectedRoute allowedRoles={['superadmin']}>
              <SuperAdminPortal />
            </ProtectedRoute>
          }
        />
        
        {/* Fallback: redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

/* ==========================================================================
  BACKEND TEAM: PRODUCTION SECURITY TEMPLATE
  Once Auth and Roles are implemented, replace the <Routes> section 
  above with the code below. 
  ==========================================================================

  return (
    <Router>
      <Toast />

      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Navigate to={`/${user.role}`} replace />
            ) : (
              <HorizonLogin />
            )
          } 
        />

        <Route 
          path="/student/*" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentPortal />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/professor/*" 
          element={
            <ProtectedRoute allowedRoles={['professor']}>
              <ProfessorPortal />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPortal />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/superadmin/*" 
          element={
            <ProtectedRoute allowedRoles={['superadmin']}>
              <SuperAdminPortal />
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
*/