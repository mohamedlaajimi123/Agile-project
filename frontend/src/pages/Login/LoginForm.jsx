import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import horizonLogo from "../../assets/horizon-logo.png";
import supabase from '../../lib/supabase';
export default function LoginForm({ onForgotPassword }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const restoreOAuthSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.warn("Supabase session restore failed:", error);
        return;
      }

      const session = data?.session;
      const user = session?.user;
      if (!user) return;

      try {
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("role")
          .eq("email", user.email)
          .single();

        if (profileError) throw profileError;
        if (!profile?.role) throw new Error("User role not found");

        const role = profile.role?.toLowerCase().trim();
        const authUser = { ...user, role };

        login(authUser, session.access_token);
        localStorage.setItem("session", JSON.stringify(session));
        navigate(`/${role}/dashboard`);
      } catch (err) {
        console.warn("OAuth redirect restore failed:", err);
      }
    };

    restoreOAuthSession();
  }, [login, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (!data?.user) throw new Error("Authentication failed.");

      const user = data.user;
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("role")
        .eq("email", user.email)
        .single();

      if (profileError) throw profileError;
      if (!profile?.role) throw new Error("User role not found");

      const role = profile.role?.toLowerCase().trim();
      const authUser = { ...user, role };

      login(authUser, data.session?.access_token || null);
      localStorage.setItem("session", JSON.stringify(data.session || null));
      localStorage.setItem("rememberMe", rememberMe ? "true" : "false");

      switch (role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "professor":
          navigate("/professor/dashboard");
          break;
        case "student":
          navigate("/student/dashboard");
          break;
        case "superadmin":
          navigate("/superadmin/dashboard");
          break;
        default:
          throw new Error("Invalid role");
      }
    } catch (err) {
      setErrorMessage(err.message || "Unable to login.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setErrorMessage(err.message || "Google sign-in failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#0a1a3a] to-[#020617]">
      <div className="w-full max-w-md bg-[#0f172a]/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img src={horizonLogo} alt="Horizon Logo" className="h-12" />
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center text-white">
          Welcome Back
        </h2>
        <p className="text-center text-gray-400 text-sm mb-6">
          Sign in to your Horizon account
        </p>

        {/* ERROR */}
        {errorMessage && (
          <div className="bg-red-500/20 text-red-400 text-sm p-2 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-full bg-gray-200 text-black outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-full bg-gray-200 text-black outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex justify-between text-sm text-gray-400">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 bg-white text-indigo-600 focus:ring-indigo-500"
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-blue-400 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-600"></div>
          <span className="px-3 text-gray-400 text-sm">
            OR CONTINUE WITH
          </span>
          <div className="flex-grow h-px bg-gray-600"></div>
        </div>

        {/* GOOGLE BUTTON */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-full bg-black text-white flex items-center justify-center gap-2 hover:bg-gray-800 transition"
        >
          <span className="bg-white text-black rounded-full px-2">G</span>
          Continue with Google
        </button>
      </div>
    </div>
  );
}