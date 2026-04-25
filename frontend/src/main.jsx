import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Import the Provider you just created
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
import supabase from "./lib/supabase";

const testSupabase = async () => {
  const { data, error } = await supabase.from("users").select("*");
  console.log("SUPABASE DATA:", data);
  console.log("SUPABASE ERROR:", error);
};

testSupabase();