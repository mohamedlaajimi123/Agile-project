import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Toast() {
  const { toast } = useAuth();

  const getToastStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500/20 border-emerald-500/20 text-emerald-400';
      case 'error':
        return 'bg-red-500/20 border-red-500/20 text-red-400';
      case 'info':
        return 'bg-blue-500/20 border-blue-500/20 text-blue-400';
      default:
        return 'bg-emerald-500/20 border-emerald-500/20 text-emerald-400';
    }
  };

  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

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
              ${getToastStyles(toast.type)}
            `}
          >
            {getToastIcon(toast.type)}
            <span className="font-bold text-sm tracking-wide">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}