let MOCK_DATA = {
  student: { id: "ST12345", name: "Alex Chen", email: "alex.chen@horizon.edu", program: "Software Engineering", semester: "Semester 4", phone: "+216 55 123 456", currentGPA: "3.85", creditsEarned: "64" },
  professor: { id: "PRF9921", name: "Dr. Sarah Miller", email: "s.miller@horizon.edu", department: "Computer Science", office: "Room 402, Block B" },
  classes: [
    { id: "CS302", name: "Advanced React", schedule: "Mon/Wed 10:00", studentCount: 24, status: "Active", color: "from-indigo-600/20 to-blue-600/20", studentColor: "text-indigo-400" },
    { id: "CS205", name: "Database Systems", schedule: "Tue/Thu 14:00", studentCount: 18, status: "Active", color: "from-violet-600/20 to-purple-600/20", studentColor: "text-violet-400" },
    { id: "CS101", name: "Intro to UI/UX", schedule: "Fri 09:00", studentCount: 30, status: "Active", color: "from-emerald-600/20 to-teal-600/20", studentColor: "text-emerald-400" },
  ],
  invigilation: [
    { id: 1, exam: "React Fundamentals", date: "June 15, 2026", time: "09:00 - 11:00", room: "Lab 04" },
    { id: 2, exam: "Database Design", date: "June 18, 2026", time: "14:00 - 16:00", room: "Amphi B" },
    { id: 3, exam: "Agile Methodologies", date: "June 21, 2026", time: "10:30 - 12:30", room: "Room 102" },
    { id: 4, exam: "UI Design Principles", date: "June 25, 2026", time: "08:00 - 10:00", room: "Lab 01" },
  ],
  classRosters: {
    "CS302": [
      { id: "ST12345", name: "Alex Chen", grade: "A-", attendance: "95%", lastActive: "Today" },
      { id: "ST67890", name: "Jordan Smith", grade: "B", attendance: "88%", lastActive: "Yesterday" },
      { id: "ST44321", name: "Yasmine Belka", grade: "A", attendance: "100%", lastActive: "2 days ago" },
    ],
    "CS205": [
      { id: "ST12345", name: "Alex Chen", grade: "B+", attendance: "92%", lastActive: "Today" },
      { id: "ST11223", name: "Liam O'Connor", grade: "C", attendance: "75%", lastActive: "5 days ago" },
    ]
  }
};

// HELPER
const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const studentService = {
  getProfile: () => delay(500).then(() => MOCK_DATA.student),
  updateProfile: (newData) => delay(800).then(() => {
    MOCK_DATA.student = { ...MOCK_DATA.student, ...newData };
    return { success: true };
  })
};

export const professorService = {
  getProfile: () => delay(500).then(() => MOCK_DATA.professor),
  getClasses: () => delay(600).then(() => MOCK_DATA.classes),
  getInvigilation: () => delay(450).then(() => MOCK_DATA.invigilation),
  getClassRoster: (classId) => delay(500).then(() => MOCK_DATA.classRosters[classId] || []),
  updateGrade: (classId, studentId, newGrade) => delay(700).then(() => {
    const roster = MOCK_DATA.classRosters[classId];
    if (roster) {
      const sIdx = roster.findIndex(s => s.id === studentId);
      if (sIdx !== -1) MOCK_DATA.classRosters[classId][sIdx].grade = newGrade;
    }
    return { success: true };
  })
};

// ADDED FOR ADMIN PORTAL COMPLETION
export const adminService = {
  getDashboardStats: () => delay(600).then(() => ({
    activeExams: 12,
    pendingGrades: 45,
    systemAlerts: 2
  })),
  getUsers: () => delay(800).then(() => [
    { id: 1, name: "Dr. Sarah Miller", role: "Professor" },
    { id: 2, name: "Alex Chen", role: "Student" }
  ])
};