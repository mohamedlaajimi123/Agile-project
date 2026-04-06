import React from 'react';
import { Sun, Moon, Bell } from 'lucide-react';

export default function Navbar({
  isDark,
  toggleDarkMode,
  language,
  setLanguage,
  notificationCount = 0,
  showNotifications = true,
  leftSlot,    // For role titles next to the logo
  centerSlot,  // For center navigation links
  profileSlot  // For the user avatar on the far right
}) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
        
        {/* LEFT: Logo + Optional Left Slot (e.g., Portal Title) */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-1mcCUHaP8tlV318gmc2JVrlUK9lI3k.png" 
            alt="Horizon School Logo"
            className="h-10 w-auto sm:h-12 object-contain transition-all duration-300"
          />
          {leftSlot}
        </div>

        {/* CENTER: Optional Center Slot (e.g., Nav Links) */}
        {centerSlot && (
          <nav className="hidden md:flex items-center gap-8">
            {centerSlot}
          </nav>
        )}

        {/* RIGHT: Controls + Optional Profile Slot */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          
          {/* Notification Bell */}
          {showNotifications && (
            <button
              className="relative p-2 text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] dark:focus:ring-[#4A7BA7]"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {notificationCount}
                </span>
              )}
            </button>
          )}

          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="hidden sm:block px-3 py-1.5 sm:py-2 text-sm font-medium text-gray-900 dark:text-gray-50 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] dark:focus:ring-[#4A7BA7]"
          >
            <option value="EN">EN</option>
            <option value="FR">FR</option>
          </select>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] dark:focus:ring-[#4A7BA7]"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Profile Slot */}
          {profileSlot && (
            <div className="pl-3 border-l border-gray-200 dark:border-gray-700">
              {profileSlot}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}