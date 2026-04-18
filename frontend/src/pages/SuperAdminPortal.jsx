import React, { useState } from 'react';
import { Search, Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import SuperAdminSidebar from '../components/superadmin/SuperAdminSidebar';
import SuperAdminProfile from '../components/superadmin/SuperAdminProfile';
import SuperAdminSettings from '../components/superadmin/SuperAdminSettings';
import DataSyncView from '../components/superadmin/views/DataSyncView';
import AuditLogView from '../components/superadmin/views/AuditLogView';
import ConfigView from '../components/superadmin/views/ConfigView';

export default function SuperAdminPortal() {
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState('EN');
  const [activeView, setActiveView] = useState('sync');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiff, setSelectedDiff] = useState(null);

  const translations = {
    EN: {
      nav: { sync: 'Data Sync', audit: 'Audit Log', config: 'Config' },
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      sync: {
        conflictWizard: 'Conflict Resolution Wizard',
        mergeRecords: 'Merge Records',
        mapToDept: 'Map to Department',
        bulkImport: 'Bulk Import',
        uploadTitle: 'Upload new district sync batch',
        uploadHint: 'Choose a secure file and start the sync process with audit-safe handling.',
        selectFile: 'Select file',
        systemIntegrity: 'System integrity checks',
        stats: {
          databaseLoad: 'Database Load',
          memoryUsage: 'Memory Usage',
          diskHealth: 'Disk Health'
        }
      },
      audit: {
        headline: 'Live audit trace',
        description: 'Trace all high-priority changes across the platform with request and identity awareness.',
        searchPlaceholder: 'Search Audit Logs',
        exportPdf: 'Export PDF',
        tableHeaders: {
          traceId: 'Trace ID',
          operator: 'Operator',
          action: 'Action',
          timestamp: 'Timestamp',
          ipAddress: 'IP Address',
          details: 'Details'
        },
        view: 'View'
      },
      config: {
        title: 'Platform configuration',
        description: 'Set default branding, sync themes, and academic periods for all managed districts.',
        branding: 'Branding',
        institutionalLogo: 'Institutional logo',
        uploadLogo: 'Upload your school logo',
        uploadHint: 'Supports PNG and SVG formats for crisp scaling.',
        primaryColor: 'Primary theme color',
        accentColor: 'Accent highlight color',
        hexCode: 'HEX Code',
        academicContext: 'Academic context settings',
        academicYear: 'Academic year',
        semesterStart: 'Semester start',
        semesterEnd: 'Semester end',
        saveChanges: 'Save changes'
      }
    },
    FR: {
      nav: { sync: 'Synchronisation', audit: 'Journal d\'audit', config: 'Configuration' },
      profile: 'Profil',
      settings: 'Paramètres',
      logout: 'Déconnexion',
      sync: {
        conflictWizard: 'Assistant de résolution des conflits',
        mergeRecords: 'Fusionner les enregistrements',
        mapToDept: 'Mapper vers le département',
        bulkImport: 'Importation en masse',
        uploadTitle: 'Télécharger un nouveau lot de synchronisation de district',
        uploadHint: 'Choisissez un fichier sécurisé et lancez le processus de synchronisation avec un traitement conforme à l’audit.',
        selectFile: 'Sélectionner un fichier',
        systemIntegrity: 'Vérifications d’intégrité du système',
        stats: {
          databaseLoad: 'Charge de la base de données',
          memoryUsage: 'Utilisation de la mémoire',
          diskHealth: 'État du disque'
        }
      },
      audit: {
        headline: 'Suivi d’audit en direct',
        description: 'Suivez tous les changements prioritaires sur la plateforme avec contexte de requête et identité.',
        searchPlaceholder: 'Rechercher dans le journal d’audit',
        exportPdf: 'Exporter en PDF',
        tableHeaders: {
          traceId: 'ID de trace',
          operator: 'Opérateur',
          action: 'Action',
          timestamp: 'Horodatage',
          ipAddress: 'Adresse IP',
          details: 'Détails'
        },
        view: 'Voir'
      },
      config: {
        title: 'Configuration de la plateforme',
        description: 'Définissez l’image de marque par défaut, les thèmes de synchronisation et les périodes académiques pour tous les districts gérés.',
        branding: 'Image de marque',
        institutionalLogo: 'Logo institutionnel',
        uploadLogo: 'Téléchargez le logo de votre établissement',
        uploadHint: 'Prend en charge les formats PNG et SVG pour un rendu net.',
        primaryColor: 'Couleur de thème primaire',
        accentColor: 'Couleur d’accentuation',
        hexCode: 'Code HEX',
        academicContext: 'Paramètres de contexte académique',
        academicYear: 'Année académique',
        semesterStart: 'Début du semestre',
        semesterEnd: 'Fin du semestre',
        saveChanges: 'Enregistrer les modifications'
      }
    }
  };

  const t = translations[language] || translations.EN;

  if (activeView === 'profile') {
    return <SuperAdminProfile isDark={isDark} t={t} setActiveView={setActiveView} />;
  }

  if (activeView === 'settings') {
    return <SuperAdminSettings isDark={isDark} t={t} setActiveView={setActiveView} />;
  }

  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-500 ${
      isDark
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white'
        : 'bg-gradient-to-br from-zinc-50 via-white to-zinc-100 text-zinc-900'
    }`}>
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div animate={{ x: [0, 100, 0], y: [0, 50, 0] }} transition={{ duration: 20, repeat: Infinity }} className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-500/5'}`} />
        <motion.div animate={{ x: [0, -100, 0], y: [0, -50, 0] }} transition={{ duration: 25, repeat: Infinity }} className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 ${isDark ? 'bg-violet-500/10' : 'bg-violet-500/5'}`} />
      </div>

      <SuperAdminSidebar
        isDark={isDark}
        setIsDark={setIsDark}
        language={language}
        setLanguage={setLanguage}
        activeView={activeView}
        setActiveView={setActiveView}
        t={t}
      />

      <main className="ml-64 relative z-10 p-8 min-h-screen overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Super Admin Control</h1>
            <p className={isDark ? 'text-gray-400' : 'text-zinc-600'}>System configuration and management</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className={`absolute left-3 top-3 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-zinc-400'}`} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg backdrop-blur-xl transition-all border focus:outline-none focus:ring-2 focus:ring-indigo-400/50 ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-white placeholder-gray-600 hover:bg-white/10'
                    : 'bg-white/50 border-indigo-200 text-zinc-900 placeholder-zinc-500 hover:bg-white/70'
                }`}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-2 rounded-lg transition-all backdrop-blur-xl border ${
                isDark
                  ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                  : 'bg-white/50 border-indigo-200 text-zinc-600 hover:text-zinc-900 hover:bg-white/70'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeView === 'sync' && <DataSyncView isDark={isDark} t={t} />}
          {activeView === 'audit' && (
            <AuditLogView
              isDark={isDark}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setSelectedDiff={setSelectedDiff}
              t={t}
            />
          )}
          {activeView === 'config' && <ConfigView isDark={isDark} t={t} />}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedDiff && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedDiff(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`max-w-3xl w-full rounded-2xl border backdrop-blur-xl overflow-hidden ${
                isDark
                  ? 'bg-white/10 border-white/20'
                  : 'bg-white/80 border-indigo-200'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`flex items-center justify-between px-8 py-6 border-b ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-white/60 border-indigo-200'
              }`}>
                <div>
                  <h3 className="text-2xl font-bold mb-1">Change Details</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>Trace ID: {selectedDiff.traceId}</p>
                </div>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  onClick={() => setSelectedDiff(null)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-indigo-100'
                  }`}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>Operator</p>
                    <p className="font-semibold">{selectedDiff.operator}</p>
                  </div>
                  <div>
                    <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>Timestamp</p>
                    <p className="font-semibold text-sm">{selectedDiff.timestamp}</p>
                  </div>
                  <div>
                    <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>IP Address</p>
                    <p className="font-mono text-sm">{selectedDiff.ip}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-rose-500' : 'bg-red-500'}`}></div>
                      Before
                    </h4>
                    <div className={`p-4 rounded-lg font-mono text-sm whitespace-pre-wrap break-words ${
                      isDark
                        ? 'bg-rose-500/20 border border-rose-400/30 text-rose-300'
                        : 'bg-red-500/10 border border-red-300 text-red-900'
                    }`}>
                      {JSON.stringify(selectedDiff.before, null, 2)}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-emerald-500' : 'bg-green-500'}`}></div>
                      After
                    </h4>
                    <div className={`p-4 rounded-lg font-mono text-sm whitespace-pre-wrap break-words ${
                      isDark
                        ? 'bg-emerald-500/20 border border-emerald-400/30 text-emerald-300'
                        : 'bg-green-500/10 border border-green-300 text-green-900'
                    }`}>
                      {JSON.stringify(selectedDiff.after, null, 2)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
