import React, { useState } from 'react';
import { LayoutDashboard, Calendar, BarChart3, FileText, Sun, Moon, ChevronRight, Globe, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import your professional logo asset
import horizonLogo from '../../assets/horizon-logo.png';

export default function StudentSidebar({ isDark, setIsDark, language, setLanguage, activeTab, setActiveTab, setCurrentPage, t }) {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'exams', label: t.myExams, icon: Calendar },
    { id: 'grades', label: t.myGrades, icon: BarChart3 },
    { id: 'documents', label: t.documents, icon: FileText },
  ];

  const languages = [
    { code: 'EN', label: 'English' },
    { code: 'FR', label: 'Français' }
  ];

  return (
    <aside className={`fixed left-0 top-0 z-30 h-screen w-64 border-r backdrop-blur-xl p-6 flex flex-col transition-all duration-300 ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white/40 shadow-lg'}`}>
      
      {/* --- DYNAMIC LOGO SECTION --- */}
      <div className="mb-12 flex justify-start">
        <motion.button 
          onClick={() => { 
            setActiveTab('dashboard'); 
            if (setCurrentPage) setCurrentPage('portal'); 
          }}
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="relative outline-none group"
          title="Return to Dashboard"
        >
          {/* Dynamic Theme Glow */}
          <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 ${isDark ? 'bg-indigo-500/20 group-hover:bg-indigo-500/40' : 'bg-indigo-400/20 group-hover:bg-indigo-400/40'}`} />
          
          <img 
            src={horizonLogo} 
            alt="Horizon School" 
            className="h-10 w-auto relative z-10 drop-shadow-lg" 
          />
        </motion.button>
      </div>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <motion.button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)} 
              whileHover={{ x: 4 }} 
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 relative group ${
                isActive 
                  ? isDark 
                    ? 'bg-gradient-to-r from-indigo-500/40 to-violet-500/40 border border-indigo-400/30 text-white shadow-lg shadow-indigo-500/20' 
                    : 'bg-gradient-to-r from-indigo-500/30 to-violet-500/30 border border-indigo-300/50 text-slate-900 shadow-lg shadow-indigo-400/20'
                  : isDark 
                    ? 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 border border-transparent'
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

      <div className="space-y-4 pt-4 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
        
        {/* --- CUSTOM ACCESSIBLE LANGUAGE SELECTOR --- */}
        <div className="relative">
          <motion.button
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full px-3 py-2 text-sm rounded-lg transition-all backdrop-blur-xl border flex items-center justify-between gap-2 ${
              isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-slate-200/40 border-slate-300/50 text-slate-900 hover:bg-slate-200/60'
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
                className={`absolute bottom-full mb-2 left-0 w-full rounded-xl border p-1 shadow-2xl backdrop-blur-2xl z-50 ${
                  isDark ? 'bg-slate-900/90 border-white/10' : 'bg-white/90 border-slate-200'
                }`}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      language === lang.code 
                        ? 'bg-indigo-500/20 text-indigo-400 font-bold' 
                        : isDark ? 'text-gray-300 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <motion.button 
          onClick={() => setIsDark(!isDark)} 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          className={`w-full px-3 py-2 text-sm rounded-lg transition-all backdrop-blur-xl border flex items-center justify-center gap-2 ${isDark ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10' : 'bg-slate-200/40 border-slate-300/50 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}`}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {isDark ? 'Light' : 'Dark'}
        </motion.button>
        
        <motion.button 
          onClick={() => setCurrentPage('profile')} 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }} 
          className={`w-full pt-4 border-t flex items-center gap-3 transition-all duration-300 ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-slate-300/30 hover:bg-slate-100/50'} px-2 py-2 rounded-lg`} 
          style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">AC</div>
          <div className="text-xs text-left flex-1 min-w-0">
            <p className={`font-medium truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>Alex Chen</p>
            <p className={isDark ? 'text-gray-500' : 'text-slate-600'}>View Profile</p>
          </div>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </aside>
  );
}