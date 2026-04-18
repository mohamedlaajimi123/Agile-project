import React from 'react';
import { Search, Download, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const AUDIT_LOG = [
  { id: 1, traceId: 'TRX-2024-0001', operator: 'Prof. Morrison', action: 'GRADE_MOD', timestamp: '2024-04-15 14:32:15', ip: '192.168.1.100', before: { grade: 'A' }, after: { grade: 'A+' } },
  { id: 2, traceId: 'TRX-2024-0002', operator: 'Admin Chen', action: 'USER_DEL', timestamp: '2024-04-15 13:45:22', ip: '192.168.1.105', before: { status: 'active' }, after: { status: 'deleted' } },
  { id: 3, traceId: 'TRX-2024-0003', operator: 'Super Admin', action: 'PERM_GRANT', timestamp: '2024-04-15 12:10:08', ip: '192.168.1.101', before: { role: 'lecturer' }, after: { role: 'admin' } },
  { id: 4, traceId: 'TRX-2024-0004', operator: 'System Admin', action: 'CONFIG_CHG', timestamp: '2024-04-15 11:22:45', ip: '192.168.1.102', before: { academicYear: '2023-2024' }, after: { academicYear: '2024-2025' } },
];

const getActionBadgeColor = (action) => {
  switch (action) {
    case 'GRADE_MOD': return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
    case 'USER_DEL': return 'bg-rose-500/20 text-rose-400 border-rose-400/30';
    case 'PERM_GRANT': return 'bg-emerald-500/20 text-emerald-400 border-emerald-400/30';
    case 'CONFIG_CHG': return 'bg-amber-500/20 text-amber-400 border-amber-400/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
  }
};

export default function AuditLogView({ isDark, searchQuery, setSearchQuery, setSelectedDiff, t }) {
  const filteredLogs = AUDIT_LOG.filter(log =>
    log.traceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.operator.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.ip.includes(searchQuery)
  );

  return (
    <motion.div
      key="audit"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className={`absolute left-3 top-3 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-zinc-400'}`} />
          <input
            type="text"
            placeholder={t.audit.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg backdrop-blur-xl transition-all border focus:outline-none focus:ring-2 focus:ring-indigo-400/50 ${
              isDark
                ? 'bg-white/5 border-white/10 text-white placeholder-gray-600 hover:bg-white/10'
                : 'bg-white/50 border-indigo-200 text-zinc-900 placeholder-zinc-500 hover:bg-white/70'
            }`}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          {t.audit.exportPdf}
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`rounded-2xl backdrop-blur-xl border overflow-hidden ${
          isDark
            ? 'bg-white/5 border-white/10'
            : 'bg-white/50 border-indigo-200 shadow-lg'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDark ? 'bg-white/10 border-white/10' : 'bg-white/60 border-indigo-200'}`}>
                <th className={`text-left px-6 py-4 font-semibold text-sm ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>{t.audit.tableHeaders.traceId}</th>
                <th className={`text-left px-6 py-4 font-semibold text-sm ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>{t.audit.tableHeaders.operator}</th>
                <th className={`text-left px-6 py-4 font-semibold text-sm ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>{t.audit.tableHeaders.action}</th>
                <th className={`text-left px-6 py-4 font-semibold text-sm ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>{t.audit.tableHeaders.timestamp}</th>
                <th className={`text-left px-6 py-4 font-semibold text-sm ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>{t.audit.tableHeaders.ipAddress}</th>
                <th className={`text-center px-6 py-4 font-semibold text-sm ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>{t.audit.tableHeaders.details}</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`border-b transition-all ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-indigo-200 hover:bg-white/60'}`}
                >
                  <td className="px-6 py-4 text-sm font-mono text-indigo-400">{log.traceId}</td>
                  <td className="px-6 py-4 text-sm font-medium">{log.operator}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getActionBadgeColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>{log.timestamp}</td>
                  <td className={`px-6 py-4 text-sm font-mono ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>{log.ip}</td>
                  <td className="px-6 py-4 text-center">
                    <motion.button
                      onClick={() => setSelectedDiff(log)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                        isDark
                          ? 'text-indigo-400 hover:bg-indigo-500/20'
                          : 'text-indigo-600 hover:bg-indigo-500/20'
                      }`}
                    >
                      <Eye className="w-4 h-4" />
                      {t.audit.view}
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
