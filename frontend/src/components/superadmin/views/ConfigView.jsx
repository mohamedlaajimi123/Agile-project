import React, { useState } from 'react';
import { Calendar, Palette, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ConfigView({ isDark, t }) {
  const [primaryColor, setPrimaryColor] = useState('#4f46e5');
  const [accentColor, setAccentColor] = useState('#10b981');
  const [academicYear, setAcademicYear] = useState('2025/2026');
  const [semesterStart, setSemesterStart] = useState('2025-09-01');
  const [semesterEnd, setSemesterEnd] = useState('2026-06-30');

  return (
    <motion.div
      key="config"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`rounded-2xl backdrop-blur-xl border p-6 ${
            isDark
              ? 'bg-white/5 border-white/10'
              : 'bg-white/50 border-indigo-200 shadow-lg'
          }`}
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Palette className="w-5 h-5 text-indigo-500" />
            {t.config.branding}
          </h2>

          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>{t.config.institutionalLogo}</label>
              <div className={`p-6 rounded-lg border-2 border-dashed transition-all ${
                isDark ? 'border-white/20 bg-white/5 hover:border-indigo-400/50' : 'border-indigo-300 bg-indigo-50/50 hover:border-indigo-500'
              }`}>
                <div className="text-center">
                  <Upload className={`w-8 h-8 mx-auto mb-2 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  <p className="text-sm font-medium">{t.config.uploadLogo}</p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>{t.config.uploadHint}</p>
                </div>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>{t.config.primaryColor}</label>
              <div className="flex gap-4 items-center">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-16 h-12 rounded-lg cursor-pointer"
                />
                <div className="flex-1">
                  <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>{t.config.hexCode}</p>
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg backdrop-blur-xl border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-white'
                        : 'bg-white/50 border-indigo-200 text-zinc-900'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>{t.config.accentColor}</label>
              <div className="flex gap-4 items-center">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-16 h-12 rounded-lg cursor-pointer"
                />
                <div className="flex-1">
                  <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>{t.config.hexCode}</p>
                  <input
                    type="text"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg backdrop-blur-xl border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-white'
                        : 'bg-white/50 border-indigo-200 text-zinc-900'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`rounded-2xl backdrop-blur-xl border p-6 ${
            isDark
              ? 'bg-white/5 border-white/10'
              : 'bg-white/50 border-indigo-200 shadow-lg'
          }`}
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-500" />
            {t.config.academicContext}
          </h2>

          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>{t.config.academicYear}</label>
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg backdrop-blur-xl border focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-white'
                    : 'bg-white/50 border-indigo-200 text-zinc-900'
                }`}
              >
                <option value="2024/2025">2024/2025</option>
                <option value="2025/2026">2025/2026</option>
                <option value="2026/2027">2026/2027</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>{t.config.semesterStart}</label>
              <input
                type="date"
                value={semesterStart}
                onChange={(e) => setSemesterStart(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg backdrop-blur-xl border focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-white'
                    : 'bg-white/50 border-indigo-200 text-zinc-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>{t.config.semesterEnd}</label>
              <input
                type="date"
                value={semesterEnd}
                onChange={(e) => setSemesterEnd(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg backdrop-blur-xl border focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-white'
                    : 'bg-white/50 border-indigo-200 text-zinc-900'
                }`}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-bold text-lg transition-all shadow-lg shadow-indigo-500/30"
      >
        {t.config.saveChanges}
      </motion.button>
    </motion.div>
  );
}
