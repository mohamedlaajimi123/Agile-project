import React, { useState } from 'react';
import { AlertCircle, Upload, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const CONFLICTS = [
  { id: 1, type: 'Duplicate Student ID', description: 'Student ID "STU001" found in 2 records', severity: 'high' },
  { id: 2, type: 'Invalid Department Code', description: 'Dept code "XYZ123" does not exist in system', severity: 'medium' },
  { id: 3, type: 'Grade Overflow', description: 'Record has grade value exceeding 100', severity: 'high' },
];

export default function DataSyncView({ isDark, t }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  return (
    <motion.div
      key="sync"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
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
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-500" />
          {t.sync.conflictWizard}
        </h2>
        <div className="space-y-3">
          {CONFLICTS.map((conflict) => (
            <motion.div
              key={conflict.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-lg border ${
                isDark
                  ? 'bg-amber-500/10 border-amber-400/30'
                  : 'bg-amber-500/10 border-amber-300/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold">{conflict.type}</h3>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>
                    {conflict.description}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold ml-4 ${
                  conflict.severity === 'high'
                    ? 'bg-red-500/20 text-red-400 border border-red-400/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-400/30'
                }`}>
                  {conflict.severity.toUpperCase()}
                </span>
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                >
                  {t.sync.mergeRecords}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                    isDark
                      ? 'bg-white/5 border-white/10 hover:bg-white/10'
                      : 'bg-white/50 border-indigo-200 hover:bg-white/70'
                  }`}
                >
                  {t.sync.mapToDept}
                </motion.button>
              </div>
            </motion.div>
          ))}
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
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-blue-500" />
          {t.sync.bulkImport}
        </h2>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            dragActive
              ? isDark
                ? 'border-indigo-400 bg-indigo-500/20'
                : 'border-indigo-500 bg-indigo-500/10'
              : isDark
                ? 'border-white/20'
                : 'border-indigo-300'
          }`}
        >
          <motion.div
            animate={{ y: dragActive ? -5 : 0 }}
            className={`p-4 rounded-2xl mx-auto w-fit mb-4 ${
              isDark ? 'bg-indigo-500/20' : 'bg-indigo-500/10'
            }`}
          >
            <Upload className={`w-8 h-8 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
          </motion.div>
          <p className="font-bold mb-1">{t.sync.uploadTitle}</p>
          <p className={`text-xs mb-4 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>{t.sync.uploadHint}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
          >
            {t.sync.selectFile}
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`rounded-2xl backdrop-blur-xl border p-6 ${
          isDark
            ? 'bg-white/5 border-white/10'
            : 'bg-white/50 border-indigo-200 shadow-lg'
        }`}
      >
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Database className="w-5 h-5 text-green-500" />
          {t.sync.systemIntegrity}
        </h2>
        <div className="space-y-4">
          {[
            { label: t.sync.stats.databaseLoad, value: 68, color: 'from-blue-500 to-cyan-500' },
            { label: t.sync.stats.memoryUsage, value: 45, color: 'from-green-500 to-emerald-500' },
            { label: t.sync.stats.diskHealth, value: 82, color: 'from-amber-500 to-orange-500' },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>{item.label}</span>
                <span className="text-sm font-bold">{item.value}%</span>
              </div>
              <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-zinc-200'}`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 1, delay: 0.3 + idx * 0.1 }}
                  className={`h-full bg-gradient-to-r ${item.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
