import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../../../api/api";

export default function InsightsView({ isDark, t }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await fetchWithAuth("/admin/dashboard");
        setData(res);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    loadDashboard();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (!data) {
    return <p>Loading admin dashboard...</p>;
  }

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">📊 Admin Dashboard</h1>

      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <p><strong>Total Users:</strong> {data.total_users}</p>
        <p><strong>Total Students:</strong> {data.total_students}</p>
      </div>

    </div>
  );
}