import { useState } from 'react';
import { LayoutDashboard, Calendar, Users, FileText, Bell, Search, Moon, Sun, ChevronRight, AlertCircle, Activity, Zap, TrendingUp, BarChart3, Settings, Download, Share2, Lock, Unlock, Info, RefreshCw, Sparkles, LogOut, User, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ROOMS = [
  { id: 'R101', name: 'Auditorium A', capacity: 150, building: 'Main' },
  { id: 'R102', name: 'Auditorium B', capacity: 120, building: 'Main' },
  { id: 'R203', name: 'Lab 1', capacity: 40, building: 'Science' },
  { id: 'R204', name: 'Lab 2', capacity: 40, building: 'Science' },
  { id: 'R305', name: 'Lecture Hall 1', capacity: 100, building: 'Engineering' },
];

const TIME_SLOTS = ['08:00', '11:00', '14:00'];

const EXAM_DATA = [
  { id: 1, course: 'Advanced Web Development', students: 95, aiScore: 98, reasoning: 'Optimized for room capacity & professor proximity', level: 'L3', bachelor: 'Computer Science' },
  { id: 2, course: 'Data Structures', students: 87, aiScore: 96, reasoning: 'Balanced capacity utilization', level: 'L2', bachelor: 'Computer Science' },
  { id: 3, course: 'Database Design', students: 38, aiScore: 94, reasoning: 'Lab equipment availability confirmed', level: 'L3', bachelor: 'Computer Science' },
  { id: 4, course: 'UI/UX Design', students: 42, aiScore: 97, reasoning: 'Minimizes student travel time', level: 'M1', bachelor: 'Digital Arts' },
  { id: 5, course: 'Cloud Computing', students: 76, aiScore: 95, reasoning: 'Optimal for practical demonstrations', level: 'L2', bachelor: 'Engineering' },
  { id: 6, course: 'Business Analytics', students: 65, aiScore: 93, reasoning: 'Proximity to business building', level: 'M2', bachelor: 'Business' },
  { id: 7, course: 'Digital Marketing', students: 48, aiScore: 91, reasoning: 'Lab access for practicals', level: 'L1', bachelor: 'Digital Arts' },
  { id: 8, course: 'Financial Modeling', students: 52, aiScore: 94, reasoning: 'Computer lab requirement', level: 'M1', bachelor: 'Business' },
];

const COURSES = [
  { id: 'CS301', name: 'Advanced Web Development', completion: 85, status: 'pending', risk: false },
  { id: 'CS302', name: 'Data Structures', completion: 92, status: 'pending', risk: false },
  { id: 'CS303', name: 'Database Design', completion: 72, status: 'pending', risk: true },
  { id: 'CS304', name: 'UI/UX Design Principles', completion: 88, status: 'released', risk: false },
  { id: 'CS305', name: 'Cloud Computing Fundamentals', completion: 65, status: 'pending', risk: true },
];

const USERS = [
  { id: 1, name: 'Prof. Richard Morrison', role: 'Lecturer', department: 'Computer Science', courses: 3, status: 'active' },
  { id: 2, name: 'Dr. Amina Ahmed', role: 'Senior Lecturer', department: 'Computer Science', courses: 4, status: 'active' },
  { id: 3, name: 'Prof. Lisa Chen', role: 'Lecturer', department: 'Engineering', courses: 2, status: 'active' },
  { id: 4, name: 'Dr. Carlos Martinez', role: 'Assistant Lecturer', department: 'Computer Science', courses: 2, status: 'active' },
  { id: 5, name: 'Prof. Raj Kumar', role: 'Senior Lecturer', department: 'Engineering', courses: 3, status: 'inactive' },
];

const LABELS = {
  EN: {
    insights: 'Insights',
    examPlanner: 'Exam Planner',
    userDirectory: 'User Directory',
    gradeControl: 'Grade Control',
    documents: 'Document Center',
    administration: 'Administration',
    systemOverview: 'System overview and management dashboard',
    roomOccupancy: 'Room Occupancy',
    invigilatorLoad: 'Invigilator Load',
    atRiskStudents: 'At-Risk Students',
    aiHealthMonitor: 'AI Health Monitor',
    systemStatus: 'System Status: Optimal',
    allocationAccuracy: 'Allocation Accuracy',
    processingTime: 'Processing Time',
    systemHealth: 'System Health',
    healthy: 'Healthy',
    unassignedExams: 'Unassigned Exams',
    examScheduleGrid: 'Exam Schedule Grid',
    room: 'Room',
    students: 'Students',
    runSmartAllocation: 'Run Smart Allocation',
    resetAll: 'Reset All',
    level: 'Level',
    bachelor: 'Bachelor',
    allBachelors: 'All Bachelors',
    allLevels: 'All Levels',
    courseCode: 'Course Code',
    courseName: 'Course Name',
    completion: 'Completion',
    releaseToPortal: 'Release to Portal',
    attendanceSheets: 'Attendance Sheets',
    generateSheets: 'Generate Sheets',
    qrRoomLabels: 'QR Room Labels',
    exportLabels: 'Export Labels',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
  },
  FR: {
    insights: 'Aperçus',
    examPlanner: 'Planificateur d\'Examens',
    userDirectory: 'Répertoire d\'Utilisateurs',
    gradeControl: 'Contrôle des Notes',
    documents: 'Centre de Documents',
    administration: 'Administration',
    systemOverview: 'Aperçu du système et tableau de bord de gestion',
    roomOccupancy: 'Occupation des Salles',
    invigilatorLoad: 'Charge de Surveillance',
    atRiskStudents: 'Étudiants à Risque',
    aiHealthMonitor: 'Moniteur de Santé IA',
    systemStatus: 'État du Système: Optimal',
    allocationAccuracy: 'Précision d\'Allocation',
    processingTime: 'Temps de Traitement',
    systemHealth: 'Santé du Système',
    healthy: 'Sain',
    unassignedExams: 'Examens Non Assignés',
    examScheduleGrid: 'Grille d\'Emploi du Temps',
    room: 'Salle',
    students: 'Étudiants',
    runSmartAllocation: 'Exécuter Allocation Intelligente',
    resetAll: 'Réinitialiser Tout',
    level: 'Niveau',
    bachelor: 'Diplôme',
    allBachelors: 'Tous les Diplômes',
    allLevels: 'Tous les Niveaux',
    courseCode: 'Code du Cours',
    courseName: 'Nom du Cours',
    completion: 'Achèvement',
    releaseToPortal: 'Libérer au Portail',
    attendanceSheets: 'Feuilles de Présence',
    generateSheets: 'Générer des Feuilles',
    qrRoomLabels: 'Étiquettes QR des Salles',
    exportLabels: 'Exporter les Étiquettes',
    profile: 'Profil',
    settings: 'Paramètres',
    logout: 'Déconnexion',
  },
};

export default function AdminPortal() {
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState('EN');
  const [activeView, setActiveView] = useState('insights');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAutoAllocating, setIsAutoAllocating] = useState(false);
  const [hoveredExam, setHoveredExam] = useState(null);
  const [releaseStates, setReleaseStates] = useState({});
  const [gridAssignments, setGridAssignments] = useState({});
  const [unassignedExams, setUnassignedExams] = useState(EXAM_DATA);
  const [draggedExam, setDraggedExam] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedBachelor, setSelectedBachelor] = useState('All Bachelors');

  const t = LABELS[language];

  const filteredUnassignedExams = unassignedExams.filter(exam => {
    const levelMatch = selectedLevel === 'All Levels' || exam.level === selectedLevel;
    const bachelorMatch = selectedBachelor === 'All Bachelors' || exam.bachelor === selectedBachelor;
    return levelMatch && bachelorMatch;
  });

  const handleSmartAllocation = () => {
    setIsAutoAllocating(true);
    setTimeout(() => {
      const newAssignments = {};
      EXAM_DATA.forEach((exam) => {
        const roomIndex = exam.id % ROOMS.length;
        const timeIndex = (exam.id - 1) % TIME_SLOTS.length;
        newAssignments[exam.id] = { room: ROOMS[roomIndex].id, time: TIME_SLOTS[timeIndex] };
      });
      setGridAssignments(newAssignments);
      setUnassignedExams([]);
      setIsAutoAllocating(false);
    }, 2000);
  };

  const handleResetAll = () => {
    setGridAssignments({});
    setUnassignedExams(EXAM_DATA);
    setSelectedLevel('All Levels');
    setSelectedBachelor('All Bachelors');
  };

  const handleDropExam = (roomId, timeSlot, examId) => {
    const exam = unassignedExams.find(e => e.id === examId);
    if (exam) {
      setGridAssignments(prev => ({
        ...prev,
        [examId]: { room: roomId, time: timeSlot }
      }));
      setUnassignedExams(prev => prev.filter(e => e.id !== examId));
    }
  };

  const getAssignedExamForCell = (roomId, timeSlot) => {
    for (let [examId, assignment] of Object.entries(gridAssignments)) {
      if (assignment.room === roomId && assignment.time === timeSlot) {
        const examData = EXAM_DATA.find(e => e.id === parseInt(examId));
        return { id: examId, ...examData };
      }
    }
    return null;
  };

  const toggleRelease = (courseId) => {
    setReleaseStates(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const navItems = [
    { id: 'insights', label: t.insights, icon: LayoutDashboard },
    { id: 'exam-planner', label: t.examPlanner, icon: Calendar },
    { id: 'user-directory', label: t.userDirectory, icon: Users },
    { id: 'grade-control', label: t.gradeControl, icon: BarChart3 },
    { id: 'documents', label: t.documents, icon: FileText },
  ];

  const filteredUsers = USERS.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const atRiskCount = COURSES.filter(c => c.risk).length;
  const avgRoomOccupancy = Math.round(EXAM_DATA.reduce((acc, exam) => acc + (exam.students / 150), 0) / EXAM_DATA.length * 100);
  const avgInvigilatorLoad = Math.round(EXAM_DATA.length / USERS.filter(u => u.role.includes('Lecturer')).length);

  const levelOptions = ['All Levels', 'L1', 'L2', 'L3', 'M1', 'M2'];
  const bachelorOptions = ['All Bachelors', 'Computer Science', 'Digital Arts', 'Business', 'Engineering'];

  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white' 
        : 'bg-gradient-to-br from-zinc-50 via-white to-zinc-100 text-zinc-900'
    }`}>
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 ${
            isDark ? 'bg-indigo-500/10' : 'bg-indigo-500/5'
          }`}
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 ${
            isDark ? 'bg-violet-500/10' : 'bg-violet-500/5'
          }`}
        />
      </div>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-30 h-screen w-64 border-r backdrop-blur-xl p-6 flex flex-col transition-all duration-300 ${
        isDark 
          ? 'border-white/10 bg-white/5' 
          : 'border-indigo-200 bg-white/40 shadow-lg'
      }`}>
        <div className="mb-12">
          <div className="flex items-center gap-3">
            <img src="https://blob.v0.app/UZSKM.png" alt="Horizon" className="h-8 w-auto" />
            <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Horizon Admin
            </h1>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 relative group ${
                  isActive
                    ? isDark
                      ? 'bg-gradient-to-r from-indigo-500/40 to-violet-500/40 border border-indigo-400/30 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-gradient-to-r from-indigo-500/30 to-violet-500/30 border border-indigo-300 text-zinc-900 shadow-lg shadow-indigo-400/20'
                    : isDark
                      ? 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/60 border border-transparent'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeGlow"
                    className={`absolute inset-0 rounded-lg blur-lg ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-400/20'}`}
                    initial={false}
                  />
                )}
                <Icon className="w-5 h-5 relative z-10" />
                <span className="text-sm font-medium relative z-10">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        <div className="space-y-4 pt-4 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`w-full px-3 py-2 text-sm rounded-lg transition-all backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-indigo-400/50 border ${
              isDark
                ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                : 'bg-white/50 border-indigo-200 text-zinc-900 hover:bg-white/70'
            }`}
          >
            <option value="EN">English</option>
            <option value="FR">Français</option>
          </select>

          <motion.button
            onClick={() => setIsDark(!isDark)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full px-3 py-2 text-sm rounded-lg transition-all backdrop-blur-xl border flex items-center justify-center gap-2 ${
              isDark
                ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                : 'bg-white/50 border-indigo-200 text-zinc-600 hover:text-zinc-900 hover:bg-white/70'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {isDark ? 'Light' : 'Dark'}
          </motion.button>

          <div className={`pt-4 border-t relative ${isDark ? 'border-white/10' : 'border-indigo-200'}`}>
            <motion.button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 transition-all duration-300 px-2 py-2 rounded-lg ${
                isDark ? 'hover:bg-white/5' : 'hover:bg-white/70'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                AD
              </div>
              <div className="text-xs text-left flex-1">
                <p className={`font-medium ${isDark ? 'text-white' : 'text-zinc-900'}`}>Admin</p>
                <p className={isDark ? 'text-gray-500' : 'text-zinc-600'}>System Admin</p>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`absolute left-0 right-0 bottom-full mb-2 rounded-lg backdrop-blur-xl border shadow-lg z-50 ${
                    isDark
                      ? 'bg-white/10 border-white/20'
                      : 'bg-white/80 border-indigo-200'
                  }`}
                >
                  <button className={`w-full text-left px-4 py-2 flex items-center gap-2 transition-colors ${
                    isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-indigo-50 text-zinc-900'
                  }`}>
                    <User className="w-4 h-4" />
                    <span className="text-sm">{t.profile}</span>
                  </button>
                  <button className={`w-full text-left px-4 py-2 flex items-center gap-2 transition-colors border-t ${
                    isDark ? 'border-white/10 hover:bg-white/10 text-white' : 'border-indigo-200 hover:bg-indigo-50 text-zinc-900'
                  }`}>
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">{t.settings}</span>
                  </button>
                  <button className={`w-full text-left px-4 py-2 flex items-center gap-2 transition-colors border-t ${
                    isDark ? 'border-white/10 hover:bg-white/10 text-white' : 'border-indigo-200 hover:bg-indigo-50 text-zinc-900'
                  }`}>
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">{t.logout}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 relative z-10 p-8 min-h-screen overflow-y-auto">
        {/* Top Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">{t.administration}</h1>
            <p className={isDark ? 'text-gray-400' : 'text-zinc-600'}>{t.systemOverview}</p>
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

        {/* Content */}
        <AnimatePresence mode="wait">
          {/* Insights View */}
          {activeView === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`rounded-2xl backdrop-blur-xl border p-6 hover:border-indigo-400/50 transition-all ${
                    isDark
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/50 border-indigo-200 shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>
                      {t.roomOccupancy}
                    </h3>
                    <div className={`p-2 rounded-lg border ${
                      isDark ? 'bg-blue-500/20 border-blue-400/30' : 'bg-blue-100 border-blue-300'
                    }`}>
                      <BarChart3 className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                  </div>
                  <p className="text-4xl font-bold mb-2">{avgRoomOccupancy}%</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>Average across all venues</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`rounded-2xl backdrop-blur-xl border p-6 hover:border-purple-400/50 transition-all ${
                    isDark
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/50 border-indigo-200 shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>
                      {t.invigilatorLoad}
                    </h3>
                    <div className={`p-2 rounded-lg border ${
                      isDark ? 'bg-purple-500/20 border-purple-400/30' : 'bg-purple-100 border-purple-300'
                    }`}>
                      <TrendingUp className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                    </div>
                  </div>
                  <p className="text-4xl font-bold mb-2">{avgInvigilatorLoad} Exams</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>Average per invigilator</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className={`rounded-2xl backdrop-blur-xl border p-6 hover:border-red-400/50 transition-all ${
                    isDark
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/50 border-indigo-200 shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>
                      {t.atRiskStudents}
                    </h3>
                    <div className={`p-2 rounded-lg border ${
                      isDark ? 'bg-red-500/20 border-red-400/30' : 'bg-red-100 border-red-300'
                    }`}>
                      <AlertCircle className={`w-5 h-5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                    </div>
                  </div>
                  <p className="text-4xl font-bold mb-2">{atRiskCount}</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>Courses below 75% completion</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={`rounded-2xl backdrop-blur-xl border p-8 relative overflow-hidden group ${
                  isDark
                    ? 'bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border-white/10'
                    : 'bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border-indigo-300 shadow-lg'
                }`}
              >
                <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-indigo-500/0 via-transparent to-violet-500/0 group-hover:from-indigo-500/10 group-hover:to-violet-500/10' : ''} transition-all duration-500`} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{t.aiHealthMonitor}</h2>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>{t.systemStatus}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                    <div>
                      <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>{t.allocationAccuracy}</p>
                      <p className="text-2xl font-bold text-indigo-400">98.5%</p>
                    </div>
                    <div>
                      <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>{t.processingTime}</p>
                      <p className="text-2xl font-bold text-violet-400">1.2s</p>
                    </div>
                    <div>
                      <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>{t.systemHealth}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <p className="text-sm font-semibold text-green-400">{t.healthy}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Exam Planner View */}
          {activeView === 'exam-planner' && (
            <motion.div
              key="exam-planner"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex gap-4">
                <motion.button
                  onClick={handleSmartAllocation}
                  disabled={isAutoAllocating}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/50 disabled:opacity-70 transition-all flex items-center gap-2"
                >
                  {isAutoAllocating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Smart Allocation Running...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      {t.runSmartAllocation}
                    </>
                  )}
                </motion.button>
                <motion.button
                  onClick={handleResetAll}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 border ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                      : 'bg-white/50 border-indigo-200 text-zinc-900 hover:bg-white/70'
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                  {t.resetAll}
                </motion.button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Unassigned Exams Pool */}
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
                  <h3 className="text-lg font-bold mb-4">{t.unassignedExams}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div>
                      <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>{t.level}</label>
                      <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className={`w-full mt-1 px-3 py-2 text-sm rounded-lg border transition-all ${
                          isDark
                            ? 'bg-white/5 border-white/10 text-white'
                            : 'bg-white/50 border-indigo-200 text-zinc-900'
                        }`}
                      >
                        {levelOptions.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>{t.bachelor}</label>
                      <select
                        value={selectedBachelor}
                        onChange={(e) => setSelectedBachelor(e.target.value)}
                        className={`w-full mt-1 px-3 py-2 text-sm rounded-lg border transition-all ${
                          isDark
                            ? 'bg-white/5 border-white/10 text-white'
                            : 'bg-white/50 border-indigo-200 text-zinc-900'
                        }`}
                      >
                        {bachelorOptions.map(bachelor => (
                          <option key={bachelor} value={bachelor}>{bachelor}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {filteredUnassignedExams.length > 0 ? (
                      filteredUnassignedExams.map((exam) => (
                        <motion.div
                          key={exam.id}
                          draggable
                          onDragStart={() => setDraggedExam(exam.id)}
                          onDragEnd={() => setDraggedExam(null)}
                          className={`p-4 rounded-lg border cursor-move hover:border-amber-400/70 transition-all ${
                            isDark
                              ? 'bg-gradient-to-br from-amber-600/20 to-orange-600/20 border-amber-400/30'
                              : 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-300'
                          }`}
                        >
                          <p className="font-semibold text-sm">{exam.course}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>{exam.students} {t.students}</span>
                            <span className={`text-xs px-2 py-1 rounded border ${
                              isDark
                                ? 'bg-amber-500/30 border-amber-400/50 text-amber-300'
                                : 'bg-amber-500/30 border-amber-400 text-amber-700'
                            }`}>
                              {exam.aiScore}%
                            </span>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <p className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>All exams assigned ✓</p>
                    )}
                  </div>
                </motion.div>

                {/* Scheduling Grid */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="text-lg font-bold">{t.examScheduleGrid}</h3>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
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
                            <th className={`text-left px-4 py-3 font-semibold w-32 ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>
                              {t.room}
                            </th>
                            {TIME_SLOTS.map((time) => (
                              <th key={time} className={`text-center px-4 py-3 font-semibold min-w-48 ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>
                                {time}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {ROOMS.map((room) => (
                            <motion.tr
                              key={room.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className={`border-b ${isDark ? 'border-white/10' : 'border-indigo-200'}`}
                            >
                              <td className={`px-4 py-3 font-medium text-sm ${isDark ? 'bg-white/5' : 'bg-white/60'}`}>
                                <div>
                                  <p className="font-semibold">{room.name}</p>
                                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>{room.building}</p>
                                </div>
                              </td>
                              {TIME_SLOTS.map((time) => {
                                const assignedExam = getAssignedExamForCell(room.id, time);
                                return (
                                  <motion.td
                                    key={`${room.id}-${time}`}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => draggedExam && handleDropExam(room.id, time, draggedExam)}
                                    className={`px-4 py-3 min-w-48 border-l transition-all relative ${
                                      draggedExam && !assignedExam
                                        ? isDark
                                          ? 'bg-green-500/20 border-green-400/50'
                                          : 'bg-green-500/30 border-green-400'
                                        : isDark
                                          ? 'bg-white/5 border-white/10'
                                          : 'bg-white/30 border-indigo-200'
                                    }`}
                                  >
                                    {assignedExam ? (
                                      <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`p-3 rounded-lg border ${
                                          isDark
                                            ? 'bg-gradient-to-br from-indigo-600/30 to-violet-600/30 border-indigo-400/50'
                                            : 'bg-gradient-to-br from-indigo-500/30 to-violet-500/30 border-indigo-400'
                                        }`}
                                      >
                                        <p className="text-xs font-semibold truncate">{assignedExam.course}</p>
                                        <div className="flex items-center justify-between mt-2">
                                          <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>{assignedExam.students}👥</span>
                                          <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className="relative group/badge"
                                          >
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold border ${
                                              isDark
                                                ? 'bg-green-500/40 border-green-400/50 text-green-300'
                                                : 'bg-green-500/40 border-green-400 text-green-700'
                                            }`}>
                                              <Sparkles className="w-3 h-3" />
                                              AI
                                            </span>
                                            <motion.div
                                              initial={{ opacity: 0, y: -10 }}
                                              whileHover={{ opacity: 1, y: -20 }}
                                              className={`absolute left-1/2 -translate-x-1/2 w-40 text-center rounded-lg p-2 text-xs z-50 pointer-events-none whitespace-normal border ${
                                                isDark
                                                  ? 'bg-gray-950 border-white/20 text-gray-200'
                                                  : 'bg-white border-indigo-300 text-zinc-900 shadow-lg'
                                              }`}
                                            >
                                              <p className="font-semibold text-green-400 mb-1">{assignedExam.aiScore}% Confidence</p>
                                              <p>{assignedExam.reasoning}</p>
                                            </motion.div>
                                          </motion.div>
                                        </div>
                                      </motion.div>
                                    ) : (
                                      <div className={`text-center py-4 text-xs ${isDark ? 'text-gray-500' : 'text-zinc-500'}`}>
                                        {draggedExam ? 'Drop here' : '—'}
                                      </div>
                                    )}
                                  </motion.td>
                                );
                              })}
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Grade Control View */}
          {activeView === 'grade-control' && (
            <motion.div
              key="grade-control"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">{t.gradeControl}</h2>
              <div className={`rounded-2xl backdrop-blur-xl border overflow-hidden ${
                isDark
                  ? 'bg-white/5 border-white/10'
                  : 'bg-white/50 border-indigo-200 shadow-lg'
              }`}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${isDark ? 'bg-white/10 border-white/10' : 'bg-white/60 border-indigo-200'}`}>
                        <th className={`text-left px-6 py-4 font-semibold ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>
                          {t.courseCode}
                        </th>
                        <th className={`text-left px-6 py-4 font-semibold ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>
                          {t.courseName}
                        </th>
                        <th className={`text-center px-6 py-4 font-semibold ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>
                          {t.completion}
                        </th>
                        <th className={`text-center px-6 py-4 font-semibold ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>
                          {t.releaseToPortal}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {COURSES.map((course, idx) => (
                        <motion.tr
                          key={course.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className={`border-b transition-all ${
                            course.risk
                              ? isDark
                                ? 'bg-red-500/10 border-white/10'
                                : 'bg-red-500/10 border-indigo-200'
                              : isDark
                                ? 'border-white/10 hover:bg-white/5'
                                : 'border-indigo-200 hover:bg-white/60'
                          }`}
                        >
                          <td className="px-6 py-4 font-semibold">{course.id}</td>
                          <td className="px-6 py-4">{course.name}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-24 h-2 rounded-full overflow-hidden border ${
                                isDark ? 'bg-white/10 border-white/10' : 'bg-zinc-200 border-indigo-200'
                              }`}>
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${course.completion}%` }}
                                  transition={{ duration: 1, delay: 0.3 + idx * 0.1 }}
                                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
                                />
                              </div>
                              <span className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>
                                {course.completion}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <motion.button
                              onClick={() => toggleRelease(course.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className={`p-2 rounded-lg border transition-all ${
                                releaseStates[course.id]
                                  ? isDark
                                    ? 'bg-green-500/30 border-green-400/50'
                                    : 'bg-green-500/30 border-green-400'
                                  : isDark
                                    ? 'bg-white/5 border-white/10'
                                    : 'bg-white/50 border-indigo-200'
                              }`}
                            >
                              {releaseStates[course.id] ? (
                                <Unlock className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                              ) : (
                                <Lock className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`} />
                              )}
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* User Directory View */}
          {activeView === 'user-directory' && (
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
                      isDark
                        ? 'bg-white/5 border-white/10'
                        : 'bg-white/50 border-indigo-200 shadow-lg'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                        {user.name.split(' ')[0][0]}{user.name.split(' ')[1][0]}
                      </div>
                      <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    </div>
                    <h3 className="font-semibold mb-1">{user.name}</h3>
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>{user.role}</p>
                    <div className={`space-y-2 pt-4 border-t ${isDark ? 'border-white/10' : 'border-indigo-200'}`}>
                      <div className="flex justify-between text-xs">
                        <span className={isDark ? 'text-gray-400' : 'text-zinc-600'}>Department</span>
                        <span className={isDark ? 'text-white' : 'text-zinc-900'}>{user.department}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className={isDark ? 'text-gray-400' : 'text-zinc-600'}>Courses</span>
                        <span className={isDark ? 'text-white' : 'text-zinc-900'}>{user.courses}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Document Center View */}
          {activeView === 'documents' && (
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
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}