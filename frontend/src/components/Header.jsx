import { Sun, Moon, Bell } from 'lucide-react';

export default function Header({ isDark, toggleDarkMode, language, setLanguage, isDashboard = false }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        
        {/* 🏢 RESPONSIVE LOGO */}
        <div className="flex items-center flex-shrink-0">
          <img
            src="/logo.png" 
            alt="Horizon School Logo"
            // h-8 (Mobile), h-10 (Tablet), h-12 (Desktop)
            className="h-8 sm:h-10 md:h-12 w-auto object-contain transition-all duration-300"
          />
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* ✨ Notification Bell - Only appears on Dashboard */}
          {isDashboard && (
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <Bell size={20} />
              {/* The "Red Dot" Notification Badge */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
          )}

          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-50 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
          >
            <option value="EN">EN</option>
            <option value="FR">FR</option>
          </select>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}