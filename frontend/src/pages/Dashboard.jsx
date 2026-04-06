import { useState } from 'react';
import { Search, Calendar, BookOpen, BarChart3, Clock } from 'lucide-react';
import Header from '../components/Header'; 

export default function Dashboard() {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount] = useState(3);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const labels = {
    EN: {
      examCalendar: 'Exam Calendar',
      myGrades: 'My Grades',
      quickSearch: 'Search courses, faculty, or resources...',
      semesterProgress: 'Semester Progress',
      currentGPA: 'Current GPA',
      attendance: 'Attendance %',
      daysUntilExam: 'Days until next Exam',
      upcomingExams: 'Upcoming Exams',
      date: 'Date',
      subject: 'Subject',
      time: 'Time',
      recentGrades: 'Recent Course Grades',
      course: 'Course',
      grade: 'Grade',
      instructor: 'Instructor',
      completed: 'Completed',
      welcome: 'Welcome back, Alex',
      noResults: 'No results found',
    },
    FR: {
      examCalendar: 'Calendrier des Examens',
      myGrades: 'Mes Notes',
      quickSearch: 'Rechercher des cours, des professeurs ou des ressources...',
      semesterProgress: 'Progression du Semestre',
      currentGPA: 'GPA Actuel',
      attendance: 'Assiduité %',
      daysUntilExam: 'Jours jusqu\'au prochain Examen',
      upcomingExams: 'Examens à Venir',
      date: 'Date',
      subject: 'Sujet',
      time: 'Heure',
      recentGrades: 'Notes des Cours Récentes',
      course: 'Cours',
      grade: 'Note',
      instructor: 'Instructeur',
      completed: 'Complété',
      welcome: 'Bienvenue, Alex',
      noResults: 'Aucun résultat trouvé',
    },
  };

  const t = labels[language];

  // Sample data
  const upcomingExams = [
    { id: 1, subject: 'Advanced Web Development', date: 'Apr 15, 2024', time: '09:00 AM' },
    { id: 2, subject: 'Data Structures', date: 'Apr 18, 2024', time: '02:00 PM' },
    { id: 3, subject: 'Database Design', date: 'Apr 22, 2024', time: '10:30 AM' },
    { id: 4, subject: 'UI/UX Design Principles', date: 'Apr 25, 2024', time: '01:00 PM' },
  ];

  const recentGrades = [
    { id: 1, course: 'Advanced Web Development', grade: 'A-', instructor: 'Dr. Ahmed', percentage: 92 },
    { id: 2, course: 'Data Structures', grade: 'A', instructor: 'Prof. Sarah', percentage: 95 },
    { id: 3, course: 'Database Design', grade: 'B+', instructor: 'Dr. Mohamed', percentage: 88 },
    { id: 4, course: 'Cloud Computing', grade: 'A-', instructor: 'Prof. Lisa', percentage: 91 },
  ];

  const filteredExams = upcomingExams.filter((exam) =>
    exam.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-200">
        
        {/* COMPONENTIZED HEADER */}
        <Header
          isDark={isDark}
          toggleDarkMode={toggleDarkMode}
          language={language}
          setLanguage={setLanguage}
          notificationCount={notificationCount}
          showNotifications={true}
          centerSlot={
            <>
              <a
                href="#exam-calendar"
                className="text-sm font-medium text-gray-900 dark:text-gray-50 hover:text-[#1E3A5F] dark:hover:text-[#4A7BA7] transition-colors"
              >
                {t.examCalendar}
              </a>
              <a
                href="#my-grades"
                className="text-sm font-medium text-gray-900 dark:text-gray-50 hover:text-[#1E3A5F] dark:hover:text-[#4A7BA7] transition-colors"
              >
                {t.myGrades}
              </a>
            </>
          }
          profileSlot={
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#4A7BA7] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                AJ
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-900 dark:text-gray-50">
                Alex Johnson
              </span>
            </div>
          }
        />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
              {t.welcome}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {language === 'EN' ? "Here's your academic overview for this semester" : 'Voici votre aperçu académique pour ce semestre'}
            </p>
          </div>

          {/* Quick Search */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input
                type="text"
                placeholder={t.quickSearch}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] dark:focus:ring-[#4A7BA7] transition-all duration-200"
              />
            </div>
          </div>

          {/* Semester Progress */}
          <div className="mb-8 bg-white dark:bg-slate-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
              {t.semesterProgress}
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">Progress</span>
                <span className="font-semibold text-gray-900 dark:text-gray-50">68%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div className="bg-[#1E3A5F] dark:bg-[#4A7BA7] h-full transition-all duration-500" style={{ width: '68%' }}></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {language === 'EN' ? '12 weeks completed out of 16 weeks' : '12 semaines complétées sur 16 semaines'}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Current GPA */}
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t.currentGPA}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-2">
                    3.85
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {language === 'EN' ? 'Out of 4.0' : 'Sur 4,0'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-[#1E3A5F] dark:text-[#4A7BA7]" />
                </div>
              </div>
            </div>

            {/* Attendance */}
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t.attendance}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-2">
                    94%
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {language === 'EN' ? 'Excellent' : 'Excellent'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            {/* Days Until Next Exam */}
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t.daysUntilExam}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-2">
                    5
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {language === 'EN' ? 'Web Dev Exam' : 'Examen Dev Web'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Exams */}
          <div id="exam-calendar" className="mb-8 bg-white dark:bg-slate-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#1E3A5F] dark:text-[#4A7BA7]" />
              {t.upcomingExams}
            </h2>
            {filteredExams.length > 0 ? (
              <div className="space-y-3">
                {filteredExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-12 h-12 bg-[#FFC933]/10 dark:bg-[#FFD966]/5 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-[#1E3A5F] dark:text-[#4A7BA7]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                        {exam.subject}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {t.date}: {exam.date} • {t.time}: {exam.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
                {t.noResults}
              </p>
            )}
          </div>

          {/* Recent Grades */}
          <div id="my-grades" className="bg-white dark:bg-slate-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#1E3A5F] dark:text-[#4A7BA7]" />
              {t.recentGrades}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-50">
                      {t.course}
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-50">
                      {t.instructor}
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-gray-50">
                      {t.grade}
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-gray-50">
                      %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentGrades.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="py-4 px-4 text-gray-900 dark:text-gray-50 font-medium">
                        {item.course}
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                        {item.instructor}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-[#1E3A5F]/10 dark:bg-[#4A7BA7]/10 text-[#1E3A5F] dark:text-[#4A7BA7] font-bold rounded">
                          {item.grade}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-12 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="bg-[#1E3A5F] dark:bg-[#4A7BA7] h-full transition-all duration-300"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-gray-600 dark:text-gray-400 font-medium">
                            {item.percentage}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}