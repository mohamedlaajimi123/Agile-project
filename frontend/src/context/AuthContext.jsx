import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState('EN');
  
  // --- NEW: TOAST STATE ---
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setIsDark(savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      localStorage.setItem('theme', !prev ? 'dark' : 'light');
      return !prev;
    });
  };

  // --- NEW: TOAST GENERATOR ---
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    // Automatically clear the toast after 3 seconds
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ 
      user, 
      isDark, 
      toggleTheme, 
      language, 
      setLanguage, 
      login, 
      logout,
      // --- NEW: EXPOSE TOAST DATA ---
      toast,
      showToast 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);