import React from 'react';
import { motion } from 'framer-motion';
import { USERS } from '../../../data/admin/mockData';

export default function UserDirectoryView({ isDark, t, searchQuery }) {
  const filteredUsers = USERS.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      key="user-directory"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold">{t.userDirectory}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user, idx) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className={`rounded-2xl backdrop-blur-xl border p-6 hover:border-indigo-400/50 transition-all ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-indigo-200 shadow-lg'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg">
                {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                user.status === 'active' 
                  ? isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                  : isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-600'
              }`}>
                {user.status}
              </span>
            </div>
            <h3 className="font-bold text-lg mb-1">{user.name}</h3>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-zinc-500'}`}>{user.role} - {user.department}</p>
            <div className={`pt-4 border-t flex justify-between items-center ${isDark ? 'border-white/10' : 'border-indigo-100'}`}>
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-zinc-500'}`}>Active Courses</span>
              <span className="font-semibold">{user.courses}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}