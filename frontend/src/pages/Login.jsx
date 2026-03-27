import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sun, Moon } from 'lucide-react';

export default function Login() {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const labels = {
    EN: {
      signIn: 'Sign In',
      email: 'Email Address',
      password: 'Password',
      forgotPassword: 'Forgot password?',
      signInWithGoogle: 'Sign in with Google',
      noAccount: "Don't have an account?",
      contactSupport: 'Contact support',
      welcome: 'Sign in to your portal',
      subtitle: 'Welcome back to your academic journey',
      placeholder: 'student@horizon-university.tn',
      passwordPlaceholder: 'Enter your password',
      signingIn: 'Signing in...',
      or: 'Or continue with',
    },
    FR: {
      signIn: 'Se Connecter',
      email: 'Adresse E-mail',
      password: 'Mot de passe',
      forgotPassword: 'Mot de passe oublié?',
      signInWithGoogle: 'Se connecter avec Google',
      noAccount: "Vous n'avez pas de compte?",
      contactSupport: 'Contacter le support',
      welcome: 'Connectez-vous à votre portail',
      subtitle: 'Bienvenue dans votre parcours académique',
      placeholder: 'etudiant@horizon-universite.tn',
      passwordPlaceholder: 'Entrez votre mot de passe',
      signingIn: 'Connexion en cours...',
      or: 'Ou continuer avec',
    },
  };

  const t = labels[language];

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-200">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DwK77fM1zun2wzYxby7GVU03LBPxIu.png"
                alt="Horizon School of Digital Technologies"
                className="h-12 w-auto"
              />
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-50 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] dark:focus:ring-[#4A7BA7]"
                aria-label="Select language"
              >
                <option value="EN">EN</option>
                <option value="FR">FR</option>
              </select>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] dark:focus:ring-[#4A7BA7]"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Login Form */}
        <div className="flex items-center justify-center min-h-[calc(100vh-73px)] px-4 py-8">
          <div className="w-full max-w-md">
            {/* Login Card */}
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 sm:p-8 space-y-6 transition-colors duration-200">
              {/* Heading */}
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                  {t.welcome}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t.subtitle}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-50">
                    {t.email}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                    <input
                      id="email"
                      type="email"
                      placeholder={t.placeholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] dark:focus:ring-[#4A7BA7] transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-gray-50">
                    {t.password}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t.passwordPlaceholder}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-12 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] dark:focus:ring-[#4A7BA7] transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors focus:outline-none"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <a
                    href="#"
                    className="text-xs font-medium text-[#1E3A5F] dark:text-[#4A7BA7] hover:text-[#0f1b2e] dark:hover:text-[#5a8ec9] transition-colors"
                  >
                    {t.forgotPassword}
                  </a>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#1E3A5F] dark:bg-[#4A7BA7] text-white font-semibold py-2.5 rounded-md hover:bg-[#152d47] dark:hover:bg-[#3d6b96] focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] dark:focus:ring-[#4A7BA7] focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all duration-200 disabled:opacity-75 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t.signingIn}
                    </>
                  ) : (
                    <>
                      {t.signIn}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400">
                    {t.or}
                  </span>
                </div>
              </div>

              {/* Google Sign In Button */}
              <button
                type="button"
                className="w-full border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-50 font-semibold py-2.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] dark:focus:ring-[#4A7BA7] flex items-center justify-center gap-3"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#1E3A5F"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#1E3A5F"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#1E3A5F"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#1E3A5F"
                  />
                </svg>
                {t.signInWithGoogle}
              </button>
            </div>

            {/* Footer Text */}
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
              {t.noAccount}{' '}
              <a href="#" className="font-semibold text-[#1E3A5F] dark:text-[#4A7BA7] hover:text-[#0f1b2e] dark:hover:text-[#5a8ec9] transition-colors">
                {t.contactSupport}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}