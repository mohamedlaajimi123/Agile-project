import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ChevronDown, User, Settings, LogOut, Globe, ChevronUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SharedSidebar({ 
  isDark, setIsDark, 
  language, setLanguage, 
  activeView, setActiveView, 
  t,
  navItems,      
  userProfile,   
  logoSrc,       
  logoAlt,
  onProfileClick,
  onSettingsClick 
}) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const languages = [
    { code: 'EN', label: 'English' },
    { code: 'FR', label: 'Français' }
  ];

  return (
    <aside className={`fixed left-0 top-0 z-30 h-screen w-64 border-r backdrop-blur-xl p-6 flex flex-col transition-all duration-300 ${
      isDark 
        ? 'border-white/10 bg-white/5' 
        : 'border-indigo-200 bg-white/40 shadow-lg'
    }`}>
      
      {/* --- LOGO SECTION --- */}
      <div className="mb-12 flex justify-start">
        <motion.button 
          // BACKEND NOTE: Teammate should ensure navItems[0].id is always the default landing tab
          onClick={() => setActiveView(navItems[0]?.id)}
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="relative outline-none group flex items-center gap-3"
        >
          <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 ${
            isDark ? 'bg-indigo-500/20 group-hover:bg-indigo-500/40' : 'bg-indigo-400/20 group-hover:bg-indigo-400/40'
          }`} />
          <img src={logoSrc} alt={logoAlt} className="h-10 w-auto relative z-10 drop-shadow-lg" />
        </motion.button>
      </div>

      {/* --- NAVIGATION ITEMS --- */}
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 relative group ${
                isActive
                  ? isDark
                    ? 'bg-gradient-to-r from-indigo-500/40 to-violet-500/40 border border-indigo-400/30 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-gradient-to-r from-indigo-500/30 to-violet-500/30 border border-indigo-300 text-zinc-900 shadow-lg shadow-indigo-400/20'
                  : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/60 border border-transparent'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeGlow"
                  className={`absolute inset-0 rounded-lg blur-lg ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-400/20'}`}
                  initial={false}
                />
              )}
              <Icon className="w-5 h-5 relative z-10" />
              <span className="text-sm font-medium relative z-10">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* --- FOOTER CONTROLS --- */}
      <div className="space-y-4 pt-4 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
        
        {/* Language Selector */}
        <div className="relative z-50">
          <motion.button
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            whileHover={{ scale: 1.02 }}
            className={`w-full px-3 py-2 text-sm rounded-lg transition-all backdrop-blur-xl border flex items-center justify-between gap-2 ${
              isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white/50 border-indigo-200 text-zinc-900 hover:bg-white/70'
            }`}
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 opacity-60" />
              <span>{languages.find(l => l.code === language)?.label}</span>
            </div>
            <ChevronUp className={`w-4 h-4 transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
          </motion.button>

          <AnimatePresence>
            {isLangMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className={`absolute bottom-full mb-2 left-0 w-full rounded-xl border p-1 shadow-2xl backdrop-blur-xl z-50 ${
                  isDark ? 'bg-slate-900/80 border-white/10' : 'bg-white/80 border-indigo-200'
                }`}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      // BACKEND NOTE: Teammate should trigger an API call here 
                      // to save the user's language preference to the database.
                      setLanguage(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      language === lang.code 
                        ? (isDark ? 'bg-indigo-500/20 text-indigo-400 font-bold' : 'bg-indigo-100 text-indigo-700 font-bold') 
                        : isDark ? 'text-gray-300 hover:bg-white/10' : 'text-zinc-600 hover:bg-zinc-100'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dark Mode Toggle */}
        <motion.button
          onClick={() => setIsDark(!isDark)}
          whileHover={{ scale: 1.05 }}
          className={`w-full px-3 py-2 text-sm rounded-lg transition-all backdrop-blur-xl border flex items-center justify-center gap-2 ${
            isDark
              ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              : 'bg-white/50 border-indigo-200 text-zinc-600 hover:text-zinc-900 hover:bg-white/70'
          }`}
        >
          {isDark ? <Sun className="w-4 h-4 text-orange-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          {isDark ? 'Light' : 'Dark'}
        </motion.button>

        {/* Profile Section */}
        <div className="relative z-50">
          <motion.button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            whileHover={{ scale: 1.02 }}
            className={`w-full flex items-center gap-3 transition-all duration-300 px-2 py-2 rounded-lg ${
              isDark ? 'hover:bg-white/5' : 'hover:bg-white/70'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 shadow-md">
              {userProfile.initials}
            </div>
            <div className="text-xs text-left flex-1">
              <p className={`font-medium ${isDark ? 'text-white' : 'text-zinc-900'}`}>{userProfile.name}</p>
              <p className={isDark ? 'text-gray-500' : 'text-zinc-600'}>{userProfile.role}</p>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
          </motion.button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className={`absolute left-0 right-0 bottom-full mb-2 rounded-xl border shadow-2xl backdrop-blur-xl z-50 overflow-hidden ${
                  isDark ? 'bg-slate-900/85 border-white/10' : 'bg-white/85 border-indigo-200'
                }`}
              >
                {/* Profile Link */}
                <button 
                  onClick={() => {
                    // CHANGE: Triggered correctly to open the full-page profile view
                    if (onProfileClick) onProfileClick();
                    setShowProfileMenu(false);
                  }}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                  isDark ? 'hover:bg-white/10 text-gray-200' : 'hover:bg-indigo-50 text-zinc-700'
                }`}>
                  <User className="w-4 h-4 opacity-70" />
                  <span className="text-sm font-medium">{t.profile}</span>
                </button>
                
                {/* Settings Link */}
                <button 
                  onClick={() => {
                    // CHANGE: Triggered correctly to open the full-page blurred settings view
                    if (onSettingsClick) onSettingsClick();
                    setShowProfileMenu(false);
                  }}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors border-t ${
                  isDark ? 'border-white/10 hover:bg-white/10 text-gray-200' : 'border-indigo-100 hover:bg-indigo-50 text-zinc-700'
                }`}>
                  <Settings className="w-4 h-4 opacity-70" />
                  <span className="text-sm font-medium">{t.settings}</span>
                </button>

                {/* Logout Link */}
                <button 
                  onClick={() => {
                    console.log("Logout triggered");
                    logout();
                    navigate('/login');
                  }}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors border-t ${
                  isDark ? 'border-white/10 hover:bg-red-500/10 text-red-400' : 'border-indigo-100 hover:bg-red-50 text-red-600'
                }`}>
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">{t.logout}</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </aside>
  );
}