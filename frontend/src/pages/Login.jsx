import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import Header from '../components/Header';

export default function Login() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Dark Mode Logic
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Form Submission with Redirect
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate a network request (1 second)
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard'); // This sends the user to the dashboard!
    }, 1000);
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
    <div className={`min-h-screen bg-white dark:bg-slate-950 transition-colors duration-200`}>
      {/* Reusable Header Component */}
      <Header 
        isDark={isDark} 
        toggleDarkMode={toggleDarkMode} 
        language={language} 
        setLanguage={setLanguage} 
        isDashboard={false} 
      />

      {/* Login Form Section */}
      <div className="flex items-center justify-center min-h-[calc(100vh-81px)] px-4 py-8">
        <div className="w-full max-w-md">
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
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <a href="#" className="text-xs font-medium text-[#1E3A5F] dark:text-[#4A7BA7] hover:underline">
                  {t.forgotPassword}
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1E3A5F] dark:bg-[#4A7BA7] text-white font-semibold py-2.5 rounded-md hover:bg-[#152d47] dark:hover:bg-[#3d6b96] transition-all duration-200 disabled:opacity-75 flex items-center justify-center gap-2"
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

            <button
              type="button"
              className="w-full border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-50 font-semibold py-2.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-3"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              {t.signInWithGoogle}
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
            {t.noAccount}{' '}
            <a href="#" className="font-semibold text-[#1E3A5F] dark:text-[#4A7BA7] hover:underline">
              {t.contactSupport}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}