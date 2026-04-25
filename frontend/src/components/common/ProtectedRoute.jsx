import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function getCurrentUser() {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) return null;
  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.error('Failed to parse stored user:', error);
    return null;
  }
}

export default function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();
  const { role: contextRole } = useAuth();
  const user = getCurrentUser();
  const role = user?.role || contextRole;

  console.log('PROTECTED ROUTE CHECK:', {
    user,
    role,
    allowedRoles,
    location,
  });

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const normalizedRole = role?.trim().toLowerCase();
  if (allowedRoles && !allowedRoles.includes(normalizedRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}