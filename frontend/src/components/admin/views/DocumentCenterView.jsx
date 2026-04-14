import React from 'react';
import { motion } from 'framer-motion';
import { Download, Share2 } from 'lucide-react';

export default function DocumentCenterView({ isDark, t }) {
  return (
    <motion.div
      key="documents"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold">{t.documents}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`rounded-2xl backdrop-blur-xl border p-8 text-center ${
            isDark 
              ? 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-400/30' 
              : 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-300 shadow-lg'
          }`}
        >
          <Download className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          <h3 className="text-xl font-bold mb-2">{t.attendanceSheets}</h3>
          <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>Generate bulk attendance sheets for all exams</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            {t.generateSheets}
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`rounded-2xl backdrop-blur-xl border p-8 text-center ${
            isDark 
              ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-400/30' 
              : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-300 shadow-lg'
          }`}
        >
          <Share2 className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
          <h3 className="text-xl font-bold mb-2">{t.qrRoomLabels}</h3>
          <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>Export printable QR codes for exam rooms</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            {t.exportLabels}
          </motion.button>
        </motion.div>

      </div>
    </motion.div>
  );
}