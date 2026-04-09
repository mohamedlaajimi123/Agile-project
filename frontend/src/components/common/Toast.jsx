import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Toast() {
  const { toast } = useAuth();

  return (
    <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: -100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -100, opacity: 0, scale: 0.8 }}
            className={`
              flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border
              ${toast.type === 'success' 
                ? 'bg-emerald-500/20 border-emerald-500/20 text-emerald-400' 
                : 'bg-red-500/20 border-red-500/20 text-red-400'}
            `}
          >
            {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-bold text-sm tracking-wide">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}