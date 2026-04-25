import { useEffect, useState } from "react";
import { STUDENT_DATA as MOCK_STUDENT_DATA } from "../../../data/studentData";

function StudentDashboardView({ isDark, t, STUDENT_DATA }) {
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    console.log("DASHBOARD MOUNTED");

    const loadMockData = () => {
      setError(null);
      setIsLoading(true);

      setTimeout(() => {
        if (!isMounted) return;
        console.log("DATA:", MOCK_STUDENT_DATA);
        setStudent(MOCK_STUDENT_DATA);
        setIsLoading(false);
        console.log("DASHBOARD LOADING END");
      }, 300);
    };

    loadMockData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-10 text-center text-slate-400 shadow-xl shadow-slate-950/20">
        <p className="text-lg font-medium">Loading student dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-10 text-center text-red-200 shadow-lg shadow-red-500/10">
        <p className="text-lg font-semibold">{error}</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-10 text-center text-slate-400 shadow-xl shadow-slate-950/20">
        <p className="text-lg font-medium">No student data available.</p>
      </div>
    );
  }

  return (
    <div className={`rounded-3xl border p-8 transition-all duration-300 ${isDark ? 'border-white/10 bg-slate-900/80' : 'border-slate-200 bg-white shadow-sm'}`}>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-slate-100">{student.name || student.full_name || "Welcome, Student"}</h1>
        <p className="mt-2 text-sm text-slate-400">
          {student.program || STUDENT_DATA?.program || "Your student dashboard is ready."}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Student ID</p>
          <p className="mt-3 text-xl font-semibold text-slate-100">{student.studentId || student.student_id || student.id || "—"}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Email</p>
          <p className="mt-3 text-xl font-semibold text-slate-100">{student.email || "—"}</p>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboardView;