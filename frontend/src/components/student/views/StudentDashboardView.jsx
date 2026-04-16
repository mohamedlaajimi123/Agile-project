import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../../../api/api";

export default function StudentDashboardView({ isDark, t }) {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  // 🔌 Fetch real backend data
  useEffect(() => {
    const loadStudent = async () => {
      try {
        const data = await fetchWithAuth("/students/me");
        setStudent(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    loadStudent();
  }, []);

  // ❌ Error state
  if (error) {
    return (
      <div className="p-6 text-red-500">
        Error: {error}
      </div>
    );
  }

  // ⏳ Loading state
  if (!student) {
    return (
      <div className="p-6 text-gray-400">
        Loading student data...
      </div>
    );
  }

  // ✅ Real UI with backend data
  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          🎓 Welcome {student.full_name}
        </h1>
        <p className="text-gray-400">
          Student Dashboard
        </p>
      </div>

      {/* Info Card */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Student Code:</strong> {student.student_code}</p>
      </div>

      {/* Placeholder for future sections */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <p className="text-sm text-gray-400">
          🚀 Your exams, grades, and schedule will appear here soon.
        </p>
      </div>

    </div>
  );
}