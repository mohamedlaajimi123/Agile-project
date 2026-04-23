import { useEffect, useState } from "react";

function StudentDashboardView() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/student/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log("STUDENT DATA:", data);
        setStudent(data);
      })
      .catch(err => console.error(err));
  }, []);

  // 🔥 prevent crash
  if (!student) {
    return <p>Loading student dashboard...</p>;
  }

  return (
    <div>
      <h1>{student?.full_name || "Student Dashboard"}</h1>
    </div>
  );
}

export default StudentDashboardView;