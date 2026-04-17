import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../../../api/api";

export default function ProfessorDashboardView() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchWithAuth("/professor/dashboard")
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>👨‍🏫 Professor Dashboard</h1>
      <p>{data.message}</p>
    </div>
  );
}