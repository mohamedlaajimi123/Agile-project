export const ROOMS = [
  { id: 'R101', name: 'Auditorium A', capacity: 150, building: 'Main' },
  { id: 'R102', name: 'Auditorium B', capacity: 120, building: 'Main' },
  { id: 'R203', name: 'Lab 1', capacity: 40, building: 'Science' },
  { id: 'R204', name: 'Lab 2', capacity: 40, building: 'Science' },
  { id: 'R305', name: 'Lecture Hall 1', capacity: 100, building: 'Engineering' },
];

export const TIME_SLOTS = ['08:00', '11:00', '14:00'];

export const EXAM_DATA = [
  { id: 1, course: 'Advanced Web Development', students: 95, aiScore: 98, reasoning: 'Optimized for room capacity & professor proximity', level: 'L3', bachelor: 'Computer Science' },
  { id: 2, course: 'Data Structures', students: 87, aiScore: 96, reasoning: 'Balanced capacity utilization', level: 'L2', bachelor: 'Computer Science' },
  { id: 3, course: 'Database Design', students: 38, aiScore: 94, reasoning: 'Lab equipment availability confirmed', level: 'L3', bachelor: 'Computer Science' },
  { id: 4, course: 'UI/UX Design', students: 42, aiScore: 97, reasoning: 'Minimizes student travel time', level: 'M1', bachelor: 'Digital Arts' },
  { id: 5, course: 'Cloud Computing', students: 76, aiScore: 95, reasoning: 'Optimal for practical demonstrations', level: 'L2', bachelor: 'Engineering' },
  { id: 6, course: 'Business Analytics', students: 65, aiScore: 93, reasoning: 'Proximity to business building', level: 'M2', bachelor: 'Business' },
  { id: 7, course: 'Digital Marketing', students: 48, aiScore: 91, reasoning: 'Lab access for practicals', level: 'L1', bachelor: 'Digital Arts' },
  { id: 8, course: 'Financial Modeling', students: 52, aiScore: 94, reasoning: 'Computer lab requirement', level: 'M1', bachelor: 'Business' },
];

export const COURSES = [
  { id: 'CS301', name: 'Advanced Web Development', completion: 85, status: 'pending', risk: false },
  { id: 'CS302', name: 'Data Structures', completion: 92, status: 'pending', risk: false },
  { id: 'CS303', name: 'Database Design', completion: 72, status: 'pending', risk: true },
  { id: 'CS304', name: 'UI/UX Design Principles', completion: 88, status: 'released', risk: false },
  { id: 'CS305', name: 'Cloud Computing Fundamentals', completion: 65, status: 'pending', risk: true },
];

export const USERS = [
  { id: 1, name: 'Prof. Richard Morrison', role: 'Lecturer', department: 'Computer Science', courses: 3, status: 'active' },
  { id: 2, name: 'Dr. Amina Ahmed', role: 'Senior Lecturer', department: 'Computer Science', courses: 4, status: 'active' },
  { id: 3, name: 'Prof. Lisa Chen', role: 'Lecturer', department: 'Engineering', courses: 2, status: 'active' },
  { id: 4, name: 'Dr. Carlos Martinez', role: 'Assistant Lecturer', department: 'Computer Science', courses: 2, status: 'active' },
  { id: 5, name: 'Prof. Raj Kumar', role: 'Senior Lecturer', department: 'Engineering', courses: 3, status: 'inactive' },
];