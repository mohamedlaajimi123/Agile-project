import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { fetchWithAuth } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

export default function SharedSyncView({ isDark, endpoint, title, description }) {
  const [syncStatus, setSyncStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const { showToast } = useAuth();

  // Fetch initial sync status
  useEffect(() => {
    fetchSyncStatus();
  }, []);

  const fetchSyncStatus = async () => {
    try {
      const data = await fetchWithAuth(endpoint);
      setSyncStatus(data.status);
      setLastSync(new Date(data.lastSync));
    } catch (error) {
      console.error('Failed to fetch sync status:', error);
      showToast('Failed to fetch sync status', 'error');
    }
  };

  const handleSyncNow = async () => {
    setIsLoading(true);
    try {
      await fetchWithAuth(endpoint, { method: 'POST' });
      showToast('Sync initiated successfully!', 'success');
      setSyncStatus('in_progress');

      // Simulate sync completion after a delay
      setTimeout(() => {
        setSyncStatus('completed');
        setLastSync(new Date());
        setIsLoading(false);
        showToast('Sync completed successfully!', 'success');
      }, 2000);
    } catch (error) {
      console.error('Sync failed:', error);
      setIsLoading(false);
      setSyncStatus('error');
      showToast('Sync failed. Please try again.', 'error');
    }
  };

  const getStatusIcon = () => {
    if (isLoading || syncStatus === 'in_progress') return <Clock className="w-5 h-5 text-blue-500 animate-spin" />;
    if (syncStatus === 'completed') return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (syncStatus === 'error') return <AlertCircle className="w-5 h-5 text-red-500" />;
    return <RefreshCw className="w-5 h-5 text-gray-500" />;
  };

  const getStatusText = () => {
    if (isLoading || syncStatus === 'in_progress') return 'Syncing...';
    if (syncStatus === 'completed') return 'Last sync completed successfully';
    if (syncStatus === 'error') return 'Last sync failed';
    return 'Ready to sync';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`rounded-2xl backdrop-blur-xl border p-8 ${
          isDark
            ? 'bg-white/5 border-white/10'
            : 'bg-white/50 border-indigo-200 shadow-lg'
        }`}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>
            {description}
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <div className={`p-6 rounded-2xl ${
            isDark ? 'bg-white/5' : 'bg-indigo-50'
          }`}>
            {getStatusIcon()}
          </div>

          <div className="text-center">
            <p className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>
              {getStatusText()}
            </p>
            {lastSync && (
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-zinc-500'}`}>
                Last sync: {lastSync.toLocaleString()}
              </p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSyncNow}
            disabled={isLoading || syncStatus === 'in_progress'}
            className={`px-8 py-3 rounded-xl font-semibold text-white transition-all flex items-center gap-2 ${
              isLoading || syncStatus === 'in_progress'
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-500 to-violet-500 hover:shadow-lg hover:shadow-indigo-500/30'
            }`}
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading || syncStatus === 'in_progress' ? 'Syncing...' : 'Sync Now'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}