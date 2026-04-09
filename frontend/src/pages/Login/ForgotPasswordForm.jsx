import React, { useState } from 'react';
import { Mail, ChevronLeft, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ForgotPasswordForm({ onBack, onSuccess }) {
  const [resetEmail, setResetEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSuccess(resetEmail); // Pass the email up to show in the success message
    }, 1500);
  };

  return (
    <motion.div
      key="forgot-password"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-8 space-y-6"
    >
      <div className="space-y-3">
        <h1 className="text-2xl font-bold text-white">Reset Your Password</h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Enter your official university email address below. We will send you a secure link to reset your password. If you don't receive it within 5 minutes, please check your spam folder or contact IT Support.
        </p>
      </div>

      <form onSubmit={handleResetPassword} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500 pointer-events-none" />
            <input
              type="email"
              placeholder="student@horizon-university.tn"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all duration-200"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/50 disabled:opacity-70 transition-all duration-200 flex items-center justify-center gap-2 mt-6"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Reset Link'
          )}
        </motion.button>
      </form>

      <motion.button
        onClick={onBack}
        whileHover={{ x: -4 }}
        className="w-full py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 font-semibold transition-all duration-200 flex items-center justify-center gap-2 group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Login
      </motion.button>
    </motion.div>
  );
}