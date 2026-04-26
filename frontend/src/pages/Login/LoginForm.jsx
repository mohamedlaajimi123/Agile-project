import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import supabase from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import horizonLogo from "../../assets/horizon-logo.png";

export default function LoginForm({ onForgotPassword }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("role")
        .eq("email", data.user.email)
        .single();

      if (profileError) throw profileError;
      const role = profile.role.toLowerCase().trim();
      
      login({ ...data.user, role }, data.session?.access_token);
      navigate(`/${role}/dashboard`);
    } catch (err) {
      setErrorMessage(err.message || "Unable to login.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#0f172a]/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10">
      <div className="flex justify-center mb-6">
        <img src={horizonLogo} alt="Horizon Logo" className="h-12" />
      </div>

      <h2 className="text-2xl font-bold text-center text-white">Welcome Back</h2>
      <p className="text-center text-gray-400 text-sm mb-6">Sign in to your Horizon account</p>

      {errorMessage && (
        <div className="bg-red-500/20 text-red-400 text-sm p-2 rounded mb-4 text-center">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:ring-2 focus:ring-indigo-400/50 outline-none transition-all"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:ring-2 focus:ring-indigo-400/50 outline-none transition-all"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex justify-between text-sm text-gray-400">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-indigo-600 focus:ring-indigo-500" />
            Remember me
          </label>
          <button type="button" onClick={onForgotPassword} className="text-blue-400 hover:underline">
            Forgot password?
          </button>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-indigo-500/25 transition-all"
        >
          {loading ? "Signing in..." : "Sign In"}
        </motion.button>
      </form>

      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-600"></div>
        <span className="px-3 text-gray-400 text-sm">OR CONTINUE WITH</span>
        <div className="flex-grow h-px bg-gray-600"></div>
      </div>

      <motion.button
        type="button"
        onClick={handleGoogleLogin}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold flex items-center justify-center gap-3 transition-all"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Sign in with Google
      </motion.button>
    </div>
  );
}