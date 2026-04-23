import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

// Logo
import horizonLogo from '../../assets/horizon-logo.png';

export default function LoginForm({ onForgotPassword }) {
  const navigate = useNavigate();
  const { login, showToast } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // ✅ BACKEND LOGIN WITH ROLE-BASED REDIRECT
const handleSignIn = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setErrorMessage('');

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("LOGIN DATA:", data);

    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // ✅ Save auth
    login(data.user, data.token);

    const role = data.role || data.user?.role;

    // ✅ Redirect
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else if (role === 'professor') {
      navigate('/professor/dashboard');
    } else if (role === 'student') {
      navigate('/student/dashboard');
    } else if (role === 'superadmin') {
      navigate('/superadmin/dashboard'); // 🔥 FIX
    }

  } catch (err) {
    const errorMsg = err.message || 'Invalid credentials';
    setErrorMessage(errorMsg);
    showToast(errorMsg, 'error');
  } finally {
    setIsLoading(false);
  }
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
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center mb-6">
          <img
            src={horizonLogo}
            alt="Horizon School of Digital Technologies"
            className="h-12 w-auto drop-shadow-md"
          />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Welcome Back
        </h1>
        <p className="text-gray-400 text-sm">
          Sign in to your Horizon account
        </p>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
        >
          {errorMessage}
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSignIn} className="space-y-4">

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Email Address
          </label>
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

        {/* Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Password
          </label>
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

        {/* Options */}
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
            className="text-sm text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit */}
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

      {/* Google button (UI only) */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold flex items-center justify-center gap-3"
      >
        Sign in with Google
      </motion.button>

      <p className="text-center text-xs text-gray-500">
        Don't have an account?{" "}
        <button className="text-indigo-400 font-semibold">
          Contact IT Support
        </button>
      </p>
    </motion.div>
  );
}
