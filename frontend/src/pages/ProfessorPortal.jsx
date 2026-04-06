import { useState } from 'react';
import { Search, ChevronLeft, Sparkles, AlertCircle, Lock } from 'lucide-react';
import Header from '../components/Header';

export default function ProfessorPortal() {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [activeTab, setActiveTab] = useState('grade-entry');
  const [view, setView] = useState('subjects'); // 'subjects' or 'students'
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [notificationCount] = useState(3);

  // Course and Grade Data
  const courses = [
    { id: 'CS301', name: 'Advanced Web Development', studentCount: 5, status: 'pending' },
    { id: 'CS302', name: 'Data Structures', studentCount: 3, status: 'pending' },
    { id: 'CS303', name: 'Database Design', studentCount: 2, status: 'pending' },
  ];

  const [grades, setGrades] = useState({
    CS301: [
      { id: 1, name: 'Alice Johnson', grade: 18, aiGenerated: false },
      { id: 2, name: 'Bob Smith', grade: 16, aiGenerated: false },
      { id: 3, name: 'Charlie Brown', grade: '', aiGenerated: false },
      { id: 4, name: 'Diana Prince', grade: 19, aiGenerated: false },
      { id: 5, name: 'Evan Davis', grade: '', aiGenerated: false },
    ],
    CS302: [
      { id: 1, name: 'Alice Johnson', grade: 17, aiGenerated: false },
      { id: 2, name: 'Bob Smith', grade: '', aiGenerated: false },
      { id: 3, name: 'Charlie Brown', grade: 13, aiGenerated: false },
    ],
    CS303: [
      { id: 1, name: 'Alice Johnson', grade: '', aiGenerated: false },
      { id: 2, name: 'Bob Smith', grade: '', aiGenerated: false },
    ],
  });

  const invigilationSchedule = [
    { id: 1, exam: 'Advanced Web Development', date: 'Apr 15, 2024', time: '09:00 AM', room: '201' },
    { id: 2, exam: 'Data Structures', date: 'Apr 18, 2024', time: '02:00 PM', room: '305' },
    { id: 3, exam: 'Database Design', date: 'Apr 22, 2024', time: '10:30 AM', room: '102' },
    { id: 4, exam: 'UI/UX Design Principles', date: 'Apr 25, 2024', time: '01:00 PM', room: '401' },
  ];

  const labels = {
    EN: {
      professorPortal: 'Professor Portal',
      gradeEntry: 'Grade Entry',
      invigilationDashboard: 'Invigilation Dashboard',
      smartSearch: 'Search courses or quick actions...',
      manageGrades: 'Manage Grades',
      studentName: 'Student Name',
      grade: 'Grade',
      outOf20: 'Out of 20',
      finalizeValidate: 'Finalize & Validate',
      validated: 'Validated',
      backToSubjects: '← Back to Subjects',
      visualIntelligence: 'Visual Intelligence',
      aiProcessing: 'AI Processing...',
      processingDocument: 'Analyzing document and extracting grades...',
      autoFilled: 'Auto-filled by AI',
      lowGrade: 'Low grade detected (< 5)',
      confirmValidation: 'Confirm Grade Validation',
      confirmMessage: 'Are you sure you want to finalize and validate these grades? This action cannot be undone.',
      cancel: 'Cancel',
      confirm: 'Confirm',
      exam: 'Exam',
      date: 'Date',
      time: 'Time',
      room: 'Room',
      quickActions: 'Quick Actions',
      openGradebook: 'Open Gradebook',
      submitWithAI: 'Submit with Visual Intelligence',
    },
    FR: {
      professorPortal: 'Portail des Professeurs',
      gradeEntry: 'Saisie des Notes',
      invigilationDashboard: 'Tableau de Surveillance',
      smartSearch: 'Rechercher des cours ou des actions rapides...',
      manageGrades: 'Gérer les Notes',
      studentName: 'Nom de l\'Étudiant',
      grade: 'Note',
      outOf20: 'Sur 20',
      finalizeValidate: 'Finaliser et Valider',
      validated: 'Validé',
      backToSubjects: '← Retour aux Sujets',
      visualIntelligence: 'Intelligence Visuelle',
      aiProcessing: 'Traitement IA...',
      processingDocument: 'Analyse du document et extraction des notes...',
      autoFilled: 'Rempli automatiquement par IA',
      lowGrade: 'Note basse détectée (< 5)',
      confirmValidation: 'Confirmer la Validation des Notes',
      confirmMessage: 'Êtes-vous sûr de vouloir finaliser et valider ces notes? Cette action ne peut pas être annulée.',
      cancel: 'Annuler',
      confirm: 'Confirmer',
      exam: 'Examen',
      date: 'Date',
      time: 'Heure',
      room: 'Salle',
      quickActions: 'Actions Rapides',
      openGradebook: 'Ouvrir le Carnet de Notes',
      submitWithAI: 'Soumettre avec Intelligence Visuelle',
    },
  };

  const t = labels[language];

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleGradeChange = (courseId, studentId, newGrade) => {
    if (!isLocked) {
      setGrades((prev) => ({
        ...prev,
        [courseId]: prev[courseId].map((student) =>
          student.id === studentId ? { ...student, grade: newGrade } : student
        ),
      }));
    }
  };

  const handleVisualIntelligence = () => {
    setIsProcessingAI(true);
    setTimeout(() => {
      const updatedGrades = grades[selectedCourse].map((student) =>
        student.grade === '' || student.grade === null
          ? { ...student, grade: Math.floor(Math.random() * 11) + 10, aiGenerated: true }
          : student
      );
      setGrades((prev) => ({
        ...prev,
        [selectedCourse]: updatedGrades,
      }));
      setIsProcessingAI(false);
    }, 2000);
  };

  const handleFinalizeValidate = () => {
    setShowConfirmModal(true);
  };

  const confirmValidation = () => {
    setIsLocked(true);
    setShowConfirmModal(false);
  };

  const getSearchSuggestions = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const suggestions = [];

    courses.forEach((course) => {
      if (course.name.toLowerCase().includes(query) || course.id.toLowerCase().includes(query)) {
        suggestions.push({
          type: 'course',
          label: `${t.openGradebook} - ${course.name}`,
          courseId: course.id,
          action: 'open',
        });
        suggestions.push({
          type: 'course',
          label: `${t.submitWithAI} - ${course.name}`,
          courseId: course.id,
          action: 'ai',
        });
      }
    });

    return suggestions.slice(0, 5);
  };

  const handleSearchAction = (suggestion) => {
    setSelectedCourse(suggestion.courseId);
    setView('students');
    setIsLocked(false);
    setSearchQuery('');
    setShowSearchDropdown(false);
    if (suggestion.action === 'ai') {
      setTimeout(() => handleVisualIntelligence(), 300);
    }
  };

  const suggestions = getSearchSuggestions();
  const currentGrades = grades[selectedCourse] || [];

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col transition-colors duration-200">
        
        {/* COMPONENTIZED HEADER */}
        <Header
          isDark={isDark}
          toggleDarkMode={toggleDarkMode}
          language={language}
          setLanguage={setLanguage}
          notificationCount={notificationCount}
          showNotifications={true}
          profileSlot={
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#4A7BA7] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                RM
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-900 dark:text-gray-50">
                {t.professorPortal}
              </span>
            </div>
          }
        />

        {/* Portal Tabs */}
        <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 lg:px-8 flex gap-4">
          <button
            onClick={() => {
              setActiveTab('grade-entry');
              setView('subjects');
            }}
            className={`py-3 px-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'grade-entry'
                ? 'border-[#1E3A5F] text-[#1E3A5F] dark:text-[#4A7BA7]'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50'
            }`}
          >
            {t.gradeEntry}
          </button>
          <button
            onClick={() => setActiveTab('invigilation')}
            className={`py-3 px-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'invigilation'
                ? 'border-[#1E3A5F] text-[#1E3A5F] dark:text-[#4A7BA7]'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50'
            }`}
          >
            {t.invigilationDashboard}
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Grade Entry Tab */}
            {activeTab === 'grade-entry' && (
              <>
                {/* Smart Search */}
                <div className="mb-8 relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="text"
                      placeholder={t.smartSearch}
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSearchDropdown(true);
                      }}
                      onFocus={() => setShowSearchDropdown(true)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
                    />
                  </div>

                  {/* Search Dropdown */}
                  {showSearchDropdown && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                      <div className="p-2">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase px-3 py-2">
                          {t.quickActions}
                        </p>
                        {suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSearchAction(suggestion)}
                            className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            {suggestion.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {showSearchDropdown && (
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowSearchDropdown(false)}
                    />
                  )}
                </div>

                {/* Subject Blocks or Student List */}
                {view === 'subjects' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                      <div
                        key={course.id}
                        className="bg-white dark:bg-slate-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all"
                      >
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                              {course.id}
                            </p>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mt-1">
                              {course.name}
                            </h3>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-2xl font-bold text-[#1E3A5F] dark:text-[#4A7BA7]">
                                {course.studentCount}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {language === 'EN' ? 'Students' : 'Étudiants'}
                              </p>
                            </div>
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                course.status === 'pending'
                                  ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400'
                                  : 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                              }`}
                            >
                              {language === 'EN' ? (course.status === 'pending' ? 'Pending' : 'Finalized') : (course.status === 'pending' ? 'En Attente' : 'Finalisé')}
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setSelectedCourse(course.id);
                              setView('students');
                              setIsLocked(false);
                            }}
                            className="w-full px-4 py-2 rounded-md bg-[#1E3A5F] dark:bg-[#4A7BA7] text-white font-semibold hover:bg-[#0f1b2e] dark:hover:bg-[#3d6b96] transition-all"
                          >
                            {t.manageGrades}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Back Button */}
                    <button
                      onClick={() => {
                        setView('subjects');
                        setSelectedCourse(null);
                      }}
                      className="flex items-center gap-2 text-[#1E3A5F] dark:text-[#4A7BA7] hover:text-[#0f1b2e] dark:hover:text-[#5a8ec9] font-semibold"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      {t.backToSubjects}
                    </button>

                    {/* Student List Table */}
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800">
                              <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-gray-50">
                                {t.studentName}
                              </th>
                              <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-gray-50">
                                {t.grade}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentGrades.map((student) => (
                              <tr
                                key={student.id}
                                className={`border-b border-gray-200 dark:border-gray-700 transition-colors ${
                                  student.aiGenerated
                                    ? 'bg-purple-50 dark:bg-purple-900/20'
                                    : 'hover:bg-gray-50 dark:hover:bg-slate-800'
                                }`}
                              >
                                <td className="py-4 px-6 text-gray-900 dark:text-gray-50 font-medium">
                                  {student.name}
                                  {student.aiGenerated && (
                                    <span className="ml-2 text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 px-2 py-1 rounded">
                                      {t.autoFilled}
                                    </span>
                                  )}
                                </td>
                                <td className="py-4 px-6 text-center">
                                  <div className="flex items-center justify-center gap-2">
                                    <input
                                      type="number"
                                      min="0"
                                      max="20"
                                      value={student.grade}
                                      onChange={(e) =>
                                        handleGradeChange(
                                          selectedCourse,
                                          student.id,
                                          e.target.value ? parseInt(e.target.value) : ''
                                        )
                                      }
                                      disabled={isLocked}
                                      className={`w-20 px-3 py-2 text-center rounded-md border transition-all ${
                                        student.aiGenerated
                                          ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-700'
                                          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                                      } text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] disabled:opacity-60`}
                                    />
                                    {student.grade && student.grade < 5 && (
                                      <AlertCircle className="w-5 h-5 text-orange-500" title={t.lowGrade} />
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Action Buttons */}
                      <div className="bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <button
                          onClick={handleVisualIntelligence}
                          disabled={isLocked || isProcessingAI}
                          className="flex items-center gap-2 px-6 py-2 rounded-md bg-purple-600 dark:bg-purple-700 text-white font-semibold hover:bg-purple-700 dark:hover:bg-purple-600 disabled:opacity-60 transition-all"
                        >
                          {isProcessingAI ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              {t.aiProcessing}
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4" />
                              {t.visualIntelligence}
                            </>
                          )}
                        </button>

                        <div className="flex items-center gap-4">
                          {isLocked && (
                            <span className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                              <Lock className="w-4 h-4" />
                              {t.validated}
                            </span>
                          )}
                          <button
                            onClick={handleFinalizeValidate}
                            disabled={isLocked}
                            className="px-4 py-2 rounded-md bg-[#1E3A5F] dark:bg-[#4A7BA7] text-white font-semibold hover:bg-[#0f1b2e] dark:hover:bg-[#3d6b96] disabled:opacity-60 transition-all"
                          >
                            {isLocked ? t.validated : t.finalizeValidate}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Invigilation Dashboard Tab */}
            {activeTab === 'invigilation' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                  {t.invigilationDashboard}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {invigilationSchedule.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all"
                    >
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                            {t.exam}
                          </p>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mt-1">
                            {item.exam}
                          </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200 dark:border-gray-700">
                          <div>
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                              {t.date}
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-50 mt-1">
                              {item.date}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                              {t.time}
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-50 mt-1">
                              {item.time}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                            {t.room}
                          </p>
                          <p className="text-3xl font-bold text-[#1E3A5F] dark:text-[#4A7BA7] mt-1">
                            {item.room}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                {t.confirmValidation}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t.confirmMessage}
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={confirmValidation}
                  className="px-4 py-2 rounded-md bg-[#1E3A5F] dark:bg-[#4A7BA7] text-white font-semibold hover:bg-[#0f1b2e] dark:hover:bg-[#3d6b96] transition-colors"
                >
                  {t.confirm}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* AI Processing Overlay */}
        {isProcessingAI && (
          <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl p-8 max-w-sm text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto">
                <div className="w-8 h-8 border-3 border-purple-600 dark:border-purple-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                {t.aiProcessing}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t.processingDocument}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}