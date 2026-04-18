import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Components
import Toast from './components/common/Toast';
import ProtectedRoute from './components/common/ProtectedRoute'; 

// Pages
import HorizonLogin from './pages/Login/HorizonLogin'; 
import StudentPortal from './pages/StudentPortal';
import ProfessorPortal from './pages/ProfessorPortal';
import AdminPortal from './pages/AdminPortal';
import SuperAdminPortal from './pages/SuperAdminPortal';

export default function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Router>
      <Toast />

      <Routes>
        {/* --- CURRENT DEVELOPMENT ROUTES (OPEN ACCESS) --- */}
        <Route path="/" element={<HorizonLogin />} />
        <Route path="/student/*" element={<StudentPortal />} />
        <Route path="/professor/*" element={<ProfessorPortal />} />
        <Route path="/admin/*" element={<AdminPortal />} />
        
        {/* FIXED: Correct spelling and added leading slash */}
        <Route path="/superadmin/*" element={<SuperAdminPortal />} />
        
        {/* FIXED: Fallback MUST be the very last route */}
        <Route path="*" element={<Navigate to="/" replace />} />
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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
*/