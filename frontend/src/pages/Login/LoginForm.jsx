import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

// Import the Auth Context
import { useAuth } from '../../context/AuthContext';

// 1. Import your logo
import horizonLogo from '../../assets/horizon-logo.png';

export default function LoginForm({ onForgotPassword }) {
  const { login } = useAuth(); // Access the global login function
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // --- UPDATED LOGIC ---
  const handleSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API verification delay
    setTimeout(() => {
      // Determine role based on email string
      const role = email.toLowerCase().includes('prof') ? 'professor' : 'student';
      
      // Trigger the global login state
      login({
        email,
        role: role,
        name: role === 'professor' ? 'Dr. Sarah Miller' : 'Alex Chen'
      });
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-8 space-y-6"
    >
      {/* Header with your New Logo */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center mb-6">
          <img
            src={horizonLogo}
            alt="Horizon School of Digital Technologies"
            className="h-12 w-auto drop-shadow-md"
          />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h1>
        <p className="text-gray-400 text-sm">Sign in to your Horizon account</p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSignIn} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500 pointer-events-none" />
            <input
              type="email"
              placeholder="name@horizon.tn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all duration-200"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-12 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-400 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-white/5 cursor-pointer accent-indigo-500"
            />
            <span className="text-sm text-gray-400">Remember me</span>
          </label>
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
          >
            Forgot password?
          </button>
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
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </motion.button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[#0f172a] text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      {/* Google Sign In */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all duration-200 flex items-center justify-center gap-3"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Sign in with Google
      </motion.button>

      <p className="text-center text-xs text-gray-500">
        Don't have an account?{' '}
        <button className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
          Contact IT Support
        </button>
      </p>
    </motion.div>
  );
}