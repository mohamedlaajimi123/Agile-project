import { useState } from 'react';
// BACKEND NOTE: Your teammate will need to ensure the professorService 
// matches the actual API endpoints for fetching students and updating grades.
import { professorService } from '../api/mockApi';

export function useProfessorActions() {
  const [courseStudents, setCourseStudents] = useState({});
  const [isAutoFilling, setIsAutoFilling] = useState(false);

  // BACKEND NOTE: This mock roster should be replaced by a real database call.
  const mockRoster = [
    { id: 1, code: 'STU001', name: 'Alice Thompson', grade: '' },
    { id: 2, code: 'STU002', name: 'Bob Richards', grade: '' },
    { id: 3, code: 'STU003', name: 'Charlie Davis', grade: '' },
    { id: 4, code: 'STU004', name: 'Diana Prince', grade: '' },
    { id: 5, code: 'STU005', name: 'Edward Norton', grade: '' },
  ];

  const initializeStudents = async (courseId) => {
    // BACKEND NOTE: Currently checks local state first. 
    // Teammate might want to force-fetch from the DB here instead.
    if (!courseStudents[courseId]) {
      try {
        // BACKEND NOTE: Switch this to the real async API call:
        // const students = await professorService.getStudentsByClass(courseId);
        setCourseStudents(prev => ({
          ...prev,
          [courseId]: mockRoster
        }));
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    }
  };

  const updateStudentGrade = (courseId, studentId, grade) => {
    // BACKEND NOTE: This only updates the local UI state.
    // Teammate needs to add an API call here (e.g., PUT /grades/:id) 
    // to persist the grade change in the database.
    setCourseStudents(prev => ({
      ...prev,
      [courseId]: prev[courseId].map(student => 
        student.id === studentId ? { ...student, grade, aiGenerated: false } : student
      )
    }));
  };

  const handleAutoFillGrades = (courseId) => {
    setIsAutoFilling(true);
    
    // BACKEND NOTE: This is a frontend simulation. 
    // If you want the "AI" to run on the server, this should be an API call.
    setTimeout(() => {
      setCourseStudents(prev => ({
        ...prev,
        [courseId]: prev[courseId].map(student => ({
          ...student,
          grade: Math.floor(Math.random() * (20 - 10 + 1)) + 10,
          aiGenerated: true
        }))
      }));
      setIsAutoFilling(false);
    }, 1200);
  };

  return { 
    courseStudents, 
    initializeStudents, 
    updateStudentGrade, 
    handleAutoFillGrades, 
    isAutoFilling 
  };
}