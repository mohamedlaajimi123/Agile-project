export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:5000/api${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  let data;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(data?.error || "Request failed");
  }

  return data;
};