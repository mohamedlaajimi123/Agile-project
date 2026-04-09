import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Import our new modular components
import AuthLayout from './AuthLayout';
import LoginForm from './LoginForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetSuccess from './ResetSuccess';

export default function HorizonLogin() {
  // We consolidated state down to one single "view" state: 'login', 'forgot', or 'success'
  const [currentView, setCurrentView] = useState('login');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleForgotPasswordSuccess = (email) => {
    setSubmittedEmail(email);
    setCurrentView('success');
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
    setSubmittedEmail('');
  };

  return (
    <AuthLayout>
      <AnimatePresence mode="wait">
        
        {currentView === 'login' && (
          <LoginForm onForgotPassword={() => setCurrentView('forgot')} />
        )}

        {currentView === 'forgot' && (
          <ForgotPasswordForm 
            onBack={handleBackToLogin} 
            onSuccess={handleForgotPasswordSuccess} 
          />
        )}

        {currentView === 'success' && (
          <ResetSuccess 
            email={submittedEmail} 
            onBack={handleBackToLogin} 
          />
        )}

      </AnimatePresence>
    </AuthLayout>
  );
}