import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const AuthContext = createContext(undefined);

// 1. Define the Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Try to load user from localStorage on mount
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem('role') || null;
  });

  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  const [language, setLanguage] = useState('EN');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Backend-compatible login handler
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setRole(userData.role);
    
    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
    localStorage.setItem('role', userData.role);
    
    showToast(`Welcome, ${userData.full_name}!`);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    showToast("Logged out successfully", "info");
  };

  // 2. Wrap the value in useMemo. 
  // Vite often triggers reloads if it thinks the "value" object is unstable.
  const contextValue = useMemo(() => ({
    user,
    token,
    role,
    isDark,
    toggleTheme,
    language,
    setLanguage,
    login,
    logout,
    toast,
    showToast,
    isAuthenticated: !!token && !!user,
    isAdmin: role === 'admin',
    isProfessor: role === 'professor',
    isStudent: role === 'student'
  }), [user, token, role, isDark, language, toast]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Define the hook as a plain function
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// 4. Export the hook
export { useAuth };