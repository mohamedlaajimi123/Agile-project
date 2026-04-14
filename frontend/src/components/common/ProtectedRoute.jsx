import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // 1. If not logged in, send to login page
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 2. If logged in but wrong role, send to a "Forbidden" or back to their own portal
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // You could create a /unauthorized page, but for now, we'll just kick them back
    return <Navigate to="/" replace />;
  }

  return children;
}