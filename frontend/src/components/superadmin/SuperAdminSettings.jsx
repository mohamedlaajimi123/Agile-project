import React from 'react';
import { ChevronLeft } from 'lucide-react';
import SharedSettings from '../shared/SharedSettings';

export default function SuperAdminSettings({ isDark, t, setActiveView }) {
  return (
    <div className={`min-h-screen p-8 transition-colors duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white' 
        : 'bg-gradient-to-br from-zinc-50 via-white to-zinc-100 text-zinc-900'
    }`}>
      <div className="max-w-4xl mx-auto">
        <div className="w-full">
          <button 
            onClick={() => setActiveView('sync')} 
            className={`flex items-center gap-2 mb-8 font-semibold transition-all ${
              isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
            }`}
          >
            <ChevronLeft className="w-5 h-5" /> {t?.back || 'Back to Dashboard'}
          </button>
          
          <SharedSettings isDark={isDark} t={t} />
        </div>
      </div>
    </div>
  );
}