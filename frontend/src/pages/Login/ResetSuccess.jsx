import React from 'react';
import { motion } from 'framer-motion';

export default function ResetSuccess({ email, onBack }) {
  return (
    <motion.div
      key="reset-success"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-8 space-y-6 text-center"
    >
      <div className="space-y-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">Check Your Email</h2>
        <p className="text-gray-400">
          We've sent a password reset link to <span className="text-indigo-400 font-semibold">{email}</span>
        </p>
        <p className="text-sm text-gray-500">
          The link will expire in 24 hours. If you don't see the email within 5 minutes, please check your spam folder or contact IT Support.
        </p>
      </div>

      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-200"
      >
        Back to Login
      </motion.button>
    </motion.div>
  );
}