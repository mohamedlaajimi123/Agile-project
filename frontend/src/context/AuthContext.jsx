import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const AuthContext = createContext(undefined);

// 1. Define the Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('horizon_user');
    return savedUser ? JSON.parse(savedUser) : null;
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

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('horizon_user', JSON.stringify(userData));
    showToast(`Welcome, ${userData.name}!`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('horizon_user');
    showToast("Logged out successfully", "info");
  };

  // 2. Wrap the value in useMemo. 
  // Vite often triggers reloads if it thinks the "value" object is unstable.
  const contextValue = useMemo(() => ({
    user,
    isDark,
    toggleTheme,
    language,
    setLanguage,
    login,
    logout,
    toast,
    showToast,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isProfessor: user?.role === 'professor',
    isStudent: user?.role === 'student'
  }), [user, isDark, language, toast]);

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