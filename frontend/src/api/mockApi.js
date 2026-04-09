// We use 'let' so the data can be modified during your session
let MOCK_DATA = {
  student: {
    id: "ST12345",
    name: "Alex Chen",
    email: "alex.chen@horizon.edu",
    program: "Software Engineering",
    semester: "Semester 4",
    phone: "+216 55 123 456",
    currentGPA: "3.85",
    creditsEarned: "64"
  },
  
  // New Professor Data
  professor: {
    id: "PRF9921",
    name: "Dr. Sarah Miller",
    email: "s.miller@horizon.edu",
    department: "Computer Science",
    office: "Room 402, Block B"
  },

  // The classes this professor teaches
  classes: [
    { 
      id: "CS302", 
      name: "Advanced React", 
      schedule: "Mon/Wed 10:00", 
      studentCount: 24, 
      status: "Active", 
      color: "from-indigo-600/20 to-blue-600/20", 
      studentColor: "text-indigo-400" 
    },
    { 
      id: "CS205", 
      name: "Database Systems", 
      schedule: "Tue/Thu 14:00", 
      studentCount: 18, 
      status: "Active", 
      color: "from-violet-600/20 to-purple-600/20", 
      studentColor: "text-violet-400" 
    },
    { 
      id: "CS101", 
      name: "Intro to UI/UX", 
      schedule: "Fri 09:00", 
      studentCount: 30, 
      status: "Active", 
      color: "from-emerald-600/20 to-teal-600/20", 
      studentColor: "text-emerald-400" 
    },
  ],

  // INVIGILATION SCHEDULE (Added this back!)
  invigilation: [
    { id: 1, exam: "React Fundamentals", date: "June 15, 2026", time: "09:00 - 11:00", room: "Lab 04" },
    { id: 2, exam: "Database Design", date: "June 18, 2026", time: "14:00 - 16:00", room: "Amphi B" },
    { id: 3, exam: "Agile Methodologies", date: "June 21, 2026", time: "10:30 - 12:30", room: "Room 102" },
    { id: 4, exam: "UI Design Principles", date: "June 25, 2026", time: "08:00 - 10:00", room: "Lab 01" },
  ],

  // Student list for specific classes
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

// --- STUDENT SERVICES ---
export const studentService = {
  getProfile: () => new Promise(res => setTimeout(() => res(MOCK_DATA.student), 500)),
  
  updateProfile: (newData) => new Promise(res => {
    MOCK_DATA.student = { ...MOCK_DATA.student, ...newData };
    console.log("Student DB updated:", MOCK_DATA.student);
    setTimeout(() => res({ success: true }), 800);
  })
};

// --- PROFESSOR SERVICES ---
export const professorService = {
  getProfile: () => new Promise(res => setTimeout(() => res(MOCK_DATA.professor), 500)),
  
  getClasses: () => new Promise(res => setTimeout(() => res(MOCK_DATA.classes), 600)),

  // Added this function to fetch the invigilation schedule
  getInvigilation: () => new Promise(res => setTimeout(() => res(MOCK_DATA.invigilation), 450)),

  // Get students for a specific class ID
  getClassRoster: (classId) => new Promise(res => {
    const roster = MOCK_DATA.classRosters[classId] || [];
    setTimeout(() => res(roster), 500);
  }),

  // PROFESSOR ACTION: Update a specific student's grade in a specific class
  updateGrade: (classId, studentId, newGrade) => new Promise(res => {
    const roster = MOCK_DATA.classRosters[classId];
    if (roster) {
      const studentIndex = roster.findIndex(s => s.id === studentId);
      if (studentIndex !== -1) {
        MOCK_DATA.classRosters[classId][studentIndex].grade = newGrade;
        console.log(`Grade Updated for ${studentId} in ${classId}:`, newGrade);
      }
    }
    setTimeout(() => res({ success: true }), 700);
  })
};