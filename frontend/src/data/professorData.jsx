export const COURSES = [
  { id: 'CS301', name: 'Advanced Web Development', students: 5, status: 'pending', color: 'from-blue-600/20 to-cyan-600/20', studentColor: 'text-blue-300', studentList: [
    { id: 1, name: 'Alice Johnson', code: 'STU001', grade: 18, aiGenerated: false },
    { id: 2, name: 'Bob Smith', code: 'STU002', grade: 16, aiGenerated: false },
    { id: 3, name: 'Charlie Brown', code: 'STU003', grade: '', aiGenerated: false },
    { id: 4, name: 'Diana Prince', code: 'STU004', grade: 19, aiGenerated: false },
    { id: 5, name: 'Evan Davis', code: 'STU005', grade: '', aiGenerated: false },
  ] },
  { id: 'CS302', name: 'Data Structures', students: 3, status: 'pending', color: 'from-purple-600/20 to-pink-600/20', studentColor: 'text-purple-300', studentList: [
    { id: 1, name: 'Alice Johnson', code: 'STU001', grade: 17, aiGenerated: false },
    { id: 2, name: 'Bob Smith', code: 'STU002', grade: '', aiGenerated: false },
    { id: 3, name: 'Charlie Brown', code: 'STU003', grade: 13, aiGenerated: false },
  ] },
  { id: 'CS303', name: 'Database Design', students: 2, status: 'pending', color: 'from-orange-600/20 to-red-600/20', studentColor: 'text-orange-300', studentList: [
    { id: 1, name: 'Alice Johnson', code: 'STU001', grade: '', aiGenerated: false },
    { id: 2, name: 'Bob Smith', code: 'STU002', grade: '', aiGenerated: false },
  ] },
];

export const INVIGILATION_SCHEDULE = [
  { id: 1, exam: 'Advanced Web Development', date: 'Apr 15, 2024', time: '09:00 AM', room: '201' },
  { id: 2, exam: 'Data Structures', date: 'Apr 18, 2024', time: '02:00 PM', room: '305' },
  { id: 3, exam: 'Database Design', date: 'Apr 22, 2024', time: '10:30 AM', room: '102' },
  { id: 4, exam: 'UI/UX Design Principles', date: 'Apr 25, 2024', time: '01:00 PM', room: '401' },
];

export const LABELS = {
  EN: {
    dashboard: 'Dashboard', courses: 'Courses', grades: 'Grades', settings: 'Settings', welcome: 'Welcome Back, Professor', yourStats: 'Your Academic Overview', totalStudents: 'Total Students', activeCourses: 'Active Courses', pendingGrades: 'Pending Grades', quickActions: 'Quick Actions', viewGradebook: 'View Gradebook', submitGrades: 'Submit Grades', manageCourses: 'Manage Courses', students: 'Students', pending: 'Pending', searchPlaceholder: 'Search courses...', noResults: 'No courses found', readyToReview: 'Ready to Review Grades?', reviewDesc: 'You have 3 courses with pending grades awaiting your review and submission.', startReviewing: 'Start Reviewing', aiPowered: 'AI-Powered Grade Processing', aiDesc: 'Streamline your grading workflow with intelligent visual recognition and automated validation.', invigilationSchedule: 'Invigilation Schedule', upcomingExams: 'Your Upcoming Exam Proctoring Duties', studentCode: 'Student Code', grade: 'Grade', outOf: 'Out of 20', autoFillGrades: 'Auto-Fill Grades', importAIGrades: 'Import AI Grades', backToCourses: '← Back to Courses', classRoster: 'Class Roster', manualGrading: 'Manual Grading', autoFilling: 'Auto-filling grades...', profile: 'Profile', professionalInfo: 'Professional Information', accountSettings: 'Account Settings', notifications: 'Notifications', privacy: 'Privacy & Security', backToPortal: '← Back to Portal', email: 'Email Address', department: 'Department', office: 'Office Hours', specialization: 'Specialization', room: 'Room', date: 'Date', time: 'Time', lowGrade: 'Low grade detected (< 5)', autoFilled: 'Auto-filled by AI',
  },
  FR: {
    dashboard: 'Tableau de Bord', courses: 'Cours', grades: 'Notes', settings: 'Paramètres', welcome: 'Bienvenue, Professeur', yourStats: 'Votre Aperçu Académique', totalStudents: 'Total d\'Étudiants', activeCourses: 'Cours Actifs', pendingGrades: 'Notes en Attente', quickActions: 'Actions Rapides', viewGradebook: 'Voir le Carnet de Notes', submitGrades: 'Soumettre les Notes', manageCourses: 'Gérer les Cours', students: 'Étudiants', pending: 'En Attente', searchPlaceholder: 'Rechercher des cours...', noResults: 'Aucun cours trouvé', readyToReview: 'Prêt à Examiner les Notes?', reviewDesc: 'Vous avez 3 cours avec des notes en attente d\'examen et de soumission.', startReviewing: 'Commencer l\'Examen', aiPowered: 'Traitement des Notes Basé sur l\'IA', aiDesc: 'Rationalisez votre flux de notation avec une reconnaissance visuelle intelligente et une validation automatisée.', invigilationSchedule: 'Calendrier de Surveillance', upcomingExams: 'Vos Devoirs de Surveillance Prochains', studentCode: 'Code Étudiant', grade: 'Note', outOf: 'Sur 20', autoFillGrades: 'Remplissage Automatique des Notes', importAIGrades: 'Importer les Notes IA', backToCourses: '← Retour aux Cours', classRoster: 'Liste de Classe', manualGrading: 'Notation Manuelle', autoFilling: 'Remplissage automatique des notes...', profile: 'Profil', professionalInfo: 'Informations Professionnelles', accountSettings: 'Paramètres du Compte', notifications: 'Notifications', privacy: 'Confidentialité et Sécurité', backToPortal: '← Retour au Portail', email: 'Adresse E-mail', department: 'Département', office: 'Heures de Bureau', specialization: 'Spécialisation', room: 'Salle', date: 'Date', time: 'Heure', lowGrade: 'Note basse détectée (< 5)', autoFilled: 'Rempli automatiquement par IA',
  },
};