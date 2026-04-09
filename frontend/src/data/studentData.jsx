export const STUDENT_DATA = {
  name: 'Alex Chen',
  studentId: 'STU-2024-001823',
  email: 'alex.chen@horizon-university.tn',
  program: 'Bachelor of Science in Computer Science',
  semester: 'Spring 2024',
  currentGPA: 3.85,
  creditsEarned: 45,
};

export const EXAMS = [
  { id: 1, module: 'Advanced Web Development', date: 'Apr 15, 2024', time: '09:00 AM', room: '201', seat: 'A-12' },
  { id: 2, module: 'Data Structures', date: 'Apr 18, 2024', time: '02:00 PM', room: '305', seat: 'B-08' },
  { id: 3, module: 'Database Design', date: 'Apr 22, 2024', time: '10:30 AM', room: '102', seat: 'C-15' },
  { id: 4, module: 'UI/UX Design Principles', date: 'Apr 25, 2024', time: '01:00 PM', room: '401', seat: 'A-25' },
];

export const GRADES = [
  { id: 1, code: 'CS301', name: 'Advanced Web Development', credits: 4, grade: 18, status: 'Validated' },
  { id: 2, code: 'CS302', name: 'Data Structures', credits: 3, grade: 17, status: 'Validated' },
  { id: 3, code: 'CS303', name: 'Database Design', credits: 4, grade: 16, status: 'Pending' },
  { id: 4, code: 'CS304', name: 'Web Technologies', credits: 3, grade: 19, status: 'Validated' },
  { id: 5, code: 'CS305', name: 'Software Engineering', credits: 4, grade: 15, status: 'Pending' },
];

export const SEMESTER_WEEKS = 14;
export const CURRENT_WEEK = 8;
export const MIDTERMS_WEEK = 6;
export const FINALS_START_WEEK = 12;

export const LABELS = {
  EN: {
    dashboard: 'Dashboard', myExams: 'My Exams', myGrades: 'My Grades', documents: 'Documents', 
    welcome: 'Welcome Back, Alex', semesterOverview: 'Semester Overview', currentGPA: 'Current GPA', 
    creditsEarned: 'Credits Earned', nextExamCountdown: 'Days to Next Exam', semesterProgression: 'Semester Progression', 
    week: 'Week', midterms: 'Midterms', finals: 'Finals', courseCode: 'Course Code', courseName: 'Course Name', 
    credits: 'Credits', grade: 'Grade', outOf: '/ 20', status: 'Status', validated: 'Validated', pending: 'Pending', 
    module: 'Module', date: 'Date', time: 'Time', room: 'Room', seat: 'Seat', downloadConvocation: 'Download Official PDF Convocation', 
    examAssignment: 'Your Exam Assignment', name: 'Name', studentID: 'Student ID', seatNumber: 'Seat Number', 
    roomAssignment: 'Room Assignment', searchPlaceholder: 'Search courses, exams...', noResults: 'No results found', 
    upcomingExams: 'Your Upcoming Exams', gradeHistory: 'Grade History', officialDocumentation: 'Official Documentation', 
    convocationInfo: 'Convocation Information', profile: 'My Profile', contactInfo: 'Contact Information', 
    security: 'Security', saveChanges: 'Save Changes', editProfile: 'Edit Profile', phone: 'Phone Number', 
    backToPortal: '← Back to Portal',
  },
  FR: {
    dashboard: 'Tableau de Bord', myExams: 'Mes Examens', myGrades: 'Mes Notes', documents: 'Documents', 
    welcome: 'Bienvenue, Alex', semesterOverview: 'Aperçu du Semestre', currentGPA: 'GPA Actuel', 
    creditsEarned: 'Crédits Obtenus', nextExamCountdown: 'Jours jusqu\'au Prochain Examen', semesterProgression: 'Progression du Semestre', 
    week: 'Semaine', midterms: 'Examens de Mi-semestre', finals: 'Examens Finaux', courseCode: 'Code du Cours', 
    courseName: 'Nom du Cours', credits: 'Crédits', grade: 'Note', outOf: '/ 20', status: 'Statut', validated: 'Validé', 
    pending: 'En Attente', module: 'Module', date: 'Date', time: 'Heure', room: 'Salle', seat: 'Siège', 
    downloadConvocation: 'Télécharger le PDF Officiel de Convocation', examAssignment: 'Votre Assignation d\'Examen', 
    name: 'Nom', studentID: 'Numéro d\'Étudiant', seatNumber: 'Numéro de Siège', roomAssignment: 'Assignation de Salle', 
    searchPlaceholder: 'Rechercher des cours, des examens...', noResults: 'Aucun résultat trouvé', upcomingExams: 'Vos Examens à Venir', 
    gradeHistory: 'Historique des Notes', officialDocumentation: 'Documentation Officielle', convocationInfo: 'Informations de Convocation',
    profile: 'Mon Profil', contactInfo: 'Coordonnées', security: 'Sécurité', saveChanges: 'Enregistrer', 
    editProfile: 'Modifier le Profil', phone: 'Numéro de Téléphone', backToPortal: '← Retour au Portail',
  },
};