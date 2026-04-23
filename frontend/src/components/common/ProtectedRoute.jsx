import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();
  
  // Check token from localStorage as primary source
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  // 1. If not logged in (no token), send to login page
  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 2. If logged in but wrong role, send to login
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}